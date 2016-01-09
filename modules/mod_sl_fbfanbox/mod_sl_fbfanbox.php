<?php
/**
 * @copyright	Copyright (c) 2013 Skyline Software (http://extstore.com). All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die();

// include the syndicate functions only once
require_once(__DIR__ . '/helper.php');

$class_sfx			= htmlspecialchars($params->get('class_sfx'));
$class_sfx			= htmlspecialchars($params->get('class_sfx'));
$page_id			= $params->get('page_id');
$connect_script		= $params->get('connect_script');
$render_mode		= $params->get('render_mode', 'iframe');
$stream				= $params->get('stream', 1);
$connections		= $params->get('connections', 10);
$show_faces			= $params->get('show_faces', 1);
$language			= $params->get('language', 'en_GB');
if ($language == 'default') {
	$lang		= &JFactory::getLanguage();
	$language	= $lang->getTag();
	$language	= str_replace('-', '_', $language);
} else if ($language == 'browser') {
	$language	= substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5);
	$language	= str_replace('-', '_', $language);
	modSL_FBFanBoxHelper::fixLanguageCode($language);
}

$width				= $params->get('width', 400);
$height				= $params->get('height', 200);
$color_scheme		= $params->get('color_scheme', 'light');
$border_color		= $params->get('border_color');
$show_header		= $params->get('show_header', 1);
$show_scrollbar		= $params->get('show_scrollbar');
$frame_border		= $params->get('frame_border');
$enable_custom_css	= $params->get('enable_custom_css');
$custom_css			= $params->get('custom_css');

// write css
if ($enable_custom_css) {
	if ($css_file_time = modSL_FBFanBoxHelper::writeCSS($custom_css)) {
		$css_file		= JURI::base() . '/modules/mod_sj_fblikebox/assets/style.css?' . $css_file_time;
	}
}

require(JModuleHelper::getLayoutPath('mod_sl_fbfanbox', $params->get('layout', 'default')));