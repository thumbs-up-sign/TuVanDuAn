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
if (file_exists(JPATH_SITE . '/components/com_jshopping/lib/factory.php'))
    require_once JPATH_SITE . '/components/com_jshopping/lib/factory.php';
if (file_exists(JPATH_SITE . '/components/com_jshopping/lib/functions.php'))
    require_once JPATH_SITE . '/components/com_jshopping/lib/functions.php';

class BtProductSliderJoomshoppingDataSource extends BTProductSliderSource {

	public function __construct($params) {
        parent::__construct($params);
        JSFactory::loadLanguageFile();
    }
    public function getList() {
        /**
         * Get data 
         */
        $db = JFactory::getDBO();
        $data = array();
        //select from
        $source = trim($this->_params->get('source', 'js_categories'));

        if ($source == 'js_categories') {
            $catids = $this->_params->get('js_categories', '');
        } else {
            if ($this->_params->get('js_ids', '')) {
                $ids = preg_split('/,/', $this->_params->get('js_ids', ''));
                $ids_tmp = array();
                foreach ($ids as $id) {
                    $ids_tmp[] = (int) trim($id);
                }
            }
        }

        if ($source == 'js_categories' && $catids && $this->_params->get('limit_items_for_each')) {
            foreach ($catids as $catid) {
                $query = $this->buildQuery($catid);
                $db->setQuery($query);
                $data = array_merge($data, $db->loadObjectlist());
            }
        } else if ($source == 'js_categories' && $catids) {

            $query = $this->buildQuery($catids);
            $db->setQuery($query);

            $data = array_merge($data, $db->loadObjectlist());
        } else if ($source == 'js_ids' && $ids_tmp && count($ids_tmp)) {
            $query = $this->buildQuery(false, $ids_tmp);
            $db->setQuery($query);
            $data = array_merge($data, $db->loadObjectlist());
        } else {
            $query = $this->buildQuery(false, false);
            $db->setQuery($query);
            $data = array_merge($data, $db->loadObjectlist());
        }
        //add link
        if (!class_exists('JSFactory')) return null;
		
		
		$jshopConfig = JSFactory::getConfig();
		$userShop = JSFactory::getUserShop();
		foreach ($data as $product) {
			$product->link = SEFLink('index.php?option=com_jshopping&controller=product&task=view&category_id=' . $product->category_id . '&product_id=' . $product->id,1);
			if ($jshopConfig->show_buy_in_category) {
				if (!($jshopConfig->hide_buy_not_avaible_stock && ($product->product_quantity <= 0))) {

					$product->add_to_cart = '<a class="bt-addtocart" href="' .
							SEFLink('index.php?option=com_jshopping&controller=cart&task=add&category_id=' . $product->category_id . '&product_id=' . $product->id, 1) .
							'" title="' . sprintf(JText::_('ADD_PRODUCT_TO_CART'), $product->name) . '">' . JText::_('ADD_TO_CART') . '</a>';
				}
			}
			if ($jshopConfig->image_product_live_path) {
				$product->thumbnail = $jshopConfig->image_product_live_path . '/' . $product->thumbnail;
			}
			$product->category_link = SEFLink('index.php?option=com_jshopping&controller=category&task=view&category_id=' . $product->category_id, 1);
			
			//calculate price
			
			$product->product_price = getPriceFromCurrency($product->product_price, $product->currency_id);
			$product->product_old_price = getPriceFromCurrency($product->product_old_price, $product->currency_id);

			$product->product_price = getPriceCalcParamsTax($product->product_price, $product->product_tax_id);
			$product->product_old_price = getPriceCalcParamsTax($product->product_old_price, $product->product_tax_id);

			if ($userShop->percent_discount) {
				$product->product_price = getPriceDiscount($product->product_price, $userShop->percent_discount);
				$product->product_old_price = getPriceDiscount($product->product_old_price, $userShop->percent_discount);
			}
			$product->old_price  ='';
			if($product->product_old_price)
				$product->old_price = formatprice($product->product_old_price);
			if($product->product_price)
				$product->sales_price = formatprice($product->product_price);
		}
        
        if (empty($data))
            return array();

        /**
         * Get display and config params 
         */
        /* title */
        $isStrips = $this->_params->get("auto_strip_tags", 1);

        $stringtags = '';
		if ($isStrips) {
			$allow_tags = $this->_params->get("allow_tags", '');
			$stringtags = '';
			if(!is_array($allow_tags)){
				$allow_tags = explode(',',$allow_tags);
			}
			foreach ($allow_tags as $tag) {
				$stringtags .= '<' . $tag . '>';
			}
		}
        if (!$this->_params->get('default_thumb', 1)) {
            $this->_defaultThumb = '';
        }
        /* intro */
        $maxDesciption = $this->_params->get('description_max_chars', 100);
        $limitDescriptionBy = $this->_params->get('limit_description_by', 'char');

        $isThumb = $this->_params->get('image_thumb', 1);
        $dateFormat = $this->_params->get('date_format', 'DATE_FORMAT_LC3');



        foreach ($data as $key => &$product) {

            if ($this->_params->get('show_date'))
                $product->date = JHtml::_('date', $product->created_on, JText::_($dateFormat));

            if ($this->_params->get('show_intro'))
                if ($limitDescriptionBy == 'word') {
                    $product->description = self::substrword($product->introtext, $maxDesciption, $stringtags);
                } else {
                    $product->description = self::substring($product->introtext, $maxDesciption, $stringtags);
                }
            //if show image
            if ($this->_params->get('show_image')) {
                $product->thumbnail = explode(',', $product->thumbnail);
                $thumbnail = '';
                foreach ($product->thumbnail as $tmpThumbnail) {
                    $type = explode('.', $tmpThumbnail);
                    $type = strtolower($type[count($type) - 1]);
                    if (in_array($type, array('jpg', 'jpeg', 'png', 'png'))) {
                        $thumbnail = $tmpThumbnail;
                        break;
                    }
                }
                $product->thumbnail = $thumbnail;
                $product = $this->generateImages($product, $isThumb);
            }
			
			//get label
			$product->label_image = ($product->label_image) ? $jshopConfig->image_labels_live_path."/". $product->label_image : '';
			
			if($this->_params->get('show_manufacturer')){
				$product->manufacturer_link = SEFLink('index.php?option=com_jshopping&controller=manufacturer&task=view&manufacturer_id='. $product->product_manufacturer_id);
			}
        }
		
		if($this->_params->get('show_rating')){
			foreach ($data as $key => &$product) {
				$count = floor($jshopConfig->max_mark / $jshopConfig->rating_starparts);
				$width = $count * $this->_params->get('start_width', 18);
				$rating = round($product->rating);
				
	
				$product->ratingSpan = '<span class="vote">';
				if (empty($rating)) {
					$product->ratingSpan.= '<span style="width: ' . $width . 'px;" title="' . JText::_("RATING_UNRATE") . '" class="ratingbox" style="display:inline-block;">';
				}else{
					$width_active = intval($rating * $this->_params->get('start_width', 18) / $jshopConfig->rating_starparts);
					$product->ratingSpan.= '<span style="width: ' . $width . 'px;" title="' . JText::_("RATING") . ' ' . $rating . '/' . $jshopConfig->max_mark . '" class="ratingbox" style="display:inline-block;">';
					$product->ratingSpan.= '<span class="" style="width: ' . $width_active.'px"></span>';
					
				}
				$product->ratingSpan.='</span></span>';
			}
		}
		
        return $data;
    }

    public function buildQuery($category_ids = false, $product_ids = false) {
        $app = JFactory::getApplication();

        //administrative variables to organize the joining of tables
        //build query
        $lang = JFactory::getLanguage()->getTag();
        $select = array();
        $select[] = 'p.`product_id` as id';
        $select[] = 'p.`parent_id` as parent_id';
        $select[] = 'p.`product_date_added`';
        $select[] = 'p.`product_quantity`';
        $select[] = 'p.`product_price`';
        $select[] = 'p.`product_old_price`';
        $select[] = 'p.`product_tax_id`';
        $select[] = 'p.`currency_id`';
		$select[] = '`#__jshopping_products_to_categories`.`category_id` as category_id';
        $from = ' FROM `#__jshopping_products` as p ';
		
		//get label image
		$select[] = 'lb.`image` as label_image ';
		$select[] = 'lb.`name_' . $lang . '` as label_name ';
		$from .= 'LEFT JOIN `#__jshopping_product_labels` as lb ON p.`label_id` = lb.`id` ';
		
        if ($this->_params->get('show_title'))
            $select[] = 'p.`name_' . $lang . '` as name';
        if ($this->_params->get('show_intro'))
            $select[] = 'p.`short_description_' . $lang . '` as introtext';
		
		$from .= ' LEFT JOIN `#__jshopping_products_to_categories` ON p.`product_id` = `#__jshopping_products_to_categories`.`product_id`';
        if ($this->_params->get('show_category_name')) {
            $select[] = 'c.`name_' . $lang . '` as category_name';
            $from .= ' LEFT JOIN `#__jshopping_categories` as c ON `#__jshopping_products_to_categories`.`category_id` = c.`category_id`';
        }

        if ($this->_params->get('show_image')) {
			if (!version_compare(JVERSION, '3.0', 'ge')) {
				$select[] = 'p.`product_full_image` as thumbnail';
			}else{
				$select[] = 'concat(\'full_\',p.`image`) as thumbnail';
			}
        }

        if ($this->_params->get('show_manufacturer')) {
			 $select[] = 'p.`product_manufacturer_id`';
            $select[] = 'm.`name_' . $lang . '` as manufacturer_name';
            $from .= ' LEFT JOIN `#__jshopping_manufacturers` as m ON p.`product_manufacturer_id` = m.`manufacturer_id`';
        }
		
		if ($this->_params->get('show_count_review', 1) || $this->_params->get('show_rating')){
			$select[] = 'rv.`review_count`';
			$select[] = 'rv.`rating`';
			$from .= ' LEFT JOIN (SELECT rvc.`product_id`, COUNT(rvc.`review_id`) as review_count, ROUND(AVG(rvc.`mark`),2) as rating  FROM `#__jshopping_products_reviews` as rvc WHERE rvc.`publish` = 1 GROUP BY rvc.`product_id`) as rv ON rv.`product_id` = p.`product_id`';
		}
		
		
        $groupBy = ' GROUP BY p.`product_id` ';

        //build condition
        $where = array();
        //check category_ids or product_ids
        if ($category_ids) {
            $category_ids = !is_array($category_ids) ? $category_ids : implode(',', $category_ids);
            $where[] = ' `#__jshopping_products_to_categories`.`category_id` IN (' . $category_ids . ') ';
        } else if ($product_ids) {
            $where[] = ' p.`product_id` IN (' . implode(',', $product_ids) . ') ';
        }

        //only get published product
        $where[] = ' p.`product_publish`="1" ';

        //only get product in stock or not
        $jshopConfig = JSFactory::getConfig();
        if ($jshopConfig->hide_product_not_avaible_stock) {
            $where[] = ' p.`product_quantity`>"0" ';
        }
		
        //access level
        $user = JFactory::getUser();
        $groups = implode(',', $user->getAuthorisedViewLevels());
        $where[] = 'p.access IN (' . $groups . ')';
		
		if ($this->_params->get('jslabel')){
			$where[] = 'lb.`id` = ' . $this->_params->get('jslabel');
		}

        $orderBy = ' ';
        // special  orders case
        if ($this->_params->get('ordering')) {
            // Set ordering
            $orderBy = explode('-', $this->_params->get('ordering'));           
			switch ($orderBy[0]) {
				case 'id': $orderBy[0] = 'p.`product_id`';
					break;
				case 'price': $orderBy[0] = 'p.`product_price`';
					break;
				case 'hits': $orderBy[0] = 'p.`ordering`';
					break;
				case 'bestsale':
					$select[] = 'SUM(OI.product_quantity) as max_num';
					$from .= 'INNER JOIN #__jshopping_order_item AS OI ON p.product_id= OI.product_id';
					$orderBy[0] = 'max_num';
					break;
				case 'created_on': $orderBy[0] = 'p.`product_date_added`';
					break;
				case 'rand':
					$orderBy[0] = 'RAND()';
					break;
				case 'ordering':
				default : $orderBy[0] = 'p.`product_price`';
					break;
			}
			$orderBy = ' ORDER BY ' . $orderBy[0] . ' ' . $orderBy[1];
            
        }
        if ($this->_params->get('limit_items'))
            $orderBy .= ' LIMIT ' . $this->_params->get('limit_items');



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

        $query .= $where . $groupBy . $orderBy;
        return $query;
    }

}

?>