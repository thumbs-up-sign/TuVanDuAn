<?php
/**
 * @package 	mod_bt_sociallogin - BT Sociallogin Module
 * @version		1.1.0
 * @created		April 2012

 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2011 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */
defined ( '_JEXEC' ) or die ( 'Restricted access' );
 
/**
 * Script file of BT social login component
 */
class Mod_bt_socialloginInstallerScript
{
        function update($parent) 
        {
            $db= JFactory::getDBO();
			$db->setQuery("CREATE TABLE IF NOT EXISTS `#__bt_sociallogin`(`user_id` int(11) NOT NULL,`social_id` varchar(255) default NULL,`social_type` varchar(255) default NULL,`access_token` varchar(255) default NULL,`data` text default NULL,PRIMARY KEY (`user_id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;");
			$db->query();
			// $parent is the class calling this method
            echo '<h3>BT Social Login Module have been updated to version '. ($parent->get('manifest')->version).' successfully</h3>';
        }

}