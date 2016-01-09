<?php
/**
 * @package 	mod_bt_productslider - BT ProductSlider Module
 * @version		1.0.0
 * @created		Oct 2012

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

require_once JPATH_SITE.'/modules/mod_bt_productslider/helpers/helper.php';

$source = $params->get('source');
//Get list content
$list = modBtProductSliderHelper::getList( $params, $module ); 

$moduleclass_sfx = $params->get('moduleclass_sfx');
$imgClass = $params->get('hovereffect',1)? 'class="hovereffect"':'';


$tmp = $params->get( 'module_height', 'auto' );
$moduleHeight   =  ( $tmp=='auto' ) ? 'auto' : ((int)$tmp).'px';
$tmp = $params->get( 'module_width', 'auto' );
$moduleWidth    =  ( $tmp=='auto') ? 'auto': ((int)$tmp).'px';

$moduleWidthWrapper = ( $tmp=='auto') ? '100%': (int)$tmp.'px';

//Get Open target
$openTarget 	= $params->get( 'open_target', '_parent' );

//auto_start
$auto_start 	= $params->get('auto_start',1);

//butlet and next back
$next_back 		= $params->get( 'next_back', 0 );
$butlet 		= $params->get( 'butlet', 1 );



//Option for content
$showReadmore = $params->get( 'show_readmore', '1' );
$showTitle = $params->get( 'show_title', '1' );

$show_category_name = $params->get( 'show_category_name', 0 );
$show_category_name_as_link = $params->get( 'show_category_name_as_link', 0 );
$showPrice = $params->get('show_price', 1);
$showDate = $params->get( 'show_date', '0' );
$showManufacturer = $params->get( 'show_manufacturer', '0' );
$show_intro = $params->get( 'show_intro', '0' );

//Option for image
$thumbWidth    = (int)$params->get( 'thumbnail_width', 200 );
$thumbHeight   = (int)$params->get( 'thumbnail_height', 150 );

$image_crop = $params->get( 'image_crop', '0' );
$show_image = $params->get( 'show_image', '0' );
$showViewDetails = $params->get( 'show_view_details', '1' );
$showAddToCart = $params->get( 'show_add_to_cart', '1' );
$showReviewCount = $params->get('show_review_count', 1);
$showRating = $params->get('show_rating', 1);

//Get tmpl
$align_image = strtolower($params->get( 'image_align', "center" ));
$layout = $params->get('layout', 'default');
modBtProductSliderHelper::fetchHead( $params );

$document = JFactory::getDocument();
$params->set('rtl',$document->direction == 'rtl');
require JModuleHelper::getLayoutPath('mod_bt_productslider', '/themes/'.$layout.'/'.$layout);


?>

