jQuery.noConflict();

window.addEvent("domready",function(){
	/** 
	 * fill value assign
	 * 
	 */
	Joomla.submitbutton = function(pressbutton) {
		jQuery(".socialinput").each(function(){
			var fields = jQuery(this).prev();
			var fb={};
			fb.name= jQuery(".name",fields).val();
			fb.username=jQuery(".username",fields).val();
			fb.email = jQuery(".email1",fields).val();
			fb.profile_address1 = jQuery(".profile_address1",fields).val();
			fb.profile_address2 = jQuery(".profile_address2",fields).val();
			fb.profile_city = jQuery(".profile_city",fields).val();
			fb.profile_region = jQuery(".profile_region",fields).val();
			fb.profile_country = jQuery(".profile_country",fields).val();
			fb.profile_website = jQuery(".profile_website",fields).val();
			fb.profile_aboutme = jQuery(".profile_aboutme",fields).val();
			fb.profile_dob = jQuery(".profile_dob",fields).val();
			value= JSON.stringify(fb);
			var code= new BT.Base64().base64Encode(value);
			jQuery(this).val(code);
		});
		Joomla.submitform(pressbutton, document.getElementById("module-form"));
	}
	
	jQuery('.socialinput').each(function(){
		var code= jQuery(this).val();
		if(code){
			var fbString =  new BT.Base64().base64Decode(code);
			var fb= JSON.decode(fbString);
			var fields = jQuery(this).prev();
			
			if(fb.name==''||fb.name== null){
				fb.username='name';
			}
			if(fb.username==''||fb.username== null){
				fb.username='email';
			}
			if(fb.email == ''||fb.email == null){
				fb.email='email';
			}
			if(fb.profile_address1==''||fb.profile_address1== null){
				fb.profile_address1='location';
			}
			if(fb.profile_address2==''||fb.profile_address2== null){
				fb.profile_address2='';
			}
			if(fb.profile_city==''||fb.profile_city== null){
				fb.profile_address2='hometown';
			}
			if(fb.profile_region==''||fb.profile_region== null){
				fb.profile_region='';
			}
			if(fb.profile_country==''||fb.profile_country== null){
				fb.profile_country='';
			}
			if(fb.profile_website=='' || fb.profile_website == null){
				fb.profile_website='website';
			}
			if(fb.profile_aboutme=='' ||fb.profile_aboutme==null){
				fb.profile_aboutme='bio'
			}
			if(fb.profile_dob=='' ||fb.profile_dob==null){
				fb.profile_dob='birthday';
			}
			jQuery(".name",fields).val(fb.name).trigger('change');
			jQuery(".username",fields).val(fb.username);
			jQuery(".email1",fields).val(fb.email);
			jQuery(".profile_address1",fields).val(fb.profile_address1);
			jQuery(".profile_address2",fields).val(fb.profile_address2);
			jQuery(".profile_city",fields).val(fb.profile_city);
			jQuery(".profile_region",fields).val(fb.profile_region);
			jQuery(".profile_country",fields).val(fb.profile_country);
			jQuery(".profile_phone",fields).val(fb.profile_phone);
			jQuery(".profile_website",fields).val(fb.profile_website);
			jQuery(".profile_aboutme",fields).val(fb.profile_aboutme);
			jQuery(".profile_dob",fields).val(fb.profile_dob);
		}
	})
	

	var parent = 'li:first';
	if(jQuery(".row-fluid").length){
		parent = '.control-group:first';
	}
    jQuery("#jform_params_asset-lbl").parents(parent).remove();
    jQuery("#jform_params_assignfb").parents(parent).hide();
	

	jQuery('#module-sliders li > .btn-group').each(function(){
		if(jQuery(this).find('input').length != 2 ) return;
		if(this.id.indexOf('advancedparams') ==0) return;
		jQuery(this).hide();
		
		el = jQuery(this).find('input:checked').val();
		if( el != '0' && el != '1' && el != 'false' && el != 'true' && el != 'no' && el != 'yes' ){
			return;
		}
		
		jQuery(this).hide();
		var group = this;
		

		var el = jQuery(group).find('input:checked');	
		var switchClass ='';

		if(el.val()=='' || el.val()=='0' || el.val()=='no' || el.val()=='false'){
			switchClass = 'no';
		}else{
			switchClass = 'yes';
		}
		var switcher = new Element('div',{'class' : 'switcher-'+switchClass});
		switcher.inject(group, 'after');
		switcher.addEvent("click", function(){
			var el = jQuery(group).find('input:checked');	
			if(el.val()=='' || el.val()=='0' || el.val()=='no' || el.val()=='false'){
				switcher.setProperty('class','switcher-yes');
			}else {
				switcher.setProperty('class','switcher-no');
			}
			jQuery(group).find('input:not(:checked)').attr('checked',true).trigger('click');
		});
	});
	jQuery('.bt_color').ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			jQuery(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			jQuery(colpkr).fadeOut(500);
			return false;
		},
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val("#"+hex);
			//jQuery(el).css('background',jQuery(el).val())
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
	});
	jQuery(".pane-sliders select").each(function(){
		if(this.id.indexOf('advancedparams') ==0) return;
		if(jQuery(this).is(":visible")) {
		jQuery(this).css("width",parseInt(jQuery(this).width())+20);
		jQuery(this).chosen()
		};
	})	
	jQuery(".chzn-container").click(function(){
		jQuery(".panel .pane-slider,.panel .panelform").css("overflow","visible");	
	})
	jQuery(".panel .title").click(function(){
		jQuery(".panel .pane-slider,.panel .panelform").css("overflow","hidden");		
	})	
	
	
	// Group element
	jQuery(".bt_control").each(function(){
		var control = this;;
		if(jQuery(control).parents(parent).css('display')=='none' ) return;
		
		// select box
		var name = control.id.replace('jform_params_','');
		jQuery(control).change(function(){
			jQuery(this).find('option').each(function(){
				jQuery('.'+name+'_'+this.value).each(function(){
					jQuery(this).parents(parent).hide();
				})
			})
			jQuery('.'+name+'_'+jQuery(this).find('option:selected').val()).each(function(){
				jQuery(this).parents(parent).fadeIn(500);
			})
		});
		jQuery(control).change();
		
		// radio box
		jQuery(control).find('input').each(function(){ 
			if(jQuery(this).is(':not(:checked)')){ 
				jQuery('.'+name+'_'+this.value).each(function(){
					jQuery(this).parents(parent).hide();
				});
			}
			jQuery(this).click(function(){ 
				jQuery(this).siblings('input').each(function(){ 
					jQuery('.'+name+'_'+this.value).each(function(){
						jQuery(this).parents(parent).hide();
					});
				})
				jQuery('.'+name+'_'+this.value).each(function(){
					jQuery(this).parents(parent).fadeIn(500);
				});
			})
		})
		
	});
	jQuery('.profile-fields').parent().css('margin-left','0');
});


