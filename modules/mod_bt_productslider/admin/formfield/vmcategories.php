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
// no direct access
defined('_JEXEC') or die('Restricted access');
jimport('joomla.html.html');
jimport('joomla.form.formfield');

class JFormFieldVMCategories extends JFormFieldList {

    protected $type = 'vm_categories'; //the form field type
    var $options = array();

    protected function getInput() {
        // Initialize variables.
        $html = array();
        $attr = '';


        $attr .= $this->element['size'] ? ' size="' . (int) $this->element['size'] . '"' : '';
        $attr .= $this->multiple ? ' multiple="multiple"' : '';
		$attr .= $this->element['class'] ? ' class="'.(string) $this->element['class'].'"' : '';

        // Get the field options.
        $options = (array) $this->getOptions();
        // Create a read-only list (no name) with a hidden input to store the value.
        if ((string) $this->element['readonly'] == 'true') {
            $html[] = JHtml::_('select.genericlist', $options, '', trim($attr), 'value', 'text', $this->value, $this->id);
            $html[] = '<input type="hidden" name="' . $this->name . '" value="' . $this->value . '"/>';
        }
        // Create a regular list.
        else {
            $html[] = JHtml::_('select.genericlist', $options, $this->name, trim($attr), 'value', 'text', $this->value, $this->id);
        }

        return implode($html);
    }

    protected function getOptions() {
        //check com_vituemart existed
        $path = JPATH_ADMINISTRATOR . '/components/com_virtuemart';
        if (!is_dir($path) || !file_exists(JPATH_ADMINISTRATOR .'/components/com_virtuemart/helpers/config.php')) {
            $this->options[] = JHtml::_('select.option', '', JText::_('COM_VIRTUEMART_NOT_EXIST'));
        } else {
            // Initialize variables
            require_once JPATH_ADMINISTRATOR . '/components/com_virtuemart/helpers/config.php';
            require_once JPATH_ADMINISTRATOR . '/components/com_virtuemart/models/category.php';
            VmConfig::loadConfig();

            $categoryModel = new VirtueMartModelCategory();
			$categoryModel->_noLimit = true;
            $categories= $categoryModel->getCategories();
            if (count($categories)) {
                // iterating
                $temp_options = array();

                foreach ($categories as $item) {
                    array_push($temp_options, array($item->virtuemart_category_id, $item->category_name, $item->category_parent_id));
                }

                foreach ($temp_options as $option) {
                    if ($option[2] == 0) {
                        $this->options[] = JHtml::_('select.option', $option[0], $option[1]);
                        $this->recursive_options($temp_options, 1, $option[0]);
                    }
                }
            }
        }
        return $this->options;
    }

    // bind function to save
    function bind($array, $ignore = '') {
        if (key_exists('field-name', $array) && is_array($array['field-name'])) {
            $array['field-name'] = implode(',', $array['field-name']);
        }

        return parent::bind($array, $ignore);
    }

    function recursive_options($temp_options, $level, $parent) {
        foreach ($temp_options as $option) {
            if ($option[2] == $parent) {
                $level_string = '';
                for ($i = 0; $i < $level; $i++)
                    $level_string .= '- - ';
                $this->options[] = JHtml::_('select.option', $option[0], $level_string . $option[1]);
                $this->recursive_options($temp_options, $level + 1, $option[0]);
            }
        }
    }

}
