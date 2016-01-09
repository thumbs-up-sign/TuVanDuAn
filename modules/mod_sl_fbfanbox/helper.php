<?php
/**
 * @copyright	Copyright (c) 2013 Skyline Software (http://extstore.com). All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die();

/**
 * Skyline Software - Facebook FanBox Helper Class.
 *
 * @package		Joomla.Site
 * @subpakage	Skyline.FBFanBox
 */
class modSL_FBFanBoxHelper {
	/**
	 * Write custom CSS to file.
	 *
	 * @params	string	Custom CSS
	 * @return	time	Last modified time.
	 */
	function writeCSS($css) {
		$file_path	= JPATH_ROOT . '/modules/mod_sl_fblikebox/assets';
		if (!JFolder::exists($file_path)) {
			JFolder::create($file_path);
		}
		$contents	= @file_get_contents($file_path . '/style.css');

		if ($contents != $css) {
			if (!file_put_contents($file_path . '/style.css', $css)) {
				return false;
			}
		}

		return filemtime($file_path . '/style.css');
	}

	function fixLanguageCode(&$lang) {
		$lang[3]	= strtoupper($lang[3]);
		$lang[4]	= strtoupper($lang[4]);
	}
}