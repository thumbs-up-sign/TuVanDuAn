<?php

/**
 * @package 	mod_bt_productslider - BT ProductSlider Module
 * @version		1.0
 * @created		June 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');
/**
 * BtK2DataSource Class
 */
require_once JPATH_SITE . '/modules/mod_bt_productslider/classes/btsource.php';
require_once JPATH_ADMINISTRATOR . '/components/com_virtuemart/helpers/config.php';
JLoader::import( 'product', JPATH_ADMINISTRATOR . DS . 'components' . DS . 'com_virtuemart' . DS . 'models' );

class BtProductSliderVirtuemartDataSource extends BTProductSliderSource {

    /* ---------------------------------- */

    /**
     * get the list of k2 items
     *
     * @param JParameter $params;
     * @return Array
     */
    public function getList() {
        if (!is_dir(JPATH_ADMINISTRATOR . '/components/com_virtuemart')) {
            return array();
        }


        $params = &$this->_params;

        /**
         * Get data 
         */
        $db = JFactory::getDBO();
        $data = array();
        //select from
        $source = trim($this->_params->get('source', 'vm_categories'));

        if ($source == 'vm_categories') {
            $catids = $this->_params->get('vm_categories', '');
        } else {
            if ($this->_params->get('vm_ids', '')) {
                $ids = preg_split('/,/', $this->_params->get('vm_ids', ''));
                $ids_tmp = array();
                foreach ($ids as $id) {
                    $ids_tmp[] = (int) trim($id);
                }
            }
        }

        if ($source == 'vm_categories' && $catids && $this->_params->get('limit_items_for_each')) {
            foreach ($catids as $catid) {
                $query = $this->buildQuery($catid);
                $db->setQuery($query);
                $data = array_merge($data, $db->loadObjectlist());
            }
        } else if ($source == 'vm_categories' && $catids) {
            $query = $this->buildQuery($catids);
            $db->setQuery($query);
            $data = array_merge($data, $db->loadObjectlist());
        } else if ($source == 'vm_ids' && $ids_tmp && count($ids_tmp)) {
            $query = $this->buildQuery(false, $ids_tmp);
            
            $db->setQuery($query);
            
            $data = array_merge($data, $db->loadObjectlist()); 
        } else {
            $query = $this->buildQuery(false, false);
            $db->setQuery($query);
            $data = array_merge($data, $db->loadObjectlist());
            
            
        }
        $this->reloadProducts($data);
        if (empty($data))
            return array();

        /**
         * Get display and config params 
         */
        /* title */
        $isStrips = $params->get("auto_strip_tags", 1);

        $stringtags = '';
		if ($isStrips) {
			$allow_tags = $params->get("allow_tags", '');
			$stringtags = '';
			if(!is_array($allow_tags)){
				$allow_tags = explode(',',$allow_tags);
			}
			foreach ($allow_tags as $tag) {
				$stringtags .= '<' . $tag . '>';
			}
		}
        
        /* intro */
        $maxDesciption = $params->get('description_max_chars', 100);
        $limitDescriptionBy = $params->get('limit_description_by', 'char');

        $isThumb = $params->get('image_thumb', 1);
        $dateFormat = $params->get('date_format', 'DATE_FORMAT_LC3');



        foreach ($data as $key => &$product) {
            $product->link = JRoute::_('index.php?option=com_virtuemart&view=productdetails&virtuemart_product_id='.$product->id.'&virtuemart_category_id='.$product->category_id);
            if($this->_params->get('show_add_to_cart', 1)){
                $product->add_to_cart = modBtProductSliderHelper::addtocart($product);
            }            
            if($this->_params->get('show_intro'))
                if ($limitDescriptionBy == 'word') {
                    $product->description = self::substrword($product->introtext, $maxDesciption, '...', $isStrips, $stringtags);
                } else {
                    $product->description = self::substring($product->introtext, $maxDesciption, '...', $isStrips, $stringtags);
                }

            if($this->_params->get('show_category_name_as_link')){
                        $product->category_link = JRoute::_('index.php?option=com_virtuemart&view=category&virtuemart_category_id='.$product->category_id);
            }

            //if show image
            if ($this->_params->get('show_image')) {
                $product->thumbnail = explode(',', $product->thumbnail);
                $thumbnail = '';
                foreach($product->thumbnail as $tmpThumbnail){
                    $type = explode('.', $tmpThumbnail);
                    $type = strtolower($type[count($type) - 1]);
                    if(in_array($type, array('jpg', 'jpeg', 'png', 'png'))){
                        $thumbnail = $tmpThumbnail;
                        break;
                    }
                }
                $product->thumbnail = $thumbnail; 
                $product = $this->generateImages($product, $isThumb);
            }
			
			if($this->_params->get('show_manufacturer')){
				//link to detail page
				$product->manufacturer_link = JRoute::_('index.php?option=com_virtuemart&view=category&virtuemart_manufacturer_id=' . $product->virtuemart_manufacturer_id);
				//link to manufacturer's product page
				//$product->manufacturer_link = JRoute::_('index.php?option=com_virtuemart&view=manufacturer&virtuemart_manufacturer_id=' . $product->virtuemart_manufacturer_id);	
			}
        }

        return $data;
    }

    function buildQuery($category_ids = false, $product_ids = false) {
        $app = JFactory::getApplication();

        //administrative variables to organize the joining of tables
        //build query
        $lang = str_replace('-', '_', JFactory::getLanguage()->getTag());
        $lang = strtolower($lang);
        
        $select = array();
        $select[] = 'p.`virtuemart_product_id` as id';
        $select[] = '`#__virtuemart_products`.`product_parent_id`';
        $select[] = '`#__virtuemart_products`.`created_on`';
		$select[] = '`#__virtuemart_products`.`product_special`';
        $from = ' FROM `#__virtuemart_products_' . $lang . '` as p ';
        $from .= ' LEFT JOIN `#__virtuemart_products` ON `#__virtuemart_products`.`virtuemart_product_id` = p.`virtuemart_product_id`';
        if ($this->_params->get('show_title'))
            $select[] = 'p.`product_name` as name';
        if ($this->_params->get('show_intro'))
            $select[] = 'p.`product_s_desc` as introtext';

        $select[] = 'GROUP_CONCAT(`#__virtuemart_product_categories`.`virtuemart_category_id` SEPARATOR \',\') as categories';
        $select[] = '`#__virtuemart_product_categories`.`virtuemart_category_id` as category_id';
		$from .= ' LEFT JOIN `#__virtuemart_product_categories` ON p.`virtuemart_product_id` = `#__virtuemart_product_categories`.`virtuemart_product_id`';
        if ($this->_params->get('show_category_name')) {
            $select[] = 'c.`category_name` as category_name';
            
            $from .= ' LEFT JOIN `#__virtuemart_categories_' . $lang . '` as c ON `#__virtuemart_product_categories`.`virtuemart_category_id` = c.`virtuemart_category_id`';
        } 

        
        if ($this->_params->get('show_image')) {
            $select[] = 'i.`file_url` as thumbnail';
            $from .= ' LEFT JOIN (SELECT * FROM `#__virtuemart_product_medias` as sub_md  WHERE sub_md.`ordering` < 1 OR sub_md.`ordering` = 1) as md ON p.`virtuemart_product_id` = md.`virtuemart_product_id`';
            $from .= ' LEFT JOIN `#__virtuemart_medias` as i ON md.`virtuemart_media_id` = i.`virtuemart_media_id`';
        }

        if ($this->_params->get('show_manufacturer')) {
            $select[] = 'm.`mf_name` as manufacturer_name';
			$select[] = 'mp.`virtuemart_manufacturer_id`';
            $from .= ' LEFT JOIN `#__virtuemart_product_manufacturers` as mp ON p.`virtuemart_product_id` = mp.`virtuemart_product_id` 
			 LEFT JOIN `#__virtuemart_manufacturers_' . $lang . '` as m ON m.`virtuemart_manufacturer_id` = mp.`virtuemart_manufacturer_id` ';
        }
        if($this->_params->get('show_price')){
            $select[] = 'pr.virtuemart_product_price_id';
            $select[] = 'pr.product_price';
            $select[] = 'pr.override';
            $select[] = 'pr.product_override_price';
            $select[] = 'pr.product_tax_id';
            $select[] = 'pr.product_discount_id';
            $select[] = 'pr.product_currency';
            $from .= ' LEFT JOIN `#__virtuemart_product_prices` as pr ON p.`virtuemart_product_id` = pr.`virtuemart_product_id`';
        }

        //$from = ' JOIN `#__virtuemart_products` using (`virtuemart_product_id`)';
        $groupBy = ' GROUP BY id ';

        //build condition
        $where = array();
        //check category_ids or product_ids
        if ($category_ids) {
            $category_ids = !is_array($category_ids) ? $category_ids : implode(',', $category_ids);
            $where[] = ' `#__virtuemart_product_categories`.`virtuemart_category_id` IN (' . $category_ids . ') ';
        } else if ($product_ids) {
            $tmp = array();
            foreach ($product_ids as $id) {
                $tmp[] = (int) trim($id);
            }
            $where[] = ' p.`virtuemart_product_id` IN (' . implode(',', $tmp) . ') ';
        }

        //only get published product
        $where[] = ' `#__virtuemart_products`.`published`="1" ';

        

        //only get product in stock or not
        if ($app->isSite() && !VmConfig::get('use_as_catalog', 0) && VmConfig::get('stockhandle', 'none') == 'disableit') {
            $where[] = ' `#__virtuemart_products`.`product_in_stock` - `#__virtuemart_products`.`product_ordered` >"0" ';
        }

		//get comment count
		if($this->_params->get('show_review_count')){
		
		
			$select[] = 'rvc.`review_count`' ;
			$from .= ' LEFT JOIN (SELECT rv.`virtuemart_product_id`, COUNT(rv.`virtuemart_product_id`) as review_count FROM `#__virtuemart_rating_reviews` as rv WHERE rv.`published` = 1 GROUP BY rv.`virtuemart_product_id`) as rvc ON p.`virtuemart_product_id` = rvc.`virtuemart_product_id`';
			
		}
		
		
		$groupProduct = $this->_params->get('group', '');
		$order = '';
		if($groupProduct) {
			switch ($groupProduct) {
				case 'featured':
					$where[] = "`#__virtuemart_products`.`product_special` = 1";
					break;
				case 'latest':
					$date = JFactory::getDate( time()-(60*60*24*7) ); //Set on a week, maybe make that configurable
					$dateSql = $date->toMySQL();
					$where[] = '`modified_on` > "'.$dateSql.'" ';
					$orderBy = ' `#__virtuemart_products`.`modified_on` DESC ';
					break;
				case 'bestsale':
					$orderBy = ' `#__virtuemart_products`.`product_sales` DESC ';
					break;
				default:
					break;
			}
		}
        
        // special  orders case
        if ($this->_params->get('ordering')) {
            // Set ordering
            $orderBy = explode('-', $this->_params->get('ordering'));
            if (trim($orderBy[0]) == 'rand') {
                $order.= ' ORDER BY RAND() ';
            } else {
                switch(trim($orderBy[0])){
                    case 'id': 
						$orderBy[0] = 'id'; 
						break;
					case 'hits': 
                        $orderBy[0] = '`#__virtuemart_products`.`hits`'; 
                        break;
                    case 'modified_on': $orderBy[0] = '`#__virtuemart_products`.`modified_on`'; 
						break;
                    case 'price': 
						if(!$this->_params->get('show_price')){
							$from.= ' LEFT JOIN `#__virtuemart_product_prices` as pr ON `pr`.`virtuemart_product_id` = `#__virtuemart_products`.`virtuemart_product_id` ';
						}
						$orderBy[0] = '`pr`.`product_price`';  
						break;
                    default: // ordering
						$orderBy[0] = '`#__virtuemart_products`.`ordering`';                     
                        break;
                }
				$order .= ' ORDER BY ' . $orderBy[0] . ' ' . $orderBy[1];
                
            }
        }
		
		
		
        if ($this->_params->get('limit_items'))
            $order.= ' LIMIT ' . $this->_params->get('limit_items');



        if (!count($select)) {
            return false;
        }
        $query = 'SELECT ' . implode(', ', $select);
        $query .= $from;
        if (count($where) > 0) {
            $where = ' WHERE (' . implode(' AND ', $where) . ') ';
        } else {
            $where = '';
        }

        $query .= $where . $groupBy . $order;
        return $query;
		
    }

    function reloadProducts(&$products) {
        if (!$products)
            return false;

        $tmp = array();
        foreach ($products as $product) {
            $tmp[$product->id] = $product;
        }

        foreach ($tmp as $product) {
            if ($product->product_parent_id && (($this->_params->get('show_category_name') && !$product->category_name) || ($this->_params->get('show_manufacturer') && !$product->manufacturer_name))) {
                $parent = false;
                $noNeedCategory = !($this->_params->get('show_category_name') && !$product->category_name);
                $noNeedManufaturer = !($this->_params->get('show_manufacturer') && !$product->manufacturer_name);
                while ($product->product_parent_id) {
                    if (key_exists($product->product_parent_id, $tmp)) {
                        $parent = $tmp[$product->product_parent_id];
                    } else {
                        //thuc hien truy van
                        $db = JFactory::getDbo();
                        $query = $this->buildQuery(false, array($product->product_parent_id)) ;
                        $db->setQuery($query);
                        $parent = $db->loadObject();
                    }
                    $product->product_parent_id = $parent->product_parent_id;
                    if ($this->_params->get('show_category_name') &&  $parent->category_name && !$product->category_name){
                        $product->category_name = $parent->category_name;
                        $product->categories = $parent->categories;
                        $product->category_id = $parent->category_id;   
                        $noNeedCategory = true;
                    }
                    if ($this->_params->get('show_manufacturer') &&  $parent->manufacturer_name && $product->manufacturer_name){
                        $product->manufacturer_name = $parent->manufacturer_name;
                        $noNeedManufaturer = true;
                    }
                    if ($noNeedCategory && $noNeedManufaturer)
                        break;
                }
            }
            $tmp[$product->id] = $product;
        }
        foreach ($tmp as &$product){
            $product->virtuemart_product_id = $product->id;
            $product->categories = explode(',', $product->categories);
            if ($this->_params->get('show_price')) {
                $product = $this->getPrice($product, array(), 1);
            }
			
            
        }
		if($this->_params->get('show_rating', 1)){
			$ratingModel = VmModel::getModel('ratings');
			foreach ($tmp as &$product){	
				$product->showRating = $ratingModel->showRating($product->id);
				if ($product->showRating) 
				{
					$product->rating = $ratingModel->getRatingByProduct($product->virtuemart_product_id);
					$maxrating = VmConfig::get('vm_maximum_rating_scale', 5);
					$product->ratingSpan = '<span class="vote">';
					$width = $this->_params->get('start_width', 18) * $maxrating;
					if (empty($product->rating)) {
						$product->ratingSpan.= '<span style="width: ' . $width . 'px;" title="' . JText::_("RATING_UNRATE") . '" class="ratingbox" style="display:inline-block;">';
					}else{
						$ratingwidth =  $product->rating->rating * $this->_params->get('start_width', 18)  / $maxrating;
						$product->ratingSpan.= '<span style="width: ' . $width . 'px;" title="' . JText::_("RATING") . ' ' . $product->rating->rating . '/' . $maxrating . '" class="ratingbox" style="display:inline-block;">';
						$product->ratingSpan.= '<span class="" style="width: ' . $ratingwidth.'px"></span>';
						
					}
					$product->ratingSpan.='</span></span>';
				}
				
		    }
		}
        $products = $tmp;
    }

    public function getPrice($product, $customVariant, $quantity) {
        $this->_db = JFactory::getDBO();
        // 		vmdebug('strange',$product);

        // Loads the product price details
        if (!class_exists('calculationHelper'))
            require(JPATH_VM_ADMINISTRATOR . '/helpers/calculationh.php');
		$model = new VirtueMartModelProduct();
		$model->getRawProductPrices($product, 1, array(), true);
        $calculator = calculationHelper::getInstance();

        // Calculate the modificator
        $prices = $calculator->getProductPrices($product);
        $currency = CurrencyDisplay::getInstance();
        $oldPrice = 'basePrice';
        if($prices['taxAmount']){
            $oldPrice = 'basePriceWithTax';
        }
        $product->old_price = $currency->createPriceDiv($oldPrice, '', $prices, true, true);
        $product->sales_price = $currency->createPriceDiv('salesPrice', '', $prices, true, true);
        
        return $product;
    }

}
