<?php
/**
 * @package 	formfield
 * @version		2.0
 * @created		April 2012

 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2011 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');
jimport('joomla.html.parameter');
jimport( 'joomla.plugin.helper' );
class JFormFieldProfilefield extends JFormField {
	 protected $type = 'profilefield';
	 
	protected function getLabel() {
		return null;
	}
	 function getInput(){
	 	$formRegistration = new JForm('com_users.registration');
	 	$formProfile = new JForm('com_users.registration');
	 	$plugin = JPluginHelper::getPlugin('user','profile');
		
	 	
	 	//load language com_user and plugin profile
	 	$language = JFactory::getLanguage();
		$language_tag = $language->getTag();
		JFactory::getLanguage()->load('lib_joomla',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('com_users',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('plg_user_profile',JPATH_ADMINISTRATOR,$language_tag,true);
		
		 // Add the registration fields to the form.
		$formRegistration->loadFile(JPATH_ROOT.'/components/com_users/models/forms/registration.xml', false);
		// remove unused fiels of registrer form
		$formRegistration->removeField('captcha');
		$formRegistration->removeField('spacer');
		$formRegistration->removeField('password1');
		$formRegistration->removeField('password2');
		$formRegistration->removeField('email2');
		
		//setting  list box
		$class = $this->element['class'] ? (string) $this->element['class'] : '';
		$social = $this->element['social'] ? (string) $this->element['social'] : '';
		$html = '<ul class="profile-fields '.$class.'" id="'.$this->id.'" version="'.JVERSION.'">';
		$options =  array();

		switch($social){
			case 'facebook':
				$options[] = JHtml::_('select.option', '', JText::_('JNONE'));
				$options[] = JHtml::_('select.option', 'id', JText::_('ID'));
				$options[] = JHtml::_('select.option', 'name', 'Name');
				$options[] = JHtml::_('select.option', 'username', 'Username');
				$options[] = JHtml::_('select.option', 'email', 'Email');
				$options[] = JHtml::_('select.option', 'link', 'Profile link');
				//$options[] = JHtml::_('select.option', 'picture', 'Profile Picture');
				$options[] = JHtml::_('select.option', 'birthday', 'Date of birth');
				$options[] = JHtml::_('select.option', 'location', 'Location');
				$options[] = JHtml::_('select.option', 'hometown', 'Hometown');
				$options[] = JHtml::_('select.option', 'website', 'Website');
				$options[] = JHtml::_('select.option', 'bio', 'About me');
				$options[] = JHtml::_('select.option', 'quotes', 'Favorite Quotes');
			break;
			case 'google':
				$options[] = JHtml::_('select.option', '', JText::_('JNONE'));
				$options[] = JHtml::_('select.option', 'id', JText::_('ID'));
				$options[] = JHtml::_('select.option', 'name', 'Name');
				$options[] = JHtml::_('select.option', 'username', 'Username');
				$options[] = JHtml::_('select.option', 'email', 'Email');
				$options[] = JHtml::_('select.option', 'link', 'Profile link');
				//$options[] = JHtml::_('select.option', 'picture', 'Profile Picture');
				$options[] = JHtml::_('select.option', 'birthday', 'Date of birth');
			break;
			case 'twitter':
				$options[] = JHtml::_('select.option', '', JText::_('JNONE'));
				$options[] = JHtml::_('select.option', 'id', JText::_('ID'));
				$options[] = JHtml::_('select.option', 'name', 'Name');
				$options[] = JHtml::_('select.option', 'username', 'Screen Name');
				$options[] = JHtml::_('select.option', 'link', 'Profile link');
				//$options[] = JHtml::_('select.option', 'picture', 'Profile Picture');
				$options[] = JHtml::_('select.option', 'birthday', 'Date of birth');
				$options[] = JHtml::_('select.option', 'location', 'Location');
				$options[] = JHtml::_('select.option', 'website', 'Website');
				$options[] = JHtml::_('select.option', 'bio', 'Description');
				$options[] = JHtml::_('select.option', 'status', 'Status');
			break;
		}
		
		
		//add field from register form
	  	foreach ($formRegistration->getFieldsets() as $fieldset){
				$fields = $formRegistration->getFieldset($fieldset->name);
				if (count($fields)){ 
						foreach($fields as $field){
							 $html .= '<li class="control-group">'.$field->getLabel();
							 if($field->fieldname == 'name'){
								$html .=  JHtml::_('select.genericlist', $options, '', 'class="name control-group"' , 'value', 'text', 'name');
							}elseif($field->fieldname == 'username'){
								$html .=  JHtml::_('select.genericlist', $options, '', 'class="username control-group"' , 'value', 'text', $social=='google'?'email':'username');
							}elseif($field->fieldname == 'email1'){
								$html .=  JHtml::_('select.genericlist', $options, '', 'class="email1 control-group" disabled="disabled"' , 'value', 'text', 'email');
								if($social=='twitter') $html.= '<br /><span style="color:red;line-height:200%">The Twitter API does not provide the user\'s email address. So if you turn off "editing email" the twitter users will have email type: screen_name@twitter.com</span>';
							}
					 	}
					 }
		}
		
		//load fields of plugin profile
	 	if($plugin != null){
	 		$params = new JRegistry();
	 		$params->loadString($plugin->params);
	 		
			$formProfile->loadFile(JPATH_ROOT.'/plugins/user/profile/profiles/profile.xml', false);
			$fields = array(
				'address1',
				'address2',
				'city',
				'region',
				'country',
				'postal_code',
				'website',
				'favoritebook',
				'aboutme',
				'dob',
			);
			//remove field unused
			$formProfile->removeField('tos','profile');
			//$formProfile->removeField('city','profile');
			//$formProfile->removeField('region','profile');
			//$formProfile->removeField('country','profile');
			$formProfile->removeField('postal_code','profile');
			$formProfile->removeField('favoritebook','profile');
			$formProfile->removeField('phone','profile');
			
			//remove field disable in profile form
			foreach ($fields as $field)
			{	
	
				if ($params->get('register-require_' . $field, 1) > 0)
				{
					$formProfile->setFieldAttribute($field, 'required', ($params->get('register-require_' . $field) == 2) ? 'required' : '', 'profile');
				}
				else
				{
					$formProfile->removeField($field, 'profile');
				}
			}
			 foreach ($formProfile->getFieldsets() as $fieldset){
					 $fields = $formProfile->getFieldset($fieldset->name);
					 if (count($fields)){
						$html .= '<li class="control-group"><h3 class="enable_profile_1">Profile plugin:</h3></li>';
						foreach($fields as $field){
							$html .= '<li class="control-group">'.$field->getLabel() ;
								if($field->fieldname == 'address1'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_address1 enable_profile_1"' , 'value', 'text', 'location');
								}elseif ($field->fieldname == 'address2'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_address2 enable_profile_1"' , 'value', 'text', '');
								}
								elseif($field->fieldname == 'city'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_city enable_profile_1"' , 'value', 'text', 'hometown');
								}
								elseif($field->fieldname == 'region'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_region enable_profile_1"' , 'value', 'text', '');
								}
								elseif($field->fieldname == 'country'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_country enable_profile_1"' , 'value', 'text', '');
								}
								elseif($field->fieldname == 'website'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_website enable_profile_1"' , 'value', 'text', 'website');
								}elseif($field->fieldname == 'aboutme'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_aboutme enable_profile_1"' , 'value', 'text', 'bio');
								}elseif($field->fieldname == 'dob'){
									$html .=  JHtml::_('select.genericlist', $options, '', 'class="profile_dob enable_profile_1"' , 'value', 'text', 'birthday');
								}
					 	}
					 }
			 }
			 
	 	}
		$html .="</ul>";
		$html  .= '<input class="socialinput" type="hidden" name="'.$this->name.'" value="'.$this->value.'" />';
		return $html;
	 }
}