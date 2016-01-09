DROP TABLE IF EXISTS `#__bt_sociallogin`;
CREATE TABLE `#__bt_sociallogin` (
  `user_id` int(11) NOT NULL,
  `social_id` varchar(255) default NULL,
  `social_type` varchar(255) default NULL,
  `access_token` varchar(255) default NULL,
  `data` text default NULL,
  PRIMARY KEY  (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
