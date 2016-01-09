<?php
/**
 * @package 	mod_bt_sociallogin - BT Sociallogin Module
 * @version		1.0.0
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

class scloginHelper
{
/**********************************SETTING FOR CONNECT SOCIAL***************************************************/
	public static $messages = array();
	# set state Session for check request type
	public static function setStateSession(&$session){	
		if(!$session->get('btl-s') )
		{
			$state= new stdClass();
			$state->facebook = 'fb';
			$state->google   = 'gg';
			$state->twitter  = 'tt';
			$session->set('btl-s',$state); 
		}
	}
	
	/*================= Facebook Social ========================================*/
	/**
	 * Set dialog url for fb connect
	 * @param String $appfb_id 		: id of app facebook,
	 * @param String $callback_url 	: call back url affter get code with facebook,
	 * @param String $state			: state in session, use to check security
	 */
	public  static  function getDialogUrl($app_id,$callback_url,$state,$social){
		if($social=='facebook'){
			$dialog_url = "http://www.facebook.com/dialog/oauth?client_id=" 
	       				  . $app_id . "&redirect_uri=" . urlencode($callback_url) . "&state="
	       				  . $state
	       				  ."&display=popup&scope=email,user_birthday,user_location,email,user_website,user_photos,user_hometown,user_about_me";
		}elseif($social=='google'){
			$dialog_url = 'https://accounts.google.com/o/oauth2/auth?client_id='
						  .$app_id.'&redirect_uri='. urldecode($callback_url).'&state='.$state
						  .'&scope=https://www.googleapis.com/auth/userinfo.email'
						  .'+https://www.googleapis.com/auth/userinfo.profile'
						  .'&response_type=code';
		}
       return $dialog_url;
	}
	
	
	/**
	 * get base url in popup call fb connect 
	 * @param String $current_url
	 */
	public static function getOpenerUrl($curent_url){
		$indexOfSubString = strpos($curent_url,"&state");
   		if($indexOfSubString == 0){
   			$indexOfSubString = strpos($curent_url,"?state");
   		}
   		if($indexOfSubString!=0){
   		 	$callback_url = substr($curent_url,0,$indexOfSubString);
   		}
   		return $callback_url;
	}
	
	/**
	 * create url to get token fb
	 * @param String $appfb_id
	 * @param String $callback_url
	 * @param String $appfb_secret
	 * @param String $code
	 */
	public static function getTokenUrl($appfb_id,$callback_url,$appfb_secret,$code){
		 return "https://graph.facebook.com/oauth/access_token?"
       . "client_id=" . $appfb_id . "&redirect_uri=" . urlencode($callback_url)
       . "&client_secret=" . $appfb_secret ."&code=" . $code;
	}
	
	/**
	 * 
	 * Register function for Social connect ( not send activation link)
	 * @param Array $temp
	 */
	public static function prepareData($user,$type){
		$data = array();
		switch($type){
			case 'facebook': 
				$data ['id'] = $user->id;
				$data ['name'] = $user->name;
				$data ['username'] =  $user->username;
				$data ['email'] =  $user->email;
				if($data['username'] == ''){
					$data['username'] = $user->email;
				}
				$data ['link'] = $user->link;
				$data ['location'] = isset($user->location->name)? $user->location->name:'';
				$data ['hometown'] = isset($user->hometown->name)? $user->hometown->name:'';
				$data ['website'] =  isset($user->website)? $user->website:'';
				$data ['bio'] = isset($user->bio)? $user->bio:'';
				$data ['quotes'] = isset($user->quotes)? $user->quotes:'';
				$data ['birthday'] = isset($user->birthday)? $user->birthday:'';
				//$data ['picture'] = isset($user->picture)? $user->picture:'';
			break;
			case 'google': 
				$data ['id'] = $user->id;
				$data ['name'] = $user->name;
				list($data ['username']) = explode('@',$user->email);
				$data ['email'] = $user->email;
				$data ['link'] = $user->link;
				$data ['birthday'] = isset($user->birthday)? $user->birthday:'';
				//$data ['picture'] = isset($user->picture)? $user->picture:'';
			break;
			case 'twitter':
				$data ['id'] = $user->id;
				$data ['name'] = $user->name;
				$data ['email'] =  $user->screen_name.'@twitter.com';
				$data ['username'] =  $user->screen_name;
				$data ['location'] = isset($user->location)? $user->location:'';
				//$data ['picture'] = isset($user->profile_image_url)? $user->profile_image_url:'';
				$data ['website'] = $user->url;
				$data ['link'] = 'https://twitter.com'.$user->screen_name;
				$data ['status'] = isset($user->status->text)? $user->status->text:'';
				$data ['bio'] = isset($user->description)? $user->description:'';
			break;
		}
		$data['loginType'] = $type;
		$data['rawData'] = serialize($user);
		return $data;
	} 
	
	/**
	 * register new user with information get from fbuser
	 * @param Object $params
	 * @param Array $user
	 */ 
	public static function assignProfile($user, $profiles) {
		$profiles = base64_decode ( $profiles );
		$profiles = json_decode ( $profiles );
		$data = array ();
		
		$data ['name'] = $user[$profiles->name];
		$data ['username'] = $user[$profiles->username];
		$data ['email1'] = $user['email'];
		$data ['email2'] = $user['email'];
		$data ['socialId'] = $user['id'];
		$data ['loginType'] = $user['loginType'];
		$data ['rawData'] = $user['rawData'];
		$password = uniqid();
		$data ['password1'] = $password;
		$data ['password2'] = $password;
		// set value for profile fields
		$data['profile'] = array ();
		
		jimport( 'joomla.plugin.helper' );
		$plugin = JPluginHelper::getPlugin('user','profile');
	 	
		if($plugin != null){
			
			$paramsPlugin = new JRegistry();
		 	$paramsPlugin->loadString($plugin->params);
		 				
			if(property_exists($profiles,'profile_address1')){
				$data ['profile'] ['address1']= $user[$profiles->profile_address1];
			}
			
			if(property_exists($profiles,'profile_address2')){
				$data ['profile'] ['address2']= $user[$profiles->profile_address2];
			}
			
			if(property_exists($profiles,'profile_city')){
				$data ['profile'] ['city']= $user[$profiles->profile_city];
			}
			
			if(property_exists($profiles,'profile_region')){
				$data ['profile'] ['region']= $user[$profiles->profile_region];
			}
			
			if(property_exists($profiles,'profile_country')){
				$data ['profile'] ['country']= $user[$profiles->profile_country];
			}
			
	     	if(property_exists($profiles,'profile_website')){
		     	$data['profile']['website']= $user[$profiles->profile_website];
	     	}
	     	
	     	if(property_exists($profiles,'profile_aboutme')){
		     	$data['profile']['aboutme']=$user[$profiles->profile_aboutme ];
	     	}
	     	
	     	if(property_exists($profiles,'profile_dob')){
		     	$data['profile']['dob']= $user[$profiles->profile_dob];
	     	}
		}
     	return $data;
	}

/*====================== End Facebook Social =============================*/
	
/*====================== Google Connecting ===============================*/
	
	/**
	 * 
	 * get access token code form google
	 * @param String $code
	 * @param String $client_id
	 * @param String $clien_secret
	 * @param String $redirect_uri
	 * @param String $grant_type
	 */
	public  static function getTokenGG($code, $client_id, $client_secret, $redirect_uri, $grant_type){
		 	$url = 'https://accounts.google.com/o/oauth2/token';
			$fields = array(
			        'code' => $code,
			        'client_id' => $client_id,
			    	'client_secret' =>$client_secret,
			    	'redirect_uri' => $redirect_uri,
			    	'grant_type' => $grant_type
    				);
    				
    		$fields_string = '';		
    		foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
			$fields_string = rtrim($fields_string, '&');
			$response = self::curlResponse($url,$fields_string) ;
			return json_decode($response);
			
	}
	
	/**
	 * 
	 * Get information user google
	 * @param String $access_token
	 */
	public static function getUserGG($access_token)
	{
		$url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='.$access_token;
		$user = self::curlResponse($url);
		$user= json_decode($user);
		return $user;
	}
	
	/* ===================== End Google Connecting ======================= */

	/**
	 * check email has register or not
	 * @param string $email
	 */ 
	public static function checkUser($user){
		if($user['socialId']==''){
			scloginHelper::response('Could not get user data. Please try again later.');
		}
		
		$db		= JFactory::getDbo();
		$query	= $db->getQuery(true);
		$query->select("a.user_id");
		$query->from("#__bt_sociallogin as a");
		$query->join('INNER', '#__users AS u on u.id = a.user_id');
		$query->where ( 'a.social_id=' . $db->quote ( $user['socialId'] ) );
		$query->where ( 'a.social_type=' . $db->quote ( $user['loginType'] ) );
		$db->setQuery ($query);
		$userid = $db->loadResult();
		
		if(!$userid){
			if (JComponentHelper::isEnabled( 'com_community', true) ) {
				$query	= $db->getQuery(true);
				$query->select("a.userid");
				$query->from("#__community_connect_users as a");
				$query->join('INNER', '#__users AS u on u.id = a.userid');
				$query->where ( 'a.connectid=' . $db->quote ( $user['socialId'] ) );
				$query->where ( 'a.type=' . $db->quote ( $user['loginType'] ) );
				$db->setQuery ($query);
				$userid = $db->loadResult();	
			}
		}
		$query	= $db->getQuery(true);
		$query->select("email,block,activation");
		$query->from("#__users");
		if($userid){
			$query->where ( 'id=' . $db->quote ( $userid ) );
		}else{
			$query->where ( 'email=' . $db->quote ( $user['email1'] ) );
		}
		$db->setQuery ($query);
		
		$user = $db->loadObject();
		if($user){
			if($user->block==1){
				if($user->activation){
					self::unblockUser($user->email);
					self::loginSocial($user->email);
					self::reloadParent();
				}else{
					self::response('MOD_BT_LOGIN_USERBLOCK');
				}
			}else{
				self::loginSocial($user->email);
				self::reloadParent();
			}
		}
	}
	/**
	 * 
	 * unblock user after register
	 * @param string $email
	 */
	public static function unblockUser($email) {
		$db = JFactory::getDbo ();
		$query = 'UPDATE `#__users` SET `block` ="0" , `activation` = "" WHERE `email`="' . $email . '"';
		$db->setQuery ( $query );
		$db->query ();
	}
	/**
	 * 
	 * login user when fbuser has email in jsystem
	 * @param String $email
	 */
	public static function loginSocial($email) {
		$db = JFactory::getDbo ();
		$app = JFactory::getApplication ();
		
		$sql = "SELECT * FROM #__users WHERE email = " . $db->quote ( $email );
		$db->setQuery ( $sql );
		$result = $db->loadObject ();
		
		$jUser = JFactory::getUser ( $result->id );
		$instance = $jUser;
		$instance->set ( 'guest', 0 );
		// Register the needed session variables
		$session = JFactory::getSession();
		$session->set ( 'user', $jUser );
		// Check to see the the session already exists.                        
		$app->checkSession ();
		
		$db->setQuery ( 'UPDATE ' 
			. $db->quoteName ( '#__session' ) 
			. ' SET ' . $db->quoteName ( 'guest' ) 
			. ' = ' 
			. $db->quote ( $instance->get ( 'guest' ) ) 
			. ',' . '   ' 
			. $db->quoteName ( 'username' ) 
			. ' = ' . $db->quote ( $instance->get ( 'username' ) ) 
			. ',' . '   ' 
			. $db->quoteName ( 'userid' ) 
			. ' = ' 
			. ( int ) $instance->get ( 'id' ) 
			. ' WHERE ' . $db->quoteName ( 'session_id' ) . ' = ' . $db->quote ( $session->getId () ) );
		$db->query (); 
		
		// Hit the user last visit field
		$instance->setLastVisit ();
	}
	
	
	/**
	 * 
	 * Resgistration (if not) and login in joomla
	 * @param Object $params : params of module
	 * @param Object $userSocial : information of user in social 
	 * @param String $social
	 */
	public static function authenticationSocial($params,$userSocial){
	
		self::registerSocial($userSocial);
		#login with new user
		$mainframe = JFactory::getApplication('site');
		$options = array();
		$credentials['username'] = $userSocial['username'];
		$credentials['password'] = $userSocial['password1'];
		$mainframe->login($credentials,$options);
		self::reloadParent();
	}
	
	public static function registerSocial($userSocial){
		$config = JFactory::getConfig();
		$db		= JFactory::getDbo();
		$params = JComponentHelper::getParams('com_users');
		
		// If registration is disabled - Redirect to login page.
		// if($params->get('allowUserRegistration') == 0){
			// self::ajaxResponse("Registration is not allow!");
		// }
		//load language file
		$language = JFactory::getLanguage();
		$language_tag = $language->getTag(); // loads the current language-tag

		JFactory::getLanguage()->load('plg_captcha_recaptcha',JPATH_ADMINISTRATOR,$language_tag,true);
		JFactory::getLanguage()->load('mod_bt_sociallogin',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('lib_joomla',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('com_users',JPATH_SITE,$language_tag,true);
		
		// Initialise the table with JUser.
		$user = new JUser;
		// Merge in the registration data.
		foreach ($userSocial as $k => $v) {
			$data[$k] = $v;
		}
		// Prepare the data for the user object.
		
		
		$data ['email'] = $data['email1'];
		$data ['password'] = $data['password1'];
		$data ['activation'] = '';
		$data ['block'] = 0;
		$system	= $params->get('new_usertype', 2);
		$data['groups'] = array($system);
		// Bind the data.
		if (! $user->bind ( $data )) {
			self::ajaxResponse(JText::sprintf ( 'COM_USERS_REGISTRATION_BIND_FAILED', $user->getError () ));
		}
		
		// Load the users plugin group.
		JPluginHelper::importPlugin('user');

		// Store the data.
		if (!$user->save()) {
			self::ajaxResponse(JText::sprintf('COM_USERS_REGISTRATION_SAVE_FAILED', $user->getError()));
		}

		// Compile the notification mail values.
		$data = $user->getProperties();
		$data['fromname']	= $config->get('fromname');
		$data['mailfrom']	= $config->get('mailfrom');
		$data['sitename']	= $config->get('sitename');
		$data['siteurl']	= str_replace('modules/mod_bt_sociallogin/','',JURI::root());
		
		$emailSubject	= JText::sprintf(
			'COM_USERS_EMAIL_ACCOUNT_DETAILS',
			$data['name'],
			$data['sitename']
		);

		$emailBody = JText::sprintf(
			'MOD_BT_LOGIN_EMAIL_REGISTERED_SOCIAL',
			$data['name'],
			$data['sitename'],
			$data['siteurl'],
			$data['username'],
			$data['password_clear']
		);
		// Send the email notification to user.
		$return = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], $data['email'], $emailSubject, $emailBody);
		
		//Send Notification mail to administrators
		if ($params->get('mail_to_admin') == 1) {
			$emailSubject = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_BODY',
				$data['name'],
				$data['sitename']
			);

			$emailBodyAdmin = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_NOTIFICATION_TO_ADMIN_BODY',
				$data['name'],
				$data['username'],
				$data['siteurl']
			);

			// get all admin users
			$query = 'SELECT name, email, sendEmail' .
					' FROM #__users' .
					' WHERE sendEmail=1';

			$db->setQuery( $query );
			$rows = $db->loadObjectList();

			// Send mail to all superadministrators id
			foreach( $rows as $row )
			{
				$return = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], $row->email, $emailSubject, $emailBodyAdmin);

				// Check for an error.
				if ($return !== true) {
					self::enqueueMessage(JText::_('COM_USERS_REGISTRATION_ACTIVATION_NOTIFY_SEND_MAIL_FAILED'));
				}
			}
		}
		// Check for an error.
		if ($return !== true) {
			// Send a system message to administrators receiving system mails
			$db = JFactory::getDBO();
			$q = "SELECT id
				FROM #__users
				WHERE block = 0
				AND sendEmail = 1";
			$db->setQuery($q);
			$sendEmail = $db->loadColumn();
			if (count($sendEmail) > 0) {
				$jdate = new JDate();
				// Build the query to add the messages
				$q = "INSERT INTO ".$db->quoteName('#__messages')." (".$db->quoteName('user_id_from').
				", ".$db->quoteName('user_id_to').", ".$db->quoteName('date_time').
				", ".$db->quoteName('subject').", ".$db->quoteName('message').") VALUES ";
				$messages = array();

				foreach ($sendEmail as $userid) {
					$messages[] = "(".$userid.", ".$userid.", '".$jdate->toSql()."', '".JText::_('COM_USERS_MAIL_SEND_FAILURE_SUBJECT')."', '".JText::sprintf('COM_USERS_MAIL_SEND_FAILURE_BODY', $return, $data['username'])."')";
				}
				$q .= implode(',', $messages);
				$db->setQuery($q);
				$db->query();
			}
			self::enqueueMessage(JText::_('COM_USERS_REGISTRATION_SEND_MAIL_FAILED'));
		}
		$session = JFactory::getSession();
		$userSocial = $session->get('btl-u',$userSocial);
		
		// store social user info
		if($user->id){
			$sql = "INSERT INTO #__bt_sociallogin(user_id,social_id,social_type,access_token,`data`) values("
					. $user->id . ","
					. "'".$userSocial['socialId']."',"
					. "'".$userSocial['loginType']."',"
					. "'".$db->escape($userSocial['access_token'])."',"
					. "'".$db->escape($userSocial['rawData'])."')";
			$db->setQuery($sql);
			$db->query();
			if (JComponentHelper::isEnabled( 'com_community', true) ) {
				$sql = "INSERT INTO #__community_connect_users(userid,connectid,type) values("
					. $user->id . ","
					. "'".$userSocial['socialId']."',"
					. "'".$userSocial['loginType']."')";
				$db->setQuery($sql);
				$db->query();
			}
			return true;
		}else{
			return false;
		}
		
	}
	
/****************************END SETTING FOR SOCIAL CONNECT**********************************************/

    /**
     * 
     * Load module by name and title of module
     * @param String $name
     * @param String $title
     */
    public static function loadModule($name,$title){
		$module=JModuleHelper::getModule($name,$title);
		return JModuleHelper::renderModule($module);
	}
	
	/**
	 * 
	 * Load module by ID module
	 * @param Number $id
	 */
	public static function loadModuleById($id){
		$db		= JFactory::getDbo();
		$query	= $db->getQuery(true);
			$query->select('module,title' );
			$query->from('#__modules');
			$query->where('#__modules.id='.$id);
			$db->setQuery((string)$query);
			$module = $db->loadObject();
			
			$module = JModuleHelper::getModule( $module->module,$module->title );
			
			
			$contents = JModuleHelper::renderModule ( $module);
			return $contents;
	}
	
	/**
	 * 
	 * Get url to redirect after log-in or sign-out
	 * @param Object $params
	 * @param String $type
	 */
	static function getReturnURL($params, $type)
	{
		$app	= JFactory::getApplication();
		$router = $app->getRouter();
		$url = null;
		if ($itemid =  $params->get($type))
		{
			$db		= JFactory::getDbo();
			$query	= $db->getQuery(true);

			$query->select($db->quoteName('link'));
			$query->from($db->quoteName('#__menu'));
			$query->where($db->quoteName('published') . '=1');
			$query->where($db->quoteName('id') . '=' . $db->quote($itemid));

			$db->setQuery($query);
			if ($link = $db->loadResult()) {
				if ($router->getMode() == JROUTER_MODE_SEF) {
					$url = 'index.php?Itemid='.$itemid;
				}
				else {
					$url = $link.'&Itemid='.$itemid;
				}
			}
		}
		if (!$url)
		{
			// stay on the same page
			$uri = clone JFactory::getURI();
			$vars = $router->parse($uri);
			unset($vars['lang']);
			if ($router->getMode() == JROUTER_MODE_SEF)
			{
				if (isset($vars['Itemid']))
				{
					$itemid = $vars['Itemid'];
					$menu = $app->getMenu();
					$item = $menu->getItem($itemid);
					unset($vars['Itemid']);
					if (isset($item) && $vars == $item->query) {
						$url = 'index.php?Itemid='.$itemid;
					}
					else {
						$url = 'index.php?'.JURI::buildQuery($vars).'&Itemid='.$itemid;
					}
				}
				else
				{
					$url = 'index.php?'.JURI::buildQuery($vars);
				}
			}
			else
			{
				$url = 'index.php?'.JURI::buildQuery($vars);
			}
		}

		return base64_encode($url);
	}

	/**
	 * 
	 *  Check status login user
	 */
	public  static function getType()
	{
		$user =  JFactory::getUser();
		return (!$user->get('guest')) ? 'logout' : 'login';
	}
	
	public static function getModules($params) {
		$user =  JFactory::getUser();
		if ($user->get('guest')) return '';
		
		$document = JFactory::getDocument();
		$moduleRender = $document->loadRenderer('module');
		$positionRender = $document->loadRenderer('modules');
		
		$html = '';
		
		$db = JFactory::getDbo();
		$i=0;
		$module_id = $params->get('module_id', array());
		if (count($module_id) > 0) {
			$sql = "SELECT * FROM #__modules WHERE id IN (".implode(',', $module_id).") ORDER BY ordering";
			$db->setQuery($sql);
			$modules = $db->loadObjectList();
			foreach ($modules as $module) {
				
				if ($module->module != 'mod_bt_sociallogin') {
					$i++;
					$html = $html . $moduleRender->render($module->module, array('title' => $module->title, 'style' => 'rounded'));
					//$html = $html .$moduleRender->render($module->module, array('title' => $module->title, 'style' => 'rounded'));
					//if($i%2==0) $html.="<br clear='both'>";
				}
			}
		}	
		$module_position = $params->get('module_position', array());
		if (count($module_position) > 0) {
			foreach ($module_position as $position) {
				$modules = JModuleHelper::getModules($position);
				foreach ($modules as $module) {
					if ($module->module != 'mod_bt_sociallogin') {
						$i++;
						$html = $html . $moduleRender->render($module, array('style' => 'rounded'));
						//if($i%2==0) $html.="<br clear='both'>";
					}
				}
			}
		}
		if ($html==''){
			$html= $moduleRender->render('mod_menu',array('title'=>'User Menu','style'=>'rounded'));
		}
		return $html;
	}

	/**
	 * Include resource for module
	 * @param Object $params
	 */
	public static function  fetchHead($params){
		$document	= JFactory::getDocument();
		$header = $document->getHeadData();
		$mainframe = JFactory::getApplication();
		$template = $mainframe->getTemplate();

		$loadJquery = true;
		switch($params->get('loadJquery',"auto")){
			case "0":
				$loadJquery = false;
				break;
			case "1":
				$loadJquery = true;
				break;
			case "auto":
				
				foreach($header['scripts'] as $scriptName => $scriptData)
				{
					if(substr_count($scriptName,'/jquery'))
					{
						$loadJquery = false;
						break;
					}
				}
			break;		
		}
		if($loadJquery)
		{ 
			$document->addScript(JURI::root().'modules/mod_bt_sociallogin/tmpl/js/jquery.min.js');
		}
		$document->addScript(JURI::root().'modules/mod_bt_sociallogin/tmpl/js/jquery.jscrollpane.min.js');	
		$document->addScript(JURI::root().'modules/mod_bt_sociallogin/tmpl/js/jquery.simplemodal.js');
		
		// load js
		if(file_exists(JPATH_BASE.'/templates/'.$template.'/html/mod_bt_sociallogin/js/default.js'))
		{	
			$document->addScript(JURI::root().'templates/'.$template.'/html/mod_bt_sociallogin/js/default.js');	
		}
		else{
			$document->addScript(JURI::root().'modules/mod_bt_sociallogin/tmpl/js/default.js');	
		}
		
		
		
		// load css
		if(file_exists(JPATH_BASE.'/templates/'.$template.'/html/mod_bt_sociallogin/css/style2.0.css'))
		{
			$document->addStyleSheet(  JURI::root().'templates/'.$template.'/html/mod_bt_sociallogin/css/style2.0.css');
		}
		else{
			$document->addStyleSheet(JURI::root().'modules/mod_bt_sociallogin/tmpl/css/style2.0.css');
		}

	}
	
	/**
	 * Executed registration
	 * function register()
	 * @param array() $temp
	 */	
	public static function register($temp)
	{  
		$config = JFactory::getConfig();
		$db		= JFactory::getDbo();
		$params = JComponentHelper::getParams('com_users');
		//load language file
		$language = JFactory::getLanguage();
		$language_tag = $language->getTag(); // loads the current language-tag

		JFactory::getLanguage()->load('plg_captcha_recaptcha',JPATH_ADMINISTRATOR,$language_tag,true);
		JFactory::getLanguage()->load('mod_bt_sociallogin',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('lib_joomla',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('com_users',JPATH_SITE,$language_tag,true);
		
		// Initialise the table with JUser.
		$user = new JUser;
		
		// Merge in the registration data.
		foreach ($temp as $k => $v) {
			$data[$k] = $v;
		}

		// Prepare the data for the user object.
		$data['email']		= $data['email1'];
		$data['password']	= $data['password1'];
		$useractivation = $params->get ( 'useractivation' );
		
		// Check if the user needs to activate their account.
		if (($useractivation == 1) || ($useractivation == 2)) {
			$data ['activation'] = JApplication::getHash ( JUserHelper::genRandomPassword () );
			$data ['block'] = 1;
		}
		$system	= $params->get('new_usertype', 2);
		$data['groups'] = array($system);
		
		// Bind the data.
		if (! $user->bind ( $data )) {
			self::ajaxResponse('$error$'.JText::sprintf ( 'COM_USERS_REGISTRATION_BIND_FAILED', $user->getError () ));
		}
		
		// Load the users plugin group.
		JPluginHelper::importPlugin('user');

		// Store the data.
		if (!$user->save()) {
			self::ajaxResponse('$error$'.JText::sprintf('COM_USERS_REGISTRATION_SAVE_FAILED', $user->getError()));
		}

		// Compile the notification mail values.
		$data = $user->getProperties();
		$data['fromname']	= $config->get('fromname');
		$data['mailfrom']	= $config->get('mailfrom');
		$data['sitename']	= $config->get('sitename');
		$data['siteurl']	= str_replace('modules/mod_bt_sociallogin/','',JURI::root());
		
		// Handle account activation/confirmation emails.
		if ($useractivation == 2)
		{
			// Set the link to confirm the user email.					
			$data['activate'] = $data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'];
			
			$emailSubject	= JText::sprintf(
				'COM_USERS_EMAIL_ACCOUNT_DETAILS',
				$data['name'],
				$data['sitename']
			);

			$emailBody = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_WITH_ACTIVATION_BODY',
				$data['name'],
				$data['sitename'],
				$data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'],
				$data['siteurl'],
				$data['username'],
				$data['password_clear']
			);
			
		}
		elseif ($useractivation == 1)
		{
			// Set the link to activate the user account.						
			$data['activate'] = $data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'];
		
			$emailSubject	= JText::sprintf(
				'COM_USERS_EMAIL_ACCOUNT_DETAILS',
				$data['name'],
				$data['sitename']
			);
			

			$emailBody = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_WITH_ACTIVATION_BODY',
				$data['name'],
				$data['sitename'],
				$data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'],
				$data['siteurl'],
				$data['username'],
				$data['password_clear']
			);

		} else {

			$emailSubject	= JText::sprintf(
				'COM_USERS_EMAIL_ACCOUNT_DETAILS',
				$data['name'],
				$data['sitename']
			);

			$emailBody = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_BODY',
				$data['name'],
				$data['sitename'],
				$data['siteurl']
			);
		}

		// Send the registration email.
		$return = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], $data['email'], $emailSubject, $emailBody);
		
		//Send Notification mail to administrators
		if (($params->get('useractivation') < 2) && ($params->get('mail_to_admin') == 1)) {
			$emailSubject = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_BODY',
				$data['name'],
				$data['sitename']
			);

			$emailBodyAdmin = JText::sprintf(
				'COM_USERS_EMAIL_REGISTERED_NOTIFICATION_TO_ADMIN_BODY',
				$data['name'],
				$data['username'],
				$data['siteurl']
			);

			// get all admin users
			$query = 'SELECT name, email, sendEmail' .
					' FROM #__users' .
					' WHERE sendEmail=1';

			$db->setQuery( $query );
			$rows = $db->loadObjectList();

			// Send mail to all superadministrators id
			foreach( $rows as $row )
			{
				$return = JFactory::getMailer()->sendMail($data['mailfrom'], $data['fromname'], $row->email, $emailSubject, $emailBodyAdmin);

				// Check for an error.
				if ($return !== true) {
					self::enqueueMessage(JText::_('COM_USERS_REGISTRATION_ACTIVATION_NOTIFY_SEND_MAIL_FAILED'));
				}
			}
		}
		// Check for an error.
		if ($return !== true) {
			// Send a system message to administrators receiving system mails
			$db = JFactory::getDBO();
			$q = "SELECT id
				FROM #__users
				WHERE block = 0
				AND sendEmail = 1";
			$db->setQuery($q);
			$sendEmail = $db->loadColumn();
			if (count($sendEmail) > 0) {
				$jdate = new JDate();
				// Build the query to add the messages
				$q = "INSERT INTO ".$db->quoteName('#__messages')." (".$db->quoteName('user_id_from').
				", ".$db->quoteName('user_id_to').", ".$db->quoteName('date_time').
				", ".$db->quoteName('subject').", ".$db->quoteName('message').") VALUES ";
				$messages = array();

				foreach ($sendEmail as $userid) {
					$messages[] = "(".$userid.", ".$userid.", '".$jdate->toSql()."', '".JText::_('COM_USERS_MAIL_SEND_FAILURE_SUBJECT')."', '".JText::sprintf('COM_USERS_MAIL_SEND_FAILURE_BODY', $return, $data['username'])."')";
				}
				$q .= implode(',', $messages);
				$db->setQuery($q);
				$db->query();
			}
			self::enqueueMessage(JText::_('COM_USERS_REGISTRATION_SEND_MAIL_FAILED'));
		}
	
		
		if ($useractivation == 1)
			return "useractivate";
		elseif ($useractivation == 2)
			return "adminactivate";
		else
			return $user->id;
	}		
	
	
	/**
	 * function ajax(), executed ajax request
	 * @param JRequest
	 */
	public static function ajax($params){
		
		$mainframe = JFactory::getApplication('site');
		$session = JFactory::getSession();
		$db =  JFactory::getDBO();
		
		jimport ('joomla.plugin.helper');
		jimport('cms.captcha.captcha');
		
		// Initialise variables.
		$app	= JFactory::getApplication();
		//load language file
		$language = JFactory::getLanguage();
		$language_tag = $language->getTag(); // loads the current language-tag

		JFactory::getLanguage()->load('plg_captcha_recaptcha',JPATH_ADMINISTRATOR,$language_tag,true);
		JFactory::getLanguage()->load('mod_bt_sociallogin',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('lib_joomla',JPATH_SITE,$language_tag,true);
		JFactory::getLanguage()->load('com_users',JPATH_SITE,$language_tag,true);
		//JRequest::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
		$bttask = JRequest::getVar('bttask');
		/**
		 * check task is login to do
		 */
		if($bttask=='login'){
			if ($return = JRequest::getVar('return', '', 'method', 'base64')) {
				$return = base64_decode($return);
				if (!JURI::isInternal($return)) {
					$return = '';
				}
			}		
			$options = array();
			
			$options['remember'] = JRequest::getBool('remember', false);
			
			$options['return'] = $return;
	
			$credentials = array();
			
			$credentials['username'] = JRequest::getVar('username', '', 'method', 'username');
			
			$credentials['password'] = JRequest::getString('passwd', '', 'post', JREQUEST_ALLOWRAW);
			
			
			//preform the login action
			$error = $mainframe->login($credentials, $options);
			self::ajaxResponse($error);
		}elseif($bttask == 'register') {
			
			/**
			 * check task is registration to do
			 */
			// If registration is disabled - Redirect to login page.
			if(JComponentHelper::getParams('com_users')->get('allowUserRegistration') == 0){
				self::ajaxResponse("Registration is not allow!");
			}
		
			//check captcha 
			
		 		

			//check captcha 
			if($params->get('use_captcha', 1)){
				if($params->get('use_captcha', 1) != 2){
					$captcha = JFactory::getConfig ()->get ( 'captcha' );
					if($captcha){
						$reCaptcha = JCaptcha::getInstance ($captcha);
						$checkCaptcha = $reCaptcha->checkAnswer('');
						if($checkCaptcha==false){
							self::ajaxResponse('$error$'.JText::_('ERROR_CAPTCHA'));
						}
					}					
				}else{
					$session = JFactory::getSession();
					if(JRequest::getString('btl_captcha') != $session->get('btl_captcha')){
						self::ajaxResponse('$error$'.JText::_('INCORRECT_CAPTCHA'));
					}
				}			
			}
			// Get the user data.
			$postData = JRequest::getVar('jform');
			
			$requestData = $postData;
			if(isset($requestData['profile']['dob'])){
				$requestData['profile']['dob'] = date('m/d/Y h:i:s', strtotime($requestData['profile']['dob']));
			}
			//check type registration
			$userInfo = $session->get('btl-u');
			$regtype = isset($userInfo['loginType'])? $userInfo['loginType']: '' ;
			
			//preview data form social			
			if($regtype){
				if(!$params->get('edit_email_'. $regtype)){
					// don't alow changing user email
					$requestData['email1'] = $userInfo['email1'];
					$requestData['email2'] = $userInfo['email1'];
				}
				$return = self::registerSocial($requestData);
			
				if($return==false){
					self::ajaxResponse('$error$'.JText::_('REGISTRATION_FALSE'));
				}else{
					self::unblockUser($requestData['email1']);
					self::loginSocial($requestData['email1']);
					self::ajaxResponse(JText::_('REGISTRATION_AND_AUTOLOGIN'));
					$session->clear('btl-u');
				}
			}else {
				$return	= self::register($requestData);	
				if ($return === 'adminactivate'){
					self::ajaxResponse(JText::_('COM_USERS_REGISTRATION_COMPLETE_VERIFY'));
				} elseif ($return === 'useractivate') {
					self::ajaxResponse(JText::_('COM_USERS_REGISTRATION_COMPLETE_ACTIVATE'));		
				} elseif($return== false){
					self::ajaxResponse('Cannot Registration!');
				}
				 else{
					self::ajaxResponse(JText::_('COM_USERS_REGISTRATION_SAVE_SUCCESS'));
				}
			}
		}else{
			self::ajaxResponse(self::createCaptcha());
		}
	}
	// process denied request from social
	public static function deniedRequest(){
		if(isset($_REQUEST['state']) && (isset($_REQUEST['denied']) || isset($_REQUEST['error']))){
			echo '<script type="text/javascript"> window.close();</script>';
			exit;
		}
	}
	function enqueueMessage($text){
		self::$messages[] = $text;
	}
	public static  function response($message){
		echo $message;
		exit;
	}	
	public static function ajaxResponse($message){
		$obLevel = ob_get_level();
		if($obLevel){
			while ($obLevel > 0 ) {
				ob_end_clean();
				$obLevel --;
			}
		}else{
			ob_clean();
		}
		echo $message;
		if(count(self::$messages)) echo '<br />'.implode('<br />',self::$messages);
		exit;
	}
	public static function reloadParent(){
		$alert = '';
		if(count(self::$messages)) $alert = "alert('".addslashes(implode("\n",self::$messages))."');";
		echo '<script type="text/javascript">'.$alert.'window.opener.location.href=window.opener.btlOpt.BT_RETURN; window.close();</script>';
		exit;
	}
	public static function reloadWidthData($user,$editEmail){
		unset($user['access_token']);
		unset($user['socialId']);
		unset($user['rawData']);
		echo '<script type="text/javascript">'
			//.'window.onunload = function (e) {'
			.	'opener.populateFormRegister('. json_encode($user) .','.($editEmail?'true':'false').');'
			//.'};'
			.'window.close();'
			.'</script>';
		exit;
	}
	public static function curlResponse($url,$data = null){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_REFERER, $_SERVER['REQUEST_URI']);
		if($data){
			curl_setopt($ch,CURLOPT_POST, true);
			curl_setopt($ch,CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/x-www-form-urlencoded'));
		}
		$response = curl_exec($ch);
		if (curl_errno($ch) == 60 && substr_count($url,'facebook')>0) { 
			// CURLE_SSL_CACERT
			curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__).'/facebook/fb_ca_chain_bundle.crt');
			$response = curl_exec($ch);
		}
		if(curl_errno($ch))
		{
			curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
			$response = curl_exec($ch);
		}
		curl_close($ch);
		return $response;
	}
	
	public static function createCaptcha(){
		$session = JFactory::getSession();
		$oldImages = glob(JPATH_ROOT . '/modules/mod_bt_sociallogin/captcha_images/*.png');
		if($oldImages){
			foreach($oldImages as $oldImage){
				if(file_exists($oldImage)){
					unlink($oldImage);
				}
			}
		}	
		
		
		
		$imagePath = base64_encode($session->getId() . time()). '.png';
		$session->set('btl_captcha_image_path', $imagePath);
		
		$image = imagecreatetruecolor(200, 50) or die("Cannot Initialize new GD image stream");
		$background_color = imagecolorallocate($image, 255, 255, 255);
		$text_color = imagecolorallocate($image, 0, 255, 255);
		$line_color = imagecolorallocate($image, 64, 64, 64);
		$pixel_color = imagecolorallocate($image, 0, 0, 255);
		imagefilledrectangle($image, 0, 0, 200, 50, $background_color);
		
		
		//random dots
		for ($i = 0; $i < 500; $i++) {
			imagesetpixel($image, rand() % 200, rand() % 50, $pixel_color);
		}
 
		$letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		$len = strlen($letters);
		
 
		$text_color = imagecolorallocate($image, 0, 0, 0);
		$word = "";
		for ($i = 0; $i < 6; $i++) {
			$letter = $letters[rand(0, $len - 1)];
			imagestring($image, 7, 5 + ($i * 30), 20, $letter, $text_color);
			$word .= $letter;
		}
		$session->set('btl_captcha', $word);
 
		
		
		if(!file_exists(JPATH_ROOT . "/modules/mod_bt_sociallogin/captcha_images")){
			mkdir(JPATH_ROOT . "/modules/mod_bt_sociallogin/captcha_images");
		}
		
		imagepng($image, JPATH_ROOT . '/modules/mod_bt_sociallogin/captcha_images/' . $imagePath);
		return JURI::root(). 'modules/mod_bt_sociallogin/captcha_images/' . $imagePath;
	}
	/**
	 * Return builtin captcha html
	 * @since 2.6.0
	 */
	public static function getBuiltinCaptcha(){
		$html = '<img src="' . self::createCaptcha() .'" alt=""/>
				<div style="clear:both"></div>
				<input type="text" name="btl_captcha" id="btl-captcha" size="10"/>
				<span id="btl-captcha-reload" title="' . JText::_('RELOAD_CAPTCHA') . '">' . JText::_('RELOAD_CAPTCHA') . '</span>
				';
		return $html;
	}
}
