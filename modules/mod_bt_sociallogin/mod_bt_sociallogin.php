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
defined ( '_JEXEC' ) or die ( 'Restricted access' );
jimport ( 'cms.captcha.captcha' );
jimport ( 'joomla.application.component.view' );
jimport ( 'joomla.application.component.helper' );
jimport ( 'joomla.plugin.plugin' );

$mainframe = JFactory::getApplication ();




$session = JFactory::getSession();
require_once (dirname ( __FILE__ ) . '/helpers/helper.php');

if(JRequest::getVar("bttask")){
	scloginHelper::ajax($params);
}
/**
 * Get all params
 */
$enable_fb = $params->get('enable_fb',0);
$enable_gg = $params->get('enable_gg',0);
$enable_twitter = $params->get('enable_twitter',0);

//get position display
$align = $params->get ( 'align_option' );

//get color setting
$bgColor=$params->get('bg_button_color','#6d850a');
$textColor=$params->get('text_button_color','#fff');

$showLogout= $params->get('logout_button',1);
//setting component to integrated
$integrated_com = $params->get ( 'integrated_component' );

//get option tag active modal
$loginTag = $params->get ( 'tag_login_modal' );
if($params->get('enabled_registration')){
	$registerTag = $params->get ( 'tag_register_modal' );
}else{
	$registerTag='';
}


$type = scloginHelper::getType ();

$return = scloginHelper::getReturnURL ( $params, $type );

$return_decode = base64_decode($return);

$return_decode = str_replace('&amp;','&',JRoute::_($return_decode));

$loggedInHtml = scloginHelper::getModules ( $params );

/**
 *  Login Social
 *  @method Facebook connect
 *  @method Google connect
 *  @method Twitter connect
 */
#set state SESSION
 scloginHelper::setStateSession($session);

#get app facebook information 
$appfb_id = $params->get("appfb_id");
$appfb_secret = $params->get("appfb_secret");

#get app google information
$appgg_id = $params->get('appgg_id');//'16256831334.apps.googleusercontent.com';
$appgg_secret = $params->get('appgg_secret');//'XRT6LCN6bptGb8OhNVlqxekC'; 

#get app twitter information
$oauth_consumer_key = $params->get('apptwitter_id');//'5ScMvc5VxKEA0kSCRVAeaQ';
$oauth_consumer_secret = $params->get('apptwitter_secret');//'8Iv1vIdslBa7Acv7FNdvYYl2zbBaJTlzu0kx7Ox6Y';

$ajaxLink = JURI::getInstance()->toString();

#callback url 
$callback_url = JURI::getInstance()->toString();
#link send request to fb
$dialog_urlFB = scloginHelper::getDialogUrl($appfb_id, urlencode($callback_url), $session->get('btl-s')->facebook,'facebook');

#link send request to google
$dialog_urlGG = scloginHelper::getDialogUrl($appgg_id, urlencode(JURI::base()), $session->get('btl-s')->google, 'google');

#link send request to twitter
$uri = JFactory::getURI ();
$uri->setVar ( 'code', 1);
$uri->setVar ( 'state', $session->get('btl-s')->twitter );
$dialog_urlTT =  $uri->toString ();

#check request from Social 
if(isset($_REQUEST["code"])){
   	$code = $_REQUEST["code"];
   	if($session->get('btl-s')){
   		# FACEBOOK CONNECT
	   	if( $_REQUEST['state'] === $session->get('btl-s')->facebook  && $enable_fb ) {
			#process deny request
			scloginHelper::deniedRequest();
	   		# cut current url in popup, return base url
	   		$callback_url =  scloginHelper::getOpenerUrl($callback_url);
	   		
		    #token url
		   	$token_url = scloginHelper::getTokenUrl($appfb_id, $callback_url, $appfb_secret, $code);
			
			$response = scLoginHelper::curlResponse($token_url);
	        
	        #get information of fb user
		    $paramsFB = null;
		    parse_str($response, $paramsFB);
		    $graph_url = "https://graph.facebook.com/me?access_token=".$paramsFB['access_token'];
		  
			$user = scLoginHelper::curlResponse($graph_url);
			
			$user = scloginHelper::prepareData(json_decode($user),'facebook');
			$user = scloginHelper::assignProfile($user,$params->get ( 'fb-profiles' ));
			
			$user['access_token'] = $paramsFB['access_token'];
			// check existing user 
			scloginHelper::checkUser($user);
			
		    if($params->get('edit_info_fb')== 0){
		    	# login joomla
		   		$authentication = scloginHelper::authenticationSocial($params,$user);
		   		#reload parent window and close current window(popup)
		     	scloginHelper::reloadParent($return_decode);
		    }else{
				//save user information
				$session->set('btl-u',$user);
		    	scloginHelper::reloadWidthData($user,$params->get('edit_email_facebook'));
		    }
	   }# GOOGLE CONNECT
	   elseif($_REQUEST['state'] === $session->get('btl-s')->google && $enable_gg ){
	   		#process deny request
			scloginHelper::deniedRequest();
			#get token {access_token}   	 
	   	  	$token = scloginHelper::getTokenGG($code, $appgg_id, $appgg_secret, JURI::base(), 'authorization_code');
	   	  	
	   	  	#get user google
	   	    $user = scloginHelper::getUserGG($token->access_token);
			//var_dump($user); die();	   	    
			$user = scloginHelper::prepareData($user,'google');
			$user = scloginHelper::assignProfile($user,$params->get ( 'gg-profiles' ));
			$user['access_token'] = $token->access_token;
		    // check existing user 
			scloginHelper::checkUser($user);
			
	   	    if($params->get('edit_info_gg')== 0){
		   		#Login Joomla
		   		scloginHelper::authenticationSocial($params,$user);
		   		#reload parent window and close current window(popup)
		     	scloginHelper::reloadParent($return_decode);
	   	    }else{				
				//save user information
				$session->set('btl-u',$user);	
	   	    	scloginHelper::reloadWidthData($user,$params->get('edit_email_google'));
	   	    }
	   	
	   }# TWITTER CONNECT
	   elseif ($_REQUEST['state'] === $session->get('btl-s')->twitter && $enable_twitter ){
			#process deny request
			scloginHelper::deniedRequest();
			if(!class_exists('TwitterOAuth')){
				require_once (dirname ( __FILE__ ) . '/helpers/twitter/twitteroauth.php');
			}
			#get token {access_token}   	 
			/* Build TwitterOAuth object with client credentials. */
			if(!isset($_REQUEST['callback'])){
				$connection = new TwitterOAuth($oauth_consumer_key, $oauth_consumer_secret);
				 
				/* Get temporary credentials. */
				$uri->setVar ( 'callback', 1);
				$request_token = $connection->getRequestToken($uri->toString ());

				/* Save temporary credentials to session. */
				$session->set('oauth_token',$request_token['oauth_token']);
				$session->set('oauth_token_secret',$request_token['oauth_token_secret']);
				/* If last connection failed don't display authorization link. */
				switch ($connection->http_code) {
				  case 200:
					/* Build authorize URL and redirect user to Twitter. */
					$url = $connection->getAuthorizeURL($request_token['oauth_token']);
					$mainframe->redirect($url);
					break;
				  default:
					/* Show notification if something went wrong. */
					scloginHelper::response('Could not connect to Twitter. Refresh the page or try again later.');
				}
			}else{
				/* If the oauth_token is old redirect to the connect page. */
				if(isset($_REQUEST['oauth_token']) && $session->get('oauth_token') !== $_REQUEST['oauth_token']) {
					$session->clear('oauth_token');
					$session->clear('oauth_token_secret');
					$mainframe->redirect($dialog_urlTT);
				}else{
					/* Create TwitteroAuth object with app key/secret and token key/secret from default phase */
					$connection = new TwitterOAuth($oauth_consumer_key, $oauth_consumer_secret, $session->get('oauth_token'), $session->get('oauth_token_secret'));
					/* Request access tokens from twitter */
					$access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);
					/* Save the access tokens. Normally these would be saved in a database for future use. */
					//$session->set('oauth_token') = $access_token;
					/* Remove no longer needed request tokens */
					/* If HTTP response is 200 continue otherwise send to connect page to retry */
					if (200 == $connection->http_code) {
						$user =  $connection->get('account/verify_credentials');
						$user = scloginHelper::prepareData($user,'twitter');
						$user = scloginHelper::assignProfile($user,$params->get ( 'tt-profiles' ));
						$user['access_token'] = serialize($access_token);
						 // check existing user 
						scloginHelper::checkUser($user);
						
						if($params->get('edit_info_twitter')== 0){
							#Login Joomla
							scloginHelper::authenticationSocial($params,$user);
							#reload parent window and close current window(popup)
							scloginHelper::reloadParent($return_decode);
						}else{				
							//save user information
							$session->set('btl-u',$user);	
							scloginHelper::reloadWidthData($user,$params->get('edit_email_twitter'));
						}
					} else {
					  /* Save HTTP status for error dialog on connnect page.*/
						scloginHelper::response('Error:' . $connection->http_code);
					}
				}
			}

	   }# State not true, interupt access
	   else{
			scloginHelper::response('<h4 style="color:red">Invalid token! Please refresh again!</h4>');
	   }
   	}
}       

# Include the syndicate functions only once
scloginHelper::fetchHead ( $params );

# load language 
$language = JFactory::getLanguage();
$language_tag = $language->getTag(); // loads the current language-tag
JFactory::getLanguage()->load('plg_captcha_recaptcha',JPATH_ADMINISTRATOR,$language_tag,true);
JFactory::getLanguage()->load('mod_bt_sociallogin',JPATH_SITE,$language_tag,true);
JFactory::getLanguage()->load('lib_joomla',JPATH_SITE,$language_tag,true);
JFactory::getLanguage()->load('com_users',JPATH_SITE,$language_tag,true);



$moduleRender = '';
$linkOption = '';
if($integrated_com != ''){
	if ($integrated_com == 'k2') {
		$moduleRender = scloginHelper::loadModule ( 'mod_k2_login', 'K2 Login' );
		if (! JComponentHelper::isEnabled ( 'com_k2', true )) {
			$integrated_com = '';
		} else {
			$linkOption = 'index.php?option=com_users&view=registration';
		}
	} elseif ($integrated_com == 'jomsocial') {
		$moduleRender = scloginHelper::loadModule ( 'mod_sclogin', 'SCLogin' );
		if (! JComponentHelper::isEnabled ( 'com_community', true )) {
			$integrated_com = '';
		} else {
			$linkOption = 'index.php?option=com_community&view=register&task=register';
		}
	} elseif ($integrated_com == 'cb') {
		$moduleRender = scloginHelper::loadModule ( 'mod_cblogin', 'CB Login' );
		if (! JComponentHelper::isEnabled ( 'com_comprofiler', true )) {
			$integrated_com = '';
		} else {
			$linkOption = 'index.php?option=com_comprofiler&task=registers';
		}
	} elseif($integrated_com =='com_user') {
		$moduleRender = scloginHelper::loadModule ( 'mod_login', 'Login' );
		$linkOption = 'index.php?option=com_users&view=registration';
	}elseif ($integrated_com == 'option') {
		$moduleRender = scloginHelper::loadModuleById ( $params->get ( 'module_option' ) );
		$linkOption = $params->get ( 'link_option' );
	}
	$linkOption = JRoute::_($linkOption);
}

$user =  JFactory::getUser ();

$name= $params->get('name');
// LOAD MODEL FROM COM_USERS
$app	= JFactory::getApplication();
$params_user	= $app->getParams('com_users');
JLoader::import('joomla.application.component.model'); 
JLoader::import( 'registration', JPATH_SITE . '/components/com_users/models' );
JForm::addFormPath(JPATH_SITE . '/components/com_users/models/forms');
JForm::addFieldPath(JPATH_SITE . '/components/com_users/models/fields');
$userModel =  JModelForm::getInstance('Registration','UsersModel');

$form = $userModel->getForm();

//setting display type
if ($params->get ( "display_type" ) == 1) {
	$effect = 'btl-dropdown';
} else {
	$effect = 'btl-modal';
}

//setting for registration 
$usersConfig = JComponentHelper::getParams ( 'com_users' ); 
$enabledRegistration = false;
$viewName = JRequest::getVar ( 'view', 'registry' );

$enabledCaptcha = '';

if ($usersConfig->get ( 'allowUserRegistration' ) && $params->get ( "enabled_registration", 1 ) == 1 && ($viewName != "registration" || $integrated_com !='') ) {
	$enabledRegistration = true; 
	$enabledCaptcha = $params->get('use_captcha', 1);
	if($enabledCaptcha == 1){
		//create instance captcha, get recaptcha
		$captcha = JFactory::getConfig ()->get ( 'captcha' );
		if($captcha){
			$reCaptcha = JCaptcha::getInstance ($captcha);
			$reCaptcha = $reCaptcha->display ('bt_social_login_recaptcha', 'bt_social_login_recaptcha', 'bt_social_login_recaptcha' );
		}else{
			$reCaptcha = '';
			$enabledCaptcha = 0;
		}
	}else if($enabledCaptcha == 2){
		$reCaptcha = scloginHelper::getBuiltinCaptcha();	
	}
}
require (JModuleHelper::getLayoutPath ( 'mod_bt_sociallogin' ));