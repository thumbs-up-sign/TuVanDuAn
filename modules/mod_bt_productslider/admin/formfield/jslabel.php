<?php
/**
 * @package 	mod_bt_productslider - BT Product Slider Module
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
 
defined('_JEXEC') or die('Restricted access');

	
class JFormFieldJslabel extends JFormFieldList {
	protected $type = 'jslabel';
	
	public function getOptions() {
		$path = JPATH_ADMINISTRATOR . '/components/com_jshopping';
        if (!is_dir($path)) {
            $this->options[] = JHtml::_('select.option', '', JText::_('COM_JOOMSHOPPING_NOT_EXIST'));
			return $this->options;
        }else{
			$lang  = JFactory::getLanguage();
			$lang = $lang->getTag();
			$db = JFactory::getDbo();
			$query = $db->getQuery(true);
			$query->select('`id`, `name_' . $lang . '` as name');
			$query->from('#__jshopping_product_labels');
			$db->setQuery($query);
			$rs = $db->loadObjectList();
			$options = array();
			if ($error = $db->getErrorMsg()) {
				echo  $error; die;
				return false;
			};
			$options[''] = JTEXT::_('JSHOPPING_LABEL_FIELD');
			if($rs){
				foreach($rs as $r){
					$options[$r->id] =  $r->name; 
				}			
			}
			return $options;
		}	
		
	}	
}