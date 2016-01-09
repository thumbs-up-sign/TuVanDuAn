<?php
/**
 * @copyright	Copyright (c) 2013 Skyline Software (http://extstore.com). All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die();

$render_mode	= 'iframe';
$html_content	= '';

if (!$page_id) {
	$html_content	.= JText::_('MOD_SL_FBLIKEBOX_PAGE_ID_ERROR');
	return;
}

$query		= array();

if ($connections) {
	$query[]	= 'connections=' . $connections;
}

$query[]	= $stream ? 'stream="true"' : 'stream="false"';
$query[]	= $show_faces ? 'show_faces="true"' : 'show_faces="false"';

if ($width) {
	$query[]	= 'width="' . $width . '"';
}

if ($height) {
	$query[]	= 'height="' . $height . '"';
}

if ($border_color && $render_mode == 'iframe') {
	$query[]	= 'border_color="' . urlencode($border_color) . '"';
} else if ($border_color) {
	$query[]	= 'border_color="' . $border_color . '"';
}

$query[]	= $show_header ? 'header="true"' : 'header="false"';
$query[]	= 'colorscheme="' . $color_scheme . '"';

if ($enable_custom_css && $css_file && $render_mode == 'iframe') {
	$query[]	= 'css="' . urlencode($css_file) . '"';
} else if ($enable_custom_css && $css_file) {
	$query[]	= 'css="' . $css_file . '"';
}

$queries	= str_replace('"', '', implode('&amp;', $query));
$html_content	.= '<iframe scrolling="' . $show_scrollbar . '" frameborder="' . $frame_border
			. '" src="http://www.facebook.com/plugins/fan.php?id=' . $page_id . '&amp;' . $queries
			. '" style="border:none; overflow: hidden; width: ' . $width . 'px; height: ' . $height
			. 'px;" allowTransparency="true" locale=' . $language . '></iframe>'
;
?>
<div id="mod_sl_fbfanbox">
	<?php echo $html_content; ?>
</div>

