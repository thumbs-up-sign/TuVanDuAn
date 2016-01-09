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
// No direct access to this file
defined('_JEXEC') or die;

// import the list field type
jimport('joomla.html.html');
jimport('joomla.form.formfield');

/**
 * PortfolioCategory Form Field class for the bt_portfolio component
 */
class JFormFieldJSCategories extends JFormFieldList {

    /**
     * The field type.
     *
     * @var		string
     */
    protected $type = 'jscategories';
    private $options = array();

    /**
     * Method to get a list of options for a list input.
     *
     * @return	array		An array of JHtml options.
     */
    protected function getOptions() {
        //check com_vituemart existed
        $path = JPATH_ADMINISTRATOR . '/components/com_jshopping';
        if (!is_dir($path)) {
            $this->options[] = JHtml::_('select.option', '', JText::_('COM_JOOMSHOPPING_NOT_EXIST'));
        } else {
            $db = JFactory::getDBO();
            $lang = JFactory::getLanguage();

            $query = "SELECT `name_" . $lang->get('tag') . "` as name, category_id, category_parent_id, category_publish FROM `#__jshopping_categories`
           	   ORDER BY category_parent_id, ordering";
            $db->setQuery($query);
            $all_cats = $db->loadObjectList();

            if (count($all_cats)) {
                foreach ($all_cats as $key => $value) {
                    if (!$value->category_parent_id) {
                        $this->recurseTree($value, 0, $all_cats, $this->options);
                    }
                }
            }
        }
        return $this->options;
    }

    function recurseTree($cat, $level, $all_cats, &$categories, $is_select = 1) {
        $probil = '';
        if ($is_select) {
            for ($i = 0; $i < $level; $i++) {
                $probil .= '-- ';
            }
            $cat->name = ($probil . $cat->name);
            $categories[$cat->category_id] = $cat->name;
        } else {
            $cat->level = $level;
            $categories[$cat->category_id] = $cat->name;
        }
        foreach ($all_cats as $categ) {
            if ($categ->category_parent_id == $cat->category_id) {
                $this->recurseTree($categ, ++$level, $all_cats, $categories, $is_select);
                $level--;
            }
        }
        return $categories;
    }

}