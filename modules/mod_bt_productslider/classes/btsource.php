<?php

/**
 * @package 	mod_bt_productslider - BT ProductSlider Module
 * @version	1.0
 * @created	September 2012
 * @author	BowThemes
 * @email	support@bowthems.com
 * @website	http://bowthemes.com
 * @support	Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2012 Bowthemes. All rights reserved.
 * @license	http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

/**
 * class BTSource
 */
require_once JPATH_SITE . '/modules/mod_bt_productslider/classes/images.php';

abstract class BTProductSliderSource {

    public $_thumbnailPath = "";
    public $_thumbnaiURL = "";
    public $_defaultThumb = '';
    public $_imagesRendered = array('thumbnail' => array(), 'mainImage' => array());
    public $_params = array();

    public function __construct($params = null) {
        $this->_params = $params;
    }

    function setThumbPathInfo($path, $url,$defaultThumb) {
        $this->_thumbnailPath = $path;
        $this->_thumbnaiURL = $url;
        $this->_defaultThumb = $defaultThumb;
        return $this;
    }

    public function setImagesRendered($name = array()) {
        $this->_imagesRendered = $name;
        return $this;
    }

    public function renderThumb($path, $width = 280, $height = 150, $isThumb = true) {
        if ($isThumb) {
            if (!$path) {
                $path = $this->_defaultThumb;
            }
            $path = str_replace(JURI::base(), '', $path);

            $imagSource = JPATH_SITE .'/'. $path;
            $imagSource = urldecode($imagSource);
            if (file_exists($imagSource)) {
                $tmp = explode("/", $path);
                $imageName = $width . "x" . $height . "-" . $tmp[count($tmp) - 1];
                $thumbPath = $this->_thumbnailPath . $imageName;
                if (!file_exists($thumbPath)) {
                    //create thumb
                    BTImageHelper::createImage($imagSource, $thumbPath, $width, $height, true);
                }
                $path = $this->_thumbnaiURL . $imageName;
            }
        }
        //return path

        return $path;
    }

    /**
     * parser a image in the content of article.
     *
     * @param.
     * @return
     */
    //create thumb and save link to item
    public function generateImages($item, $isThumb = true) {
        foreach ($this->_imagesRendered as $key => $value) {
            $image = $this->renderThumb($item->{$key}, $value[0], $value[1], $isThumb);
            $item->{$key} = $image;
        }

        return $item;
    }

    /**
     * Get a subtring with the max length setting.
     *
     * @param string $text;
     * @param int $length limit characters showing;
     * @param string $replacer;
     * @return tring;
     */
    public static function substring($text, $length = 100, $replacer = '...', $isStrips = true, $stringtags = '') {
	
		if($isStrips){
			$text = preg_replace('/\<p.*\>/Us','',$text);
			$text = str_replace('</p>','<br />',$text);
			$text = strip_tags($text, $stringtags);
		}
		
		if(function_exists('mb_strlen')){
			if (mb_strlen($text) < $length)	return $text;
			$text = mb_substr($text, 0, $length);
		}else{
			if (strlen($text) < $length)	return $text;
			$text = substr($text, 0, $length);
		}
		
		return $text . $replacer;
	}

    /**
     * Get a subtring with the max word setting
     *
     * @param string $text;
     * @param int $length limit characters showing;
     * @param string $replacer;
     * @return tring;
     */
    public static function substrword($text, $length = 100, $replacer = '...', $isStrips = true, $stringtags = '') {
		if($isStrips){
			$text = preg_replace('/\<p.*\>/Us','',$text);
			$text = str_replace('</p>','<br />',$text);
			$text = strip_tags($text, $stringtags);
		}
		$tmp = explode(" ", $text);

		if (count($tmp) < $length)
			return $text;

		$text = implode(" ", array_slice($tmp, 0, $length)) . $replacer;

		return $text;
	}

    abstract public function getList();
}

?>