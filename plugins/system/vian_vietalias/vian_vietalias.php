<?php
 /**
 * @version		3.1.x
 * @package		Vian Vietnamese Alias
 * @subpackage	plg_system_vian_vietalias
 * @copyright	Copyright (C) 2010-2012 VINAORA. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 *
 * @website		http://vian.vn
 * @twitter		http://twitter.com/truongdaily
 * @facebook	http://facebook.com/viandesign
 * @google+		https://plus.google.com/105517456947718994459
 *
 * @note		See more details >> http://en.wikipedia.org/wiki/Vietnamese_alphabet
 */
 
 
// no direct access
defined('_JEXEC') or die;

jimport( 'joomla.plugin.plugin' );

class plgSystemVian_VietAlias extends JPlugin
{
	var $layout = '';
	var $option = '';

	function __construct(& $subject, $config)
	{
		parent::__construct($subject, $config);
		
		$this->layout = JRequest::getCmd('layout');
		$this->option = JRequest::getCmd('option');

		if ( $this->layout != 'edit') return;
		
		$active = (bool) $this->params->get('active_on');
		$pages	= $this->params->get('active_on_specific');
		
		if( $active || (strpos($pages, $this->option) !== false) )
		{
			require_once __DIR__ . '/output.php';
		}

	}

	function onAfterDispatch()
	{
		
		if ( $this->layout != 'edit') return false;
		
		$auto_complete	= (bool) $this->params->get('auto_complete');
		$pages			= $this->params->get('auto_complete_on_specific');
		
		if( $auto_complete || (strpos($pages, $this->option) !== false) )
		{
			$document = JFactory::getDocument();
			$document->addScript( rtrim(JURI::root( true ), '/').'/media/plg_system_vian_vietalias/js/vian_vietalias.js' );
		}
		return true;
	}
}
