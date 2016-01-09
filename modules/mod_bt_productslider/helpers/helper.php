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
jimport('joomla.filesystem.folder');

if (!defined('ThumbLoaded')) {
    require_once JPATH_SITE . '/modules/mod_bt_productslider/classes/images.php';
    define('ThumbLoaded', 1);
}

class modBtProductSliderHelper {

    /**
     * Get list articles
     * Ver 1 : only form content
     */
    public static function getList(&$params, $module) {
        // create thumbnail folder
        $thumbPath = JPATH_SITE .'/cache/'.$module->module.'/';
		$thumbUrl  = str_replace(JPATH_BASE.'/',JURI::base(),$thumbPath);
		$defaultThumb = JURI::base().'modules/'.$module->module.'/images/no-image.jpg';	

        if (!file_exists($thumbPath)) {
            JFolder::create($thumbPath, 0755);
        };
        //Get source form params
        $source = $params->get('source', 'vm_categories');
        if ($source == 'vm_categories' || $source == 'vm_ids') {
            $source = 'virtuemart';
        } else if ($source == 'js_categories' || $source == 'js_ids') {
            $source = 'joomshopping';
        } else {
            $source = 'virtuemart';
        }


        $path = JPATH_SITE . '/modules/mod_bt_productslider/classes/' . $source . ".php";
        //echo $path;
        //die();

        if (!file_exists($path)) {
            return array();
        }
        require_once $path;
        $objectName = "BtProductSlider" . ucfirst($source) . "DataSource";
        $object = new $objectName($params);
        //3 step
        //1.set images path
        //2.Render thumb
        //3.Get List
        $items = $object->setThumbPathInfo($thumbPath,$thumbUrl,$defaultThumb)
			->setImagesRendered( array( 'thumbnail' =>
										array( (int)$params->get( 'thumbnail_width', 60 ), (int)$params->get( 'thumbnail_height', 60 ))
									) )
			->getList();
        return $items;
    }

    public static function fetchHead($params) {
        $document = JFactory::getDocument();
        $header = $document->getHeadData();
        $mainframe = JFactory::getApplication();
        $template = $mainframe->getTemplate();
        $layout = $params->get('layout','default');
        $templatePath = JPATH_BASE . '/templates/' . $template . '/html/mod_bt_productslider/themes/' . $layout;
        $templateURL = JURI::root() . 'templates/' . $template . '/html/mod_bt_productslider/themes/' . $layout;
        $moduleURL = JURI::root() . 'modules/mod_bt_productslider';
        $moduleLayoutURL = $moduleURL . '/tmpl/themes/' . $layout;

        $loadJquery = true;
        $jcarousel = true;
        $easing = true;
        $jqueryui = true;
        $booklet = true;
        switch ($params->get('loadJquery', "auto")) {
            case "0":
                $loadJquery = false;
                break;
            case "1":
                $loadJquery = true;
                break;
            case "auto":

                foreach ($header['scripts'] as $scriptName => $scriptData) {
                    if (substr_count($scriptName, '/jquery')) {
                        $loadJquery = false;
                    }
					if (substr_count($scriptName, 'jcarousel')) {
                        $jcarousel = false;
                    }
					if (substr_count($scriptName, 'jquery.easing')) {
                        $easing = false;
                    }
					if (substr_count($scriptName, 'jquery-ui')) {
                        $jqueryui = false;
                    }
					if (substr_count($scriptName, 'jquery.booklet')) {
                        $booklet = false;
                    }
                }
                break;
        }
        //Add js
        if ($loadJquery) {$document->addScript($moduleURL . '/assets/js/jquery.min.js');}
        //add jcarousel lib
		
		if($layout =='flipbook'){
			if ($jqueryui) {$document->addScript($moduleURL . '/assets/js/jquery-ui.min.js');}
			if ($booklet) {$document->addScript($moduleURL . '/assets/js/jquery.booklet.js');}
			$document->addStyleSheet($moduleURL . '/assets/css/booklet.css');
		
		}else{
			$document->addScript($moduleURL . '/assets/js/jcarousel.js');
			$document->addStyleSheet($moduleURL . '/assets/css/jcarousel.css');
		}		
        
        //overide css for layout
        if (file_exists($templatePath . '/css/btproductslider.css')) {
            $document->addStyleSheet($templateURL . '/css/btproductslider.css');
        } else {
            $document->addStyleSheet($moduleLayoutURL . '/css/btproductslider.css');
        }

        if (file_exists($templatePath . '/js/default.js')) {
            $document->addScript($templateURL . '/js/default.js');
        } else {
            $document->addScript($moduleLayoutURL . '/js/default.js');
        }
        
        if($layout =='flipbook'){
			if ($easing) {$document->addScript($moduleURL . '/assets/js/jquery.easing.1.3.js');}
		}
    }

    public static function addtocart($product) {
        if (!class_exists( 'VmConfig' )) require(JPATH_ADMINISTRATOR . '/components/com_virtuemart/helpers/config.php');
            VmConfig::loadConfig();
            vmJsApi::jPrice(); 
			if(version_compare(JVM_VERSION, 3, 'ge')){
				echo vmJsApi::writeJS();
			}		
        if (!VmConfig::get('use_as_catalog', 0)) {
            $add_to_cart = 
                '<form method="post" class="product" action="index.php">
				<span class="addtocart-button">
                    <input type="submit" name="addtocart"  class="bt-addtocart addtocart-button" value="'. JText::_('Add cart') .'" title="' . sprintf(JText::_('ADD_PRODUCT_TO_CART'), $product->name) .'" />
				</span>
                    <input type="hidden" class="pname" value="' . $product->name .'"/>
                    <input type="hidden" name="option" value="com_virtuemart" />
                    <input type="hidden" name="view" value="cart" />
                    <noscript><input type="hidden" name="task" value="add" /></noscript>
                    <input type="hidden" class="quantity-input" name="quantity[]" value="1" />
                    <input type="hidden" name="virtuemart_product_id[]" value="' .$product->id .'" />
                    <input type="hidden" name="virtuemart_category_id[]" value="'.$product->category_id. '" />
                </form>';
            return $add_to_cart;
        }
        return false;
    }
}