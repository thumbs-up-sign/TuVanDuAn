

/*===============================
http://www.tuvanduan.net.vn/modules/mod_bt_sociallogin/tmpl/js/jquery.simplemodal.js
================================================================================*/;
;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}
(function($){var d=[],doc=$(document),ua=navigator.userAgent.toLowerCase(),wndw=$(window),w=[];var browser={ieQuirks:null,msie:/msie/.test(ua)&&!/opera/.test(ua),opera:/opera/.test(ua)};browser.ie6=browser.msie&&/msie 6./.test(ua)&&typeof window['XMLHttpRequest']!=='object';browser.ie7=browser.msie&&/msie 7.0/.test(ua);browser.boxModel=(document.compatMode==="CSS1Compat");$.modal=function(data,options){return $.modal.impl.init(data,options);};$.modal.close=function(){$.modal.impl.close();};$.modal.focus=function(pos){$.modal.impl.focus(pos);};$.modal.setContainerDimensions=function(){$.modal.impl.setContainerDimensions();};$.modal.setPosition=function(){$.modal.impl.setPosition();};$.modal.update=function(height,width){$.modal.impl.update(height,width);};$.fn.modal=function(options){return $.modal.impl.init(this,options);};$.modal.defaults={appendTo:'body',focus:true,opacity:50,overlayId:'simplemodal-overlay',overlayCss:{},containerId:'simplemodal-container',containerCss:{},dataId:'simplemodal-data',dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:false,autoPosition:true,zIndex:1000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:'simplemodal-close',escClose:true,overlayClose:false,fixed:true,position:null,persist:false,modal:true,onOpen:null,onShow:null,onClose:null};$.modal.impl={d:{},init:function(data,options){var s=this;if(s.d.data){return false;}
browser.ieQuirks=browser.msie&&!browser.boxModel;s.o=$.extend({},$.modal.defaults,options);s.zIndex=s.o.zIndex;s.occb=false;if(typeof data==='object'){data=data instanceof $?data:$(data);s.d.placeholder=false;if(data.parent().parent().size()>0){data.before($('<span></span>').attr('id','simplemodal-placeholder').css({display:'none'}));s.d.placeholder=true;s.display=data.css('display');if(!s.o.persist){s.d.orig=data.clone(true);}}}
else if(typeof data==='string'||typeof data==='number'){data=$('<div></div>').html(data);}
else{alert('SimpleModal Error: Unsupported data type: '+typeof data);return s;}
s.create(data);data=null;s.open();if($.isFunction(s.o.onShow)){s.o.onShow.apply(s,[s.d]);}
return s;},create:function(data){var s=this;s.getDimensions();if(s.o.modal&&browser.ie6){s.d.iframe=$('<iframe src="javascript:false;"></iframe>').css($.extend(s.o.iframeCss,{display:'none',opacity:0,position:'fixed',height:w[0],width:w[1],zIndex:s.o.zIndex,top:0,left:0})).appendTo(s.o.appendTo);}
s.d.overlay=$('<div></div>').attr('id',s.o.overlayId).addClass('simplemodal-overlay').css($.extend(s.o.overlayCss,{display:'none',opacity:s.o.opacity/100,height:s.o.modal?d[0]:0,width:s.o.modal?d[1]:0,position:'fixed',left:0,top:0,zIndex:s.o.zIndex+1})).appendTo(s.o.appendTo);s.d.container=$('<div></div>').attr('id',s.o.containerId).addClass('simplemodal-container').css($.extend({position:s.o.fixed?'fixed':'absolute'},s.o.containerCss,{display:'none',zIndex:s.o.zIndex+2})).append(s.o.close&&s.o.closeHTML?$(s.o.closeHTML).addClass(s.o.closeClass):'').appendTo(s.o.appendTo);s.d.wrap=$('<div></div>').attr('tabIndex',-1).addClass('simplemodal-wrap').css({height:'100%',outline:0,width:'100%'}).appendTo(s.d.container);s.d.data=data.attr('id',data.attr('id')||s.o.dataId).addClass('simplemodal-data').css($.extend(s.o.dataCss,{display:'none'})).appendTo('body');data=null;s.setContainerDimensions();s.d.data.appendTo(s.d.wrap);if(browser.ie6||browser.ieQuirks){s.fixIE();}},bindEvents:function(){var s=this;$('.'+s.o.closeClass).bind('click.simplemodal',function(e){e.preventDefault();s.close();});if(s.o.modal&&s.o.close&&s.o.overlayClose){s.d.overlay.bind('click.simplemodal',function(e){e.preventDefault();s.close();});}
doc.bind('keydown.simplemodal',function(e){if(s.o.modal&&e.keyCode===9){s.watchTab(e);}
else if((s.o.close&&s.o.escClose)&&e.keyCode===27){e.preventDefault();s.close();}});wndw.bind('resize.simplemodal orientationchange.simplemodal',function(){s.getDimensions();s.o.autoResize?s.setContainerDimensions():s.o.autoPosition&&s.setPosition();if(browser.ie6||browser.ieQuirks){s.fixIE();}
else if(s.o.modal){s.d.iframe&&s.d.iframe.css({height:w[0],width:w[1]});s.d.overlay.css({height:d[0],width:d[1]});}});},unbindEvents:function(){$('.'+this.o.closeClass).unbind('click.simplemodal');doc.unbind('keydown.simplemodal');wndw.unbind('.simplemodal');this.d.overlay.unbind('click.simplemodal');},fixIE:function(){var s=this,p=s.o.position;$.each([s.d.iframe||null,!s.o.modal?null:s.d.overlay,s.d.container.css('position')==='fixed'?s.d.container:null],function(i,el){if(el){var bch='document.body.clientHeight',bcw='document.body.clientWidth',bsh='document.body.scrollHeight',bsl='document.body.scrollLeft',bst='document.body.scrollTop',bsw='document.body.scrollWidth',ch='document.documentElement.clientHeight',cw='document.documentElement.clientWidth',sl='document.documentElement.scrollLeft',st='document.documentElement.scrollTop',s=el[0].style;s.position='absolute';if(i<2){s.removeExpression('height');s.removeExpression('width');s.setExpression('height',''+bsh+' > '+bch+' ? '+bsh+' : '+bch+' + "px"');s.setExpression('width',''+bsw+' > '+bcw+' ? '+bsw+' : '+bcw+' + "px"');}
else{var te,le;if(p&&p.constructor===Array){var top=p[0]?typeof p[0]==='number'?p[0].toString():p[0].replace(/px/,''):el.css('top').replace(/px/,'');te=top.indexOf('%')===-1?top+' + (t = '+st+' ? '+st+' : '+bst+') + "px"':parseInt(top.replace(/%/,''))+' * (('+ch+' || '+bch+') / 100) + (t = '+st+' ? '+st+' : '+bst+') + "px"';if(p[1]){var left=typeof p[1]==='number'?p[1].toString():p[1].replace(/px/,'');le=left.indexOf('%')===-1?left+' + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"':parseInt(left.replace(/%/,''))+' * (('+cw+' || '+bcw+') / 100) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}}
else{te='('+ch+' || '+bch+') / 2 - (this.offsetHeight / 2) + (t = '+st+' ? '+st+' : '+bst+') + "px"';le='('+cw+' || '+bcw+') / 2 - (this.offsetWidth / 2) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}
s.removeExpression('top');s.removeExpression('left');s.setExpression('top',te);s.setExpression('left',le);}}});},focus:function(pos){var s=this,p=pos&&$.inArray(pos,['first','last'])!==-1?pos:'first';var input=$(':input:enabled:visible:'+p,s.d.wrap);setTimeout(function(){input.length>0?input.focus():s.d.wrap.focus();},10);},getDimensions:function(){var s=this,h=typeof window.innerHeight==='undefined'?wndw.height():window.innerHeight;d=[doc.height(),doc.width()];w=[h,wndw.width()];},getVal:function(v,d){return v?(typeof v==='number'?v:v==='auto'?0:v.indexOf('%')>0?((parseInt(v.replace(/%/,''))/100)*(d==='h'?w[0]:w[1])):parseInt(v.replace(/px/,''))):null;},update:function(height,width){var s=this;if(!s.d.data){return false;}
s.d.origHeight=s.getVal(height,'h');s.d.origWidth=s.getVal(width,'w');s.d.data.hide();height&&s.d.container.css('height',height);width&&s.d.container.css('width',width);s.setContainerDimensions();s.d.data.show();s.o.focus&&s.focus();s.unbindEvents();s.bindEvents();},setContainerDimensions:function(){var s=this,badIE=browser.ie6||browser.ie7;var ch=s.d.origHeight?s.d.origHeight:browser.opera?s.d.container.height():s.getVal(badIE?s.d.container[0].currentStyle['height']:s.d.container.css('height'),'h'),cw=s.d.origWidth?s.d.origWidth:browser.opera?s.d.container.width():s.getVal(badIE?s.d.container[0].currentStyle['width']:s.d.container.css('width'),'w'),dh=s.d.data.outerHeight(true),dw=s.d.data.outerWidth(true);s.d.origHeight=s.d.origHeight||ch;s.d.origWidth=s.d.origWidth||cw;var mxoh=s.o.maxHeight?s.getVal(s.o.maxHeight,'h'):null,mxow=s.o.maxWidth?s.getVal(s.o.maxWidth,'w'):null,mh=mxoh&&mxoh<w[0]?mxoh:w[0],mw=mxow&&mxow<w[1]?mxow:w[1];var moh=s.o.minHeight?s.getVal(s.o.minHeight,'h'):'auto';if(!ch){if(!dh){ch=moh;}
else{if(dh>mh){ch=mh;}
else if(s.o.minHeight&&moh!=='auto'&&dh<moh){ch=moh;}
else{ch=dh;}}}
else{ch=s.o.autoResize&&ch>mh?mh:ch<moh?moh:ch;}
var mow=s.o.minWidth?s.getVal(s.o.minWidth,'w'):'auto';if(!cw){if(!dw){cw=mow;}
else{if(dw>mw){cw=mw;}
else if(s.o.minWidth&&mow!=='auto'&&dw<mow){cw=mow;}
else{cw=dw;}}}
else{cw=s.o.autoResize&&cw>mw?mw:cw<mow?mow:cw;}
s.d.container.css({height:ch,width:cw});s.d.wrap.css({overflow:(dh>ch||dw>cw)?'auto':'visible'});s.o.autoPosition&&s.setPosition();},setPosition:function(){var s=this,top,left,hc=(w[0]/2)-(s.d.container.outerHeight(true)/2),vc=(w[1]/2)-(s.d.container.outerWidth(true)/2),st=s.d.container.css('position')!=='fixed'?wndw.scrollTop():0;if(s.o.position&&Object.prototype.toString.call(s.o.position)==='[object Array]'){top=st+(s.o.position[0]||hc);left=s.o.position[1]||vc;}else{top=st+hc;left=vc;}
s.d.container.css({left:left,top:top});},watchTab:function(e){var s=this;if($(e.target).parents('.simplemodal-container').length>0){s.inputs=$(':input:enabled:visible:first, :input:enabled:visible:last',s.d.data[0]);if((!e.shiftKey&&e.target===s.inputs[s.inputs.length-1])||(e.shiftKey&&e.target===s.inputs[0])||s.inputs.length===0){e.preventDefault();var pos=e.shiftKey?'last':'first';s.focus(pos);}}
else{e.preventDefault();s.focus();}},open:function(){var s=this;s.d.iframe&&s.d.iframe.show();if($.isFunction(s.o.onOpen)){s.o.onOpen.apply(s,[s.d]);}
else{s.d.overlay.show();s.d.container.show();s.d.data.show();}
s.o.focus&&s.focus();s.bindEvents();},close:function(){var s=this;if(!s.d.data){return false;}
s.unbindEvents();if($.isFunction(s.o.onClose)&&!s.occb){s.occb=true;s.o.onClose.apply(s,[s.d]);}
else{if(s.d.placeholder){var ph=$('#simplemodal-placeholder');if(s.o.persist){ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display',s.display));}
else{s.d.data.hide().remove();ph.replaceWith(s.d.orig);}}
else{s.d.data.hide().remove();}
s.d.container.hide().remove();s.d.overlay.hide();s.d.iframe&&s.d.iframe.hide().remove();s.d.overlay.remove();s.d={};}}};}));


/*===============================
http://www.tuvanduan.net.vn/modules/mod_bt_sociallogin/tmpl/js/default.js
================================================================================*/;
var BTLJ=jQuery.noConflict();if(typeof(btTimeOut)=='undefined')var btTimeOut;if(typeof(requireRemove)=='undefined')var requireRemove=true;BTLJ(document).ready(function(){if(jQuery("#btrecaptcha").children().length==0){jQuery("#system-message").html('');}
BTLJ('#btl-content').appendTo('body');BTLJ(".btl-input #jform_profile_aboutme").attr("cols",21);BTLJ('.bt-scroll .btl-buttonsubmit').click(function(){setTimeout(function(){if(BTLJ("#btl-registration-error").is(':visible')){BTLJ('.bt-scroll').data('jsp').scrollToY(0,true);}else{var position=BTLJ('.bt-scroll').find('.invalid:first').position();if(position)BTLJ('.bt-scroll').data('jsp').scrollToY(position.top<300?0:position.top-50,true);}},20);})
btlOpt.LB_SIZE=btlOpt.LB_SIZE.split(',');btlOpt.RB_SIZE=btlOpt.RB_SIZE.split(',');if(btlOpt.LB_SIZE[0]>BTLJ(window).width()){btlOpt.LB_SIZE[0]=BTLJ(window).width();}
if(btlOpt.RB_SIZE[0]>BTLJ(window).width()){btlOpt.RB_SIZE[0]=BTLJ(window).width();}
jQuery('#btl-content-registration .bt-scroll').css({'width':btlOpt.RB_SIZE[0],'height':(btlOpt.RB_SIZE[1]-50)+'px'})
BTLJ("#jform_profile_dob_img").click(function(){BTLJ("div.calendar:last").show().css({"position":"fixed",'z-index':1006});BTLJ(".calendar").click(function(){requireRemove=false;});});if(BTLJ('.btl-dropdown').length){setFPosition();BTLJ(window).resize(function(){setFPosition();})}
BTLJ(btlOpt.LOGIN_TAGS).addClass("btl-modal");if(btlOpt.REGISTER_TAGS!=''){BTLJ(btlOpt.REGISTER_TAGS).addClass("btl-modal");}
var elements='#btl-panel-login';if(btlOpt.LOGIN_TAGS)elements+=', '+btlOpt.LOGIN_TAGS;if(btlOpt.MOUSE_EVENT=='click'){BTLJ(elements).click(function(event){showLoginForm();event.preventDefault();});}else{BTLJ(elements).hover(function(){showLoginForm();},function(){});}
elements='#btl-panel-registration';if(btlOpt.REGISTER_TAGS)elements+=', '+btlOpt.REGISTER_TAGS;if(btlOpt.MOUSE_EVENT=='click'){BTLJ(elements).click(function(event){showRegistrationForm();event.preventDefault();});BTLJ("#btl-panel-profile").click(function(event){showProfile();event.preventDefault();});}else{BTLJ(elements).hover(function(){if(!BTLJ("#btl-integrated").length){showRegistrationForm();}},function(){});BTLJ("#btl-panel-profile").hover(function(){showProfile();},function(){});}
BTLJ('#register-link a').click(function(event){if(BTLJ('.btl-modal').length){BTLJ.modal.close();setTimeout("showRegistrationForm();",1000);}
else{showRegistrationForm();}
event.preventDefault();});BTLJ(document).click(function(event){if(requireRemove&&event.which==1)btTimeOut=setTimeout('BTLJ("#btl-content > div").fadeOut();BTLJ(".btl-panel span").removeClass("active");',10);requireRemove=true;})
BTLJ(".btl-content-block").click(function(){requireRemove=false;});BTLJ(".btl-panel span").click(function(){requireRemove=false;});BTLJ('span#btl-captcha-reload').click(function(){BTLJ.ajax({type:"post",url:btlOpt.BT_AJAX,data:'bttask=reload_captcha',success:function(html){BTLJ('#recaptcha img').attr('src',html);}});});});function setFPosition(){if(btlOpt.ALIGN=="center"){BTLJ("#btl-content > div").each(function(){var panelid="#"+this.id.replace("content","panel");var left=BTLJ(panelid).offset().left+BTLJ(panelid).width()/2-BTLJ(this).width()/2;if(left<0)left=0;BTLJ(this).css('left',left);});}else{if(btlOpt.ALIGN=="right"){BTLJ("#btl-content > div").css('right',BTLJ(document).width()-BTLJ('.btl-panel').offset().left-BTLJ('.btl-panel').width());}else{BTLJ("#btl-content > div").css('left',BTLJ('.btl-panel').offset().left);}}
BTLJ("#btl-content > div").css('top',BTLJ(".btl-panel").offset().top+BTLJ(".btl-panel").height()+2);}
function showLoginForm(){BTLJ('.btl-panel span').removeClass("active");var el='#btl-panel-login';BTLJ.modal.close();if(btlOpt.EFFECT=="btl-modal"){BTLJ(el).addClass("active");BTLJ("#btl-content > div").fadeOut();BTLJ("#btl-content-login").modal({overlayClose:true,persist:true,autoPosition:true,fixed:BTLJ(window).width()>500,onOpen:function(dialog){BTLJ('#btl-login-error').hide();dialog.overlay.fadeIn();dialog.container.show();dialog.data.show();},onClose:function(dialog){dialog.overlay.fadeOut(function(){dialog.container.hide();dialog.data.hide();BTLJ.modal.close();BTLJ('.btl-panel span').removeClass("active");});},containerCss:{width:btlOpt.LB_SIZE[0],height:btlOpt.LB_SIZE[1]}})}
else
{setFPosition();BTLJ("#btl-content > div").each(function(){if(this.id=="btl-content-login")
{if(BTLJ(this).is(":hidden")){BTLJ(el).addClass("active");BTLJ(this).slideDown();}
else{BTLJ(this).fadeOut();BTLJ(el).removeClass("active");}}
else{if(BTLJ(this).is(":visible")){BTLJ(this).fadeOut();BTLJ('#btl-panel-registration').removeClass("active");}}})}}
function populateFormRegister(data,editEmail){BTLJ.modal.close();setTimeout(function(){populateFormRegisterDelay(data,editEmail);},800);}
function populateFormRegisterDelay(data,editEmail){for(var i in data)
{if(i!='profile'){jQuery('#jform_'+i).val(data[i]);}else{for(var j in data['profile']){jQuery('#jform_profile_'+j).val(data['profile'][j]);}}}
BTLJ('#btl-form-register #jform_password1').val('');BTLJ('#btl-form-register #jform_password2').val('');if(!editEmail){BTLJ('#btl-form-register #jform_email1').attr('disabled','disabled');BTLJ('#btl-form-register #jform_email2').attr('disabled','disabled');}
showRegistrationForm();}
function showRegistrationForm(){if(BTLJ("#btl-integrated").length){window.location.href=BTLJ("#btl-integrated").val();return;}
BTLJ('.btl-panel span').removeClass("active");BTLJ.modal.close();var el='#btl-panel-registration';var $parent;if(btlOpt.EFFECT=="btl-modal"){if(jQuery('#recaptcha_area').length){$parent=jQuery('#recaptcha_area').parent().parent();jQuery('#recaptcha_area').parent().appendTo(jQuery('#btrecaptcha'));}
BTLJ(el).addClass("active");BTLJ("#btl-content > div").fadeOut();BTLJ("#btl-content-registration").modal({overlayClose:true,persist:true,autoPosition:true,fixed:BTLJ(window).width()>500,onOpen:function(dialog){dialog.overlay.fadeIn();dialog.container.show();dialog.data.show();BTLJ('.bt-scroll').jScrollPane();},onClose:function(dialog){dialog.overlay.fadeOut(function(){dialog.container.hide();dialog.data.hide();BTLJ.modal.close();BTLJ('.btl-panel span').removeClass("active");if($parent.length){jQuery('#recaptcha_area').parent().appendTo($parent);}});},containerCss:{width:btlOpt.RB_SIZE[0],height:'auto'}})}
else
{setFPosition();BTLJ("#btl-content > div").each(function(){if(this.id=="btl-content-registration")
{if(BTLJ(this).is(":hidden")){BTLJ(el).addClass("active");BTLJ(this).slideDown(function(){});BTLJ('.bt-scroll').jScrollPane();}
else{BTLJ(this).fadeOut();BTLJ(el).removeClass("active");}}
else{if(BTLJ(this).is(":visible")){BTLJ(this).fadeOut();BTLJ('#btl-panel-login').removeClass("active");}}})}}
function showProfile(){setFPosition();var el='#btl-panel-profile';BTLJ("#btl-content > div").each(function(){if(this.id=="btl-content-profile")
{if(BTLJ(this).is(":hidden")){BTLJ(el).addClass("active");BTLJ(this).slideDown();}
else{BTLJ(this).fadeOut();BTLJ('.btl-panel span').removeClass("active");}}
else{if(BTLJ(this).is(":visible")){BTLJ(this).fadeOut();BTLJ('.btl-panel span').removeClass("active");}}})}
function registerAjax(){BTLJ("#btl-registration-error").hide();if(BTLJ(".btl-input #jform_name").val()==""){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.REQUIRED_NAME).show();return false;}
if(BTLJ(".btl-input #jform_username").val()==""){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.REQUIRED_USERNAME).show();return false;}
if(BTLJ(".btl-input #jform_password1").val()==""){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.REQUIRED_PASSWORD).show();return false;}
if(BTLJ(".btl-input #jform_password2").val()==""){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.REQUIRED_VERIFY_PASSWORD).show();return false;}
if(BTLJ(".btl-input #jform_password2").val()!=BTLJ(".btl-input #jform_password1").val()){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.PASSWORD_NOT_MATCH).show();return false;}
if(BTLJ(".btl-input #jform_email1").val()==""&&!BTLJ(".btl-input #jform_email1").attr('disabled')){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.REQUIRED_EMAIL).show();return false;}
var emailRegExp=/^[_a-zA-Z0-9-]+(\.[_a-zA-z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.([a-zA-Z]){2,4})$/;if(!BTLJ(".btl-input #jform_email1").attr('disabled')&&!emailRegExp.test(BTLJ(".btl-input #jform_email1").val())){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.EMAIL_INVALID).show();return false;}
if(BTLJ(".btl-input #jform_email1").val()!=BTLJ(".btl-input #jform_email2").val()){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.EMAIL_NOT_MATCH).show();;return false;}
if(BTLJ("#jform_profile_tos0").length){if(!BTLJ("#jform_profile_tos0").is(":checked")){BTLJ("#jform_profile_tos").css("border","1px solid red");BTLJ("#jform_profile_tos").addClass("invalid");BTLJ("#jform_profile_tos0").focus();result=1;}else{BTLJ("#jform_profile_tos").css("border","none");BTLJ("#jform_profile_tos").removeClass("invalid");}}
if(btlOpt.RECAPTCHA=="recaptcha"){if(BTLJ('#recaptcha_response_field').length&&BTLJ('#recaptcha_response_field').val()==''){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.CAPTCHA_REQUIRED).show();BTLJ('#recaptcha_response_field').focus();return false;}}else if(btlOpt.RECAPTCHA=="2"){if(BTLJ('#btl-captcha').length&&BTLJ('#btl-captcha').val()==''){BTLJ("#btl-registration-error").html(btlOpt.MESSAGE.CAPTCHA_REQUIRED).show();BTLJ('#btl-captcha').focus();return false;}}
var token=BTLJ('.btl-buttonsubmit input:last').attr("name");var value_token=BTLJ('.btl-buttonsubmit input:last').val();var datasubmit=BTLJ('#btl-form-register').serialize();BTLJ.ajax({type:"POST",beforeSend:function(){BTLJ("#btl-register-in-process").show();},async:true,url:btlOpt.BT_AJAX,data:datasubmit,success:function(html){BTLJ("#btl-register-in-process").hide();if(html.indexOf('$error$')!=-1){BTLJ("#btl-registration-error").html(html.replace('$error$',''));BTLJ("#btl-registration-error").show();BTLJ('.bt-scroll').data('jsp').scrollToY(0,true);if(btlOpt.RECAPTCHA=="1"){if(typeof(Recaptcha)!='undefined'){Recaptcha.reload();}
if(typeof(grecaptcha)!='undefined'){grecaptcha.reset(bt_social_login_recaptcha);}}else if(btlOpt.RECAPTCHA=="2"){BTLJ.ajax({type:"post",url:btlOpt.BT_AJAX,data:'bttask=reload_captcha',success:function(html){BTLJ('#recaptcha img').attr('src',html);}});}}else{BTLJ(".bt-scroll").hide();BTLJ("#btl-success").html(html);BTLJ("#btl-success").show();setTimeout(function(){window.location.reload();},4000);}},error:function(XMLHttpRequest,textStatus,errorThrown){alert(textStatus+': Ajax request failed!');if(btlOpt.RECAPTCHA=="1"){if(typeof(Recaptcha)!='undefined'){Recaptcha.reload();}
if(typeof(grecaptcha)!='undefined'){grecaptcha.reset(bt_social_login_recaptcha);}}else if(btlOpt.RECAPTCHA=="2"){BTLJ.ajax({type:"post",url:btlOpt.BT_AJAX,data:'bttask=reload_captcha',success:function(html){BTLJ('#recaptcha img').attr('src',html);}});}}});return false;}
function loginAjax(){if(BTLJ("#btl-input-username").val()==""){BTLJ("#btl-login-error").html(btlOpt.MESSAGE.REQUIRED_USERNAME)
BTLJ("#btl-login-error").show();return false;}
if(BTLJ("#btl-input-password").val()==""){BTLJ("#btl-login-error").html(btlOpt.MESSAGE.REQUIRED_PASSWORD);BTLJ("#btl-login-error").show();return false;}
var token=BTLJ('.btl-buttonsubmit input:last').attr("name");var value_token=encodeURIComponent(BTLJ('.btl-buttonsubmit input:last').val());var datasubmit="bttask=login&username="+encodeURIComponent(BTLJ("#btl-input-username").val())
+"&passwd="+encodeURIComponent(BTLJ("#btl-input-password").val())
+"&"+token+"="+value_token
+"&return="+encodeURIComponent(BTLJ("#btl-return").val());if(BTLJ("#btl-checkbox-remember").is(":checked")){datasubmit+='&remember=yes';}
BTLJ.ajax({type:"POST",beforeSend:function(){BTLJ("#btl-login-in-process").show();BTLJ("#btl-login-in-process").css('height',BTLJ('#btl-content-login').outerHeight()+'px');},async:true,url:btlOpt.BT_AJAX,data:datasubmit,success:function(html){if(html=="1"||html==1){window.location.href=btlOpt.BT_RETURN;}else{BTLJ("#btl-login-in-process").hide();BTLJ("#btl-login-error").html(btlOpt.MESSAGE.E_LOGIN_AUTHENTICATE);BTLJ("#btl-login-error").show();}},error:function(XMLHttpRequest,textStatus,errorThrown){alert(textStatus+': ajax request failed');}});return false;}
function newPopup(pageURL,title,w,h){var left=(screen.width/2)-(w/2);var top=(screen.height/2)-(h/2);var popupWindow=window.open(pageURL,'connectingPopup','height='+h+',width='+w+',left='+left+',top='+top+',resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');}


/*===============================
/media/system/js/punycode.js
================================================================================*/;
/*! http://mths.be/punycode v1.2.4 (C) by @mathias | MIT License*/
!function(a){function b(a){throw RangeError(E[a])}function c(a,b){for(var c=a.length;c--;)a[c]=b(a[c]);return a}function d(a,b){return c(a.split(D),b).join(".")}function e(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function f(a){return c(a,function(a){var b="";return a>65535&&(a-=65536,b+=H(a>>>10&1023|55296),a=56320|1023&a),b+=H(a)}).join("")}function g(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:t}function h(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function i(a,b,c){var d=0;for(a=c?G(a/x):a>>1,a+=G(a/b);a>F*v>>1;d+=t)a=G(a/F);return G(d+(F+1)*a/(a+w))}function j(a){var c,d,e,h,j,k,l,m,n,o,p=[],q=a.length,r=0,w=z,x=y;for(d=a.lastIndexOf(A),0>d&&(d=0),e=0;d>e;++e)a.charCodeAt(e)>=128&&b("not-basic"),p.push(a.charCodeAt(e));for(h=d>0?d+1:0;q>h;){for(j=r,k=1,l=t;h>=q&&b("invalid-input"),m=g(a.charCodeAt(h++)),(m>=t||m>G((s-r)/k))&&b("overflow"),r+=m*k,n=x>=l?u:l>=x+v?v:l-x,!(n>m);l+=t)o=t-n,k>G(s/o)&&b("overflow"),k*=o;c=p.length+1,x=i(r-j,c,0==j),G(r/c)>s-w&&b("overflow"),w+=G(r/c),r%=c,p.splice(r++,0,w)}return f(p)}function k(a){var c,d,f,g,j,k,l,m,n,o,p,q,r,w,x,B=[];for(a=e(a),q=a.length,c=z,d=0,j=y,k=0;q>k;++k)p=a[k],128>p&&B.push(H(p));for(f=g=B.length,g&&B.push(A);q>f;){for(l=s,k=0;q>k;++k)p=a[k],p>=c&&l>p&&(l=p);for(r=f+1,l-c>G((s-d)/r)&&b("overflow"),d+=(l-c)*r,c=l,k=0;q>k;++k)if(p=a[k],c>p&&++d>s&&b("overflow"),p==c){for(m=d,n=t;o=j>=n?u:n>=j+v?v:n-j,!(o>m);n+=t)x=m-o,w=t-o,B.push(H(h(o+x%w,0))),m=G(x/w);B.push(H(h(m,0))),j=i(d,r,f==g),d=0,++f}++d,++c}return B.join("")}function l(a){return d(a,function(a){return B.test(a)?j(a.slice(4).toLowerCase()):a})}function m(a){return d(a,function(a){return C.test(a)?"xn--"+k(a):a})}var n="object"==typeof exports&&exports,o="object"==typeof module&&module&&module.exports==n&&module,p="object"==typeof global&&global;(p.global===p||p.window===p)&&(a=p);var q,r,s=2147483647,t=36,u=1,v=26,w=38,x=700,y=72,z=128,A="-",B=/^xn--/,C=/[^ -~]/,D=/\x2E|\u3002|\uFF0E|\uFF61/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},F=t-u,G=Math.floor,H=String.fromCharCode;if(q={version:"1.2.4",ucs2:{decode:e,encode:f},decode:j,encode:k,toASCII:m,toUnicode:l},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return q});else if(n&&!n.nodeType)if(o)o.exports=q;else for(r in q)q.hasOwnProperty(r)&&(n[r]=q[r]);else a.punycode=q}(this);


/*===============================
/media/system/js/validate.js
================================================================================*/;
var JFormValidator=function(){"use strict";var t,e,a,r=function(e,a,r){r=""===r?!0:r,t[e]={enabled:r,exec:a}},n=function(t,e){var a,r=jQuery(e);return t?(a=r.find("#"+t+"-lbl"),a.length?a:(a=r.find('label[for="'+t+'"]'),a.length?a:!1)):!1},i=function(t,e){var a=e.data("label");void 0===a&&(a=n(e.attr("id"),e.get(0).form),e.data("label",a)),t===!1?(e.addClass("invalid").attr("aria-invalid","true"),a&&a.addClass("invalid").attr("aria-invalid","true")):(e.removeClass("invalid").attr("aria-invalid","false"),a&&a.removeClass("invalid").attr("aria-invalid","false"))},l=function(e){var a,r,n=jQuery(e);if(n.attr("disabled"))return i(!0,n),!0;if(n.attr("required")||n.hasClass("required"))if(a=n.prop("tagName").toLowerCase(),"fieldset"===a&&(n.hasClass("radio")||n.hasClass("checkboxes"))){if(!n.find("input:checked").length)return i(!1,n),!1}else if(!n.val()||n.hasClass("placeholder")||"checkbox"===n.attr("type")&&!n.is(":checked"))return i(!1,n),!1;return r=n.attr("class")&&n.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)?n.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"",""===r?(i(!0,n),!0):r&&"none"!==r&&t[r]&&n.val()&&t[r].exec(n.val(),n)!==!0?(i(!1,n),!1):(i(!0,n),!0)},u=function(t){var e,r,n,i,u,s,o=!0,d=[];for(e=jQuery(t).find("input, textarea, select, fieldset"),u=0,s=e.length;s>u;u++)l(e[u])===!1&&(o=!1,d.push(e[u]));if(jQuery.each(a,function(t,e){e.exec()!==!0&&(o=!1)}),!o&&d.length>0){for(r=Joomla.JText._("JLIB_FORM_FIELD_INVALID"),n={error:[]},u=d.length-1;u>=0;u--)i=jQuery(d[u]).data("label"),i&&n.error.push(r+i.text().replace("*",""));Joomla.renderMessages(n)}return o},s=function(t){var a,r=[],n=jQuery(t);a=n.find("input, textarea, select, fieldset, button");for(var i=0,s=a.length;s>i;i++){var o=jQuery(a[i]),d=o.prop("tagName").toLowerCase();"input"!==d&&"button"!==d||"submit"!==o.attr("type")&&"image"!==o.attr("type")?"button"===d||"input"===d&&"button"===o.attr("type")||(o.hasClass("required")&&o.attr("aria-required","true").attr("required","required"),"fieldset"!==d&&(o.on("blur",function(){return l(this)}),o.hasClass("validate-email")&&e&&(o.get(0).type="email")),r.push(o)):o.hasClass("validate")&&o.on("click",function(){return u(t)})}n.data("inputfields",r)},o=function(){t={},a=a||{},e=function(){var t=document.createElement("input");return t.setAttribute("type","email"),"text"!==t.type}(),r("username",function(t){var e=new RegExp("[<|>|\"|'|%|;|(|)|&]","i");return!e.test(t)}),r("password",function(t){var e=/^\S[\S ]{2,98}\S$/;return e.test(t)}),r("numeric",function(t){var e=/^(\d|-)?(\d|,)*\.?\d*$/;return e.test(t)}),r("email",function(t){t=punycode.toASCII(t);var e=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;return e.test(t)});for(var n=jQuery("form.form-validate"),i=0,l=n.length;l>i;i++)s(n[i])};return o(),{isValid:u,validate:l,setHandler:r,attachToForm:s,custom:a}};document.formvalidator=null,jQuery(function(){document.formvalidator=new JFormValidator});