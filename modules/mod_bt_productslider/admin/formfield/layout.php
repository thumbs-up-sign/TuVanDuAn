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
jimport('joomla.filesystem.folder');
jimport('joomla.filesystem.file');

/**
 * Form Field to display a list of the layouts for module display from the module or template overrides.
 *
 * @package     Joomla.Platform
 * @subpackage  Form
 * @since       11.1
 */
class JFormFieldLayout extends JFormField {

    /**
     * The form field type.
     *
     * @var    string
     * @since  11.1
     */
    protected $type = 'layout';

    public function getInput() {
		$themePath = JPATH_ROOT . '/modules/mod_bt_productslider/tmpl/themes';
		$themes = JFolder::folders($themePath);
	
		if($themes){
			$options = array();
			foreach($themes as $theme){
				if(JFile::exists($themePath. '/'. $theme . '/'. $theme . '.php') && $theme != 'responsive')
					$options[] = (object) array('value' => $theme, 'text' => $theme);
			}

			$attr = $this->element['class'] ? ' class="'.(string) $this->element['class'].'"' : '';
			// Prepare HTML code
			// Add a grouped list
			$html = JHtml::_(
							'select.genericlist', $options, $this->name, $attr, 'value', 'text', $this->value, $this->id
			);
			//$html = implode($html);
			$screenshotURI = JURI::root() . 'modules/mod_bt_productslider/tmpl/screenshots';
			$html .= '
				<div id="layout-demo">
					<a href="" rel="lightbox">Demo layout</a>
				</div>
				<script type="text/javascript">
					jQ = jQuery.noConflict();
					jQ(document).ready(function(){
						
						jQ("#jform_params_layout_chzn").css("float","left");
						var layout = jQ("#jform_params_layout").val();
						jQ("#layout-demo a").attr("href", "' . $screenshotURI . '/' . '" + layout + ".jpg");
						//hide field not belong to layout
						jQ(".layout-config").each(function(){
							if(!jQ(this).hasClass(layout)){
							
								jQ(this).parent().hide();
							}
						});
						
						//hide field not belong to layout when change layout
						jQ("#jform_params_layout").change(function(){
							layout = jQ(this).val();
							jQ("#layout-demo a").attr("href", "' . $screenshotURI . '/' . '" + layout + ".jpg");
							jQ(".layout-config").each(function(){
							if(!jQ(this).hasClass(layout)){
							
								jQ(this).parent().hide();
							}else{
								jQ(this).parent().show();
							}
						});
						});
						
						jQ("#layout-demo a").lightBox();
					});
				</script>
				<style type="text/css">
				#layout-demo{
					width: 88px; height: 18px;
					background: url(' . JURI::root() . 'modules/mod_bt_productslider/admin/images/demo.png'.') no-repeat;
					float: left;
					margin: 5px 10px;
					text-align: center;
				}
				#layout-demo a{
					color: #ffffff;
					font-family: arial; font-size: 11px;
					line-height: 17px;
				}
				</style>
				';
			return $html;
		}else{
			return null;
		}
    }

}

?>