

/*===============================
/plugins/system/t3/base-bs3/bootstrap/js/bootstrap.js
================================================================================*/;
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){'use strict';var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.4'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.3.4'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked')&&this.$element.hasClass('active'))changed=false
else $parent.find('.active').removeClass('active')}
if(changed)$input.prop('checked',!this.$element.hasClass('active')).trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))}
if(changed)this.$element.toggleClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
e.preventDefault()}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.4'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.4'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.4'
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if((!isActive&&e.which!=27)||(isActive&&e.which==27)){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="menu"]',Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="listbox"]',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.4'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.4'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(self&&self.$tip&&self.$tip.is(':visible')){self.hoverState='in'
return}
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $container=this.options.container?$(this.options.container):this.$element.parent()
var containerDim=this.getPosition($container)
placement=placement=='bottom'&&pos.bottom+actualHeight>containerDim.bottom?'top':placement=='top'&&pos.top-actualHeight<containerDim.top?'bottom':placement=='right'&&pos.right+actualWidth>containerDim.width?'left':placement=='left'&&pos.left-actualWidth<containerDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var elOffset=isBody?{top:0,left:0}:$element.offset()
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.4'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.4'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.4'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&(($active.length&&$active.hasClass('fade'))||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.4'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':false
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?false:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?false:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return false}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=$(document.body).height()
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/jquery.tap.min.js
================================================================================*/;
!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/off-canvas.js
================================================================================*/;
jQuery(document).ready(function($){function getAndroidVersion(ua){var ua=ua||navigator.userAgent;var match=ua.match(/Android\s([0-9\.]*)/);return match?match[1]:false;};if(parseInt(getAndroidVersion())==4){$('#t3-mainnav').addClass('t3-mainnav-android');}
var JA_isLoading=false;if(/MSIE\s([\d.]+)/.test(navigator.userAgent)?new Number(RegExp.$1)<10:false){$('html').addClass('old-ie');}else if(/constructor/i.test(window.HTMLElement)){$('html').addClass('safari');}
var $wrapper=$('body'),$inner=$('.t3-wrapper'),$toggles=$('.off-canvas-toggle'),$offcanvas=$('.t3-off-canvas'),$close=$('.t3-off-canvas .close'),$btn=null,$nav=null,direction='left',$fixed=null;if(!$wrapper.length)return;$toggles.each(function(){var $this=$(this),$nav=$($this.data('nav')),effect=$this.data('effect'),direction=($('html').attr('dir')=='rtl'&&$this.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$this.data('pos')=='right')?'right':'left';$nav.addClass(effect).addClass('off-canvas-'+direction);var inside_effect=['off-canvas-effect-3','off-canvas-effect-16','off-canvas-effect-7','off-canvas-effect-8','off-canvas-effect-14'];if($.inArray(effect,inside_effect)==-1){$inner.before($nav);}else{$inner.prepend($nav);}});$toggles.on('tap',function(e){stopBubble(e);if($wrapper.hasClass('off-canvas-open')){oc_hide(e);return false;}
$btn=$(this);$nav=$($btn.data('nav'));if(!$fixed)$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});$nav.addClass('off-canvas-current');direction=($('html').attr('dir')=='rtl'&&$btn.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$btn.data('pos')=='right')?'right':'left';$offcanvas.height($(window).height());var events=$(window).data('events');if(events&&events.scroll&&events.scroll.length){var handlers=[];for(var i=0;i<events.scroll.length;i++){handlers[i]=events.scroll[i].handler;}
$(window).data('scroll-events',handlers);$(window).off('scroll');}
var scrollTop=($('html').scrollTop())?$('html').scrollTop():$('body').scrollTop();$('html').addClass('noscroll').css('top',-scrollTop).data('top',scrollTop);$('.t3-off-canvas').css('top',scrollTop);$fixed.each(function(){var $this=$(this),$parent=$this.parent(),mtop=0;while(!$parent.is($inner)&&$parent.css("position")==='static')$parent=$parent.parent();mtop=-$parent.offset().top;$this.css({'position':'absolute','margin-top':mtop});});$wrapper.scrollTop(scrollTop);$wrapper[0].className=$wrapper[0].className.replace(/\s*off\-canvas\-effect\-\d+\s*/g,' ').trim()+' '+$btn.data('effect')+' '+'off-canvas-'+direction;setTimeout(oc_show,50);return false;});var oc_show=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$wrapper.addClass('off-canvas-open');$inner.on('click',oc_hide);$close.on('click',oc_hide);$offcanvas.on('click',stopBubble);if($.browser.msie&&$.browser.version<10){var p1={},p2={};p1['padding-'+direction]=$('.t3-off-canvas').width();p2[direction]=0;$inner.animate(p1);$nav.animate(p2);}
setTimeout(function(){JA_isLoading=false;},200);};var oc_hide=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$inner.off('click',oc_hide);$close.off('click',oc_hide);$offcanvas.off('click',stopBubble);setTimeout(function(){$wrapper.removeClass('off-canvas-open');},100);setTimeout(function(){$wrapper.removeClass($btn.data('effect')).removeClass('off-canvas-'+direction);$wrapper.scrollTop(0);$('html').removeClass('noscroll').css('top','');$('html,body').scrollTop($('html').data('top'));$nav.removeClass('off-canvas-current');$fixed.css({'position':'','margin-top':''});if($(window).data('scroll-events')){var handlers=$(window).data('scroll-events');for(var i=0;i<handlers.length;i++){$(window).on('scroll',handlers[i]);}
$(window).data('scroll-events',null);}
JA_isLoading=false;},700);if($('html').hasClass('old-ie')){var p1={},p2={};p1['padding-'+direction]=0;p2[direction]=-$('.t3-off-canvas').width();$inner.animate(p1);$nav.animate(p2);}};var stopBubble=function(e){e.stopPropagation();return true;}
$(window).load(function(){setTimeout(function(){$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});},100);});})


/*===============================
/plugins/system/t3/base-bs3/js/script.js
================================================================================*/;
!function($){if($.browser==undefined||$.browser.msie==undefined){$.browser={msie:false,version:0};if(match=navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)||navigator.userAgent.match(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/)){$.browser.msie=true;$.browser.version=match[1];}}
if($.browser.msie){$('html').addClass('ie'+Math.floor($.browser.version));}
$(document).ready(function(){if(!window.getComputedStyle){window.getComputedStyle=function(el,pseudo){this.el=el;this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;if(prop=='float')prop='styleFloat';if(re.test(prop)){prop=prop.replace(re,function(){return arguments[2].toUpperCase();});}
return el.currentStyle[prop]?el.currentStyle[prop]:null;}
return this;}}
var fromClass='body-data-holder',prop='content',$inspector=$('<div>').css('display','none').addClass(fromClass).appendTo($('body'));try{var computedStyle=window.getComputedStyle($inspector[0],':before');if(computedStyle){var attrs=computedStyle.getPropertyValue(prop);if(attrs){var matches=attrs.match(/([\da-z\-]+)/gi),data={};if(matches&&matches.length){for(var i=0;i<matches.length;i++){data[matches[i++]]=i<matches.length?matches[i]:null;}}
$('body').data(data);}}}finally{$inspector.remove();}});(function(){$.support.t3transform=(function(){var style=document.createElement('div').style,vendors=['t','webkitT','MozT','msT','OT'],transform,i=0,l=vendors.length;for(;i<l;i++){transform=vendors[i]+'ransform';if(transform in style){return transform;}}
return false;})();})();(function(){$('html').addClass('ontouchstart'in window?'touch':'no-touch');})();$(document).ready(function(){(function(){if(window.MooTools&&window.MooTools.More&&Element&&Element.implement){var mthide=Element.prototype.hide,mtshow=Element.prototype.show,mtslide=Element.prototype.slide;Element.implement({show:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtshow)&&mtshow.apply(this,args);},hide:function(){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mthide)&&mthide.apply(this,arguments);},slide:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtslide)&&mtslide.apply(this,args);}})}})();$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.DEFAULTS&&($.fn.tooltip.Constructor.DEFAULTS.html=true);$.fn.popover.Constructor&&$.fn.popover.Constructor.DEFAULTS&&($.fn.popover.Constructor.DEFAULTS.html=true);$.fn.tooltip.defaults&&($.fn.tooltip.defaults.html=true);$.fn.popover.defaults&&($.fn.popover.defaults.html=true);(function(){if(window.jomsQuery&&jomsQuery.fn.collapse){$('[data-toggle="collapse"]').on('click',function(e){$($(this).attr('data-target')).eq(0).collapse('toggle');e.stopPropagation();return false;});jomsQuery('html, body').off('touchstart.dropdown.data-api');}})();(function(){if($.fn.chosen&&$(document.documentElement).attr('dir')=='rtl'){$('select').addClass('chzn-rtl');}})();});$(window).load(function(){if(!$(document.documentElement).hasClass('off-canvas-ready')&&($('.navbar-collapse-fixed-top').length||$('.navbar-collapse-fixed-bottom').length)){var btn=$('.btn-navbar[data-toggle="collapse"]');if(!btn.length){return;}
if(btn.data('target')){var nav=$(btn.data('target'));if(!nav.length){return;}
var fixedtop=nav.closest('.navbar-collapse-fixed-top').length;btn.on('click',function(){var wheight=(window.innerHeight||$(window).height());if(!$.support.transition){nav.parent().css('height',!btn.hasClass('collapsed')&&btn.data('t3-clicked')?'':wheight);btn.data('t3-clicked',1);}
nav.addClass('animate').css('max-height',wheight-
(fixedtop?(parseFloat(nav.css('top'))||0):(parseFloat(nav.css('bottom'))||0)));});nav.on('shown hidden',function(){nav.removeClass('animate');});}}});}(jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/menu.js
================================================================================*/;
;(function($){var T3Menu=function(elm,options){this.$menu=$(elm);if(!this.$menu.length){return;}
this.options=$.extend({},$.fn.t3menu.defaults,options);this.child_open=[];this.loaded=false;this.start();};T3Menu.prototype={constructor:T3Menu,start:function(){if(this.loaded){return;}
this.loaded=true;var self=this,options=this.options,$menu=this.$menu;this.$items=$menu.find('li');this.$items.each(function(idx,li){var $item=$(this),$child=$item.children('.dropdown-menu'),$link=$item.children('a'),item={$item:$item,child:$child.length,link:$link.length,clickable:!($link.length&&$child.length),mega:$item.hasClass('mega'),status:'close',timer:null,atimer:null};$item.data('t3menu.item',item);if($child.length&&!options.hover){$item.on('click',function(e){e.stopPropagation();if($item.hasClass('group')){return;}
if(item.status=='close'){e.preventDefault();self.show(item);}});}else{$item.on('click',function(e){e.stopPropagation()});}
$item.find('a > .caret').on('click tap',function(e){item.clickable=false;});if(options.hover){$item.on('mouseover',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('show-processed'))return;$target.data('show-processed',true);setTimeout(function(){$target.data('show-processed',false);},10);self.show(item);}).on('mouseleave',function(e){if($item.hasClass('group'))return;var $target=$(e.target);if($target.data('hide-processed'))return;$target.data('hide-processed',true);setTimeout(function(){$target.data('hide-processed',false);},10);self.hide(item,$target);});if($link.length&&$child.length){$link.on('click',function(e){return item.clickable;});}}});$(document.body).on('tap hideall.t3menu',function(e){clearTimeout(self.timer);self.timer=setTimeout($.proxy(self.hide_alls,self),e.type=='tap'?500:self.options.hidedelay);});$menu.find('.mega-dropdown-menu').on('hideall.t3menu',function(e){e.stopPropagation();e.preventDefault();return false;});$menu.find('input, select, textarea, label').on('click tap',function(e){e.stopPropagation();});},show:function(item){if($.inArray(item,this.child_open)<this.child_open.length-1){this.hide_others(item);}
$(document.body).trigger('hideall.t3menu',[this]);clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.ftimer);clearTimeout(item.ctimer);if(item.status!='open'||!item.$item.hasClass('open')||!this.child_open.length){if(item.mega){clearTimeout(item.astimer);clearTimeout(item.atimer);this.position(item.$item);item.astimer=setTimeout(function(){item.$item.addClass('animating')},10);item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration+50);item.timer=setTimeout(function(){item.$item.addClass('open')},100);}else{item.$item.addClass('open');}
item.status='open';if(item.child&&$.inArray(item,this.child_open)==-1){this.child_open.push(item);}}
item.ctimer=setTimeout($.proxy(this.clickable,this,item),300);},hide:function(item,$target){clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.astimer);clearTimeout(item.atimer);clearTimeout(item.ftimer);if($target&&$target.is('input',item.$item)){return;}
if(item.mega){item.$item.addClass('animating');item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration);item.timer=setTimeout(function(){item.$item.removeClass('open')},100);}else{item.timer=setTimeout(function(){item.$item.removeClass('open');},100);}
item.status='close';for(var i=this.child_open.length;i--;){if(this.child_open[i]===item){this.child_open.splice(i,1);}}
item.ftimer=setTimeout($.proxy(this.hidden,this,item),this.options.duration);this.timer=setTimeout($.proxy(this.hide_alls,this),this.options.hidedelay);},hidden:function(item){if(item.status=='close'){item.clickable=false;}},hide_others:function(item){var self=this;$.each(this.child_open.slice(),function(idx,open){if(!item||(open!=item&&!open.$item.has(item.$item).length)){self.hide(open);}});},hide_alls:function(e,inst){if(!e||e.type=='tap'||(e.type=='hideall'&&this!=inst)){var self=this;$.each(this.child_open.slice(),function(idx,item){item&&self.hide(item);});}},clickable:function(item){item.clickable=true;},position:function($item){var sub=$item.children('.mega-dropdown-menu'),is_show=sub.is(':visible');if(!is_show){sub.show();}
var offset=$item.offset(),width=$item.outerWidth(),screen_width=$(window).width()-this.options.sb_width,sub_width=sub.outerWidth(),level=$item.data('level');if(!is_show){sub.css('display','');}
sub.css({left:'',right:''});if(level==1){var align=$item.data('alignsub'),align_offset=0,align_delta=0,align_trans=0;if(align=='justify'){return;}
if(!align){align='left';}
if(align=='center'){align_offset=offset.left+(width/2);if(!$.support.t3transform){align_trans=-sub_width/2;sub.css(this.options.rtl?'right':'left',align_trans+width/2);}}else{align_offset=offset.left+((align=='left'&&this.options.rtl||align=='right'&&!this.options.rtl)?width:0);}
if(this.options.rtl){if(align=='right'){if(align_offset+sub_width>screen_width){align_delta=screen_width-align_offset-sub_width;sub.css('left',align_delta);if(screen_width<sub_width){sub.css('left',align_delta+sub_width-screen_width);}}}else{if(align_offset<(align=='center'?sub_width/2:sub_width)){align_delta=align_offset-(align=='center'?sub_width/2:sub_width);sub.css('right',align_delta+align_trans);}
if(align_offset+(align=='center'?sub_width/2:0)-align_delta>screen_width){sub.css('right',align_offset+(align=='center'?(sub_width+width)/2:0)+align_trans-screen_width);}}}else{if(align=='right'){if(align_offset<sub_width){align_delta=align_offset-sub_width;sub.css('right',align_delta);if(sub_width>screen_width){sub.css('right',sub_width-screen_width+align_delta);}}}else{if(align_offset+(align=='center'?sub_width/2:sub_width)>screen_width){align_delta=screen_width-align_offset-(align=='center'?sub_width/2:sub_width);sub.css('left',align_delta+align_trans);}
if(align_offset-(align=='center'?sub_width/2:0)+align_delta<0){sub.css('left',(align=='center'?(sub_width+width)/2:0)+align_trans-align_offset);}}}}else{if(this.options.rtl){if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}else{if(offset.left-sub_width<0){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}}else{if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left-sub_width<0){$item.removeClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left-sub_width);}}}else{if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width-sub_width);}}}}}}};$.fn.t3menu=function(option){return this.each(function(){var $this=$(this),data=$this.data('megamenu'),options=typeof option=='object'&&option;if($this.parents('#off-canvas-nav').length)return;if($this.parents('#t3-off-canvas').length)return;if(!data){$this.data('megamenu',(data=new T3Menu(this,options)));}else{if(typeof option=='string'&&data[option]){data[option]()}}})};$.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:true,sb_width:20};$(document).ready(function(){var mm_duration=$('.t3-megamenu').data('duration')||0;if(mm_duration){$('<style type="text/css">'+'.t3-megamenu.animate .animating > .mega-dropdown-menu,'+'.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {'+'transition-duration: '+mm_duration+'ms !important;'+'-webkit-transition-duration: '+mm_duration+'ms !important;'+'}'+'</style>').appendTo('head');}
var mm_timeout=mm_duration?100+mm_duration:500,mm_rtl=$(document.documentElement).attr('dir')=='rtl',mm_trigger=$(document.documentElement).hasClass('mm-hover'),sb_width=(function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()-child.height(100).innerWidth();parent.remove();return width;})();if(!$.support.transition){$('.t3-megamenu').removeClass('animate');mm_timeout=100;}
$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});$(window).load(function(){$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});});});})(jQuery);


/*===============================
/templates/ja_bookshop/js/jquery.easing.1.3.js
================================================================================*/;
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});


/*===============================
/templates/ja_bookshop/js/script.js
================================================================================*/;
(function($){(function(){var browser='';if(/constructor/i.test(window.HTMLElement)){browser='safari';}else if('-ms-scroll-limit'in document.documentElement.style&&'-ms-ime-align'in document.documentElement.style){browser='ie11';}else if(document.documentElement.style.msTouchAction!==undefined){browser='ie10';}
browser&&$('html').addClass(browser);})();$(document).ready(function($){$('#back-to-top').addClass('deactive');$(window).scroll(function(){if($(this).scrollTop()>0){$('#back-to-top').removeClass('deactive').addClass('active');}else{$('#back-to-top').removeClass('active').addClass('deactive');}});(function(){$('#back-to-top').on('click',function(){$('html, body').stop(true).animate({scrollTop:0},{duration:800,easing:'easeInOutCubic',complete:window.reflow});return false;});})();if($('.mod_dropdown').length>0){$('.toolbar-ct-3 .dropdown-toggle').click(function(e){$(this).parents('.toolbar-ct-3 .btn-group').toggleClass('open active');e.preventDefault();});};if($("#system-message").children().length){$("#system-message-container").show();$("#system-message a.close").click(function(){setTimeout(function(){if(!$("#system-message").children().length)$("#system-message-container").hide();},100);});}else{$("#system-message-container").hide();}
$(document).on('tap',function(e){if(!$(e.target).is('#cart .content_oc, #cart .content_oc *')){$('.content_oc').parents('#cart:first').removeClass('active');}});});})(jQuery);


/*===============================
/templates/ja_bookshop/js/jquery.nivo.slider.pack.js
================================================================================*/;
(function(a){var b=function(b,c){var d=a.extend({},a.fn.nivoSlider.defaults,c);var e={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false};var f=a(b);f.data("nivo:vars",e);f.css("position","relative");f.addClass("nivoSlider");var g=f.children();g.each(function(){var b=a(this);var c="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");c=b}b=b.find("img:first")}var d=b.width();if(d==0)d=b.attr("width");var g=b.height();if(g==0)g=b.attr("height");if(d>f.width()){f.width(d)}if(g>f.height()){f.height(g)}if(c!=""){c.css("display","none")}b.css("display","none");e.totalSlides++});if(d.randomStart){d.startSlide=Math.floor(Math.random()*e.totalSlides)}if(d.startSlide>0){if(d.startSlide>=e.totalSlides)d.startSlide=e.totalSlides-1;e.currentSlide=d.startSlide}if(a(g[e.currentSlide]).is("img")){e.currentImage=a(g[e.currentSlide])}else{e.currentImage=a(g[e.currentSlide]).find("img:first")}if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');f.append(a('<div class="nivo-caption"><p></p></div>').css({display:"none",opacity:d.captionOpacity}));a(".nivo-caption",f).css("opacity",0);var h=function(b){var c=a(".nivo-caption",f);if(e.currentImage.attr("title")!=""&&e.currentImage.attr("title")!=undefined){var d=e.currentImage.attr("title");if(d.substr(0,1)=="#")d=a(d).html();if(c.css("opacity")!=0){c.find("p").stop().fadeTo(b.animSpeed,0,function(){a(this).html(d);a(this).stop().fadeTo(b.animSpeed,1)})}else{c.find("p").html(d)}c.stop().fadeTo(b.animSpeed,b.captionOpacity)}else{c.stop().fadeTo(b.animSpeed,0)}};h(d);var i=0;if(!d.manualAdvance&&g.length>1){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}if(d.directionNav){f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+d.prevText+'</a><a class="nivo-nextNav">'+d.nextText+"</a></div>");if(d.directionNavHide){a(".nivo-directionNav",f).hide();f.hover(function(){a(".nivo-directionNav",f).show()},function(){a(".nivo-directionNav",f).hide()})}a("a.nivo-prevNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")});a("a.nivo-nextNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")})}if(d.controlNav){var j=a('<div class="nivo-controlNav"></div>');f.append(j);for(var k=0;k<g.length;k++){if(d.controlNavThumbs){var l=g.eq(k);if(!l.is("img")){l=l.find("img:first")}if(d.controlNavThumbsFromRel){j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("rel")+'" alt="" /></a>')}else{j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("src").replace(d.controlNavThumbsSearch,d.controlNavThumbsReplace)+'" alt="" /></a>')}}else{j.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>")}}a(".nivo-controlNav a:eq("+e.currentSlide+")",f).addClass("active");a(".nivo-controlNav a",f).live("click",function(){if(e.running)return false;if(a(this).hasClass("active"))return false;clearInterval(i);i="";f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');e.currentSlide=a(this).attr("rel")-1;o(f,g,d,"control")})}if(d.keyboardNav){a(window).keypress(function(a){if(a.keyCode=="37"){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")}if(a.keyCode=="39"){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")}})}if(d.pauseOnHover){f.hover(function(){e.paused=true;clearInterval(i);i=""},function(){e.paused=false;if(i==""&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}})}f.bind("nivo:animFinished",function(){e.running=false;a(g).each(function(){if(a(this).is("a")){a(this).css("display","none")}});if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}if(i==""&&!e.paused&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}d.afterChange.call(this)});var m=function(b,c,d){for(var e=0;e<c.slices;e++){var f=Math.round(b.width()/c.slices);if(e==c.slices-1){b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:b.width()-f*e+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}else{b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:f+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}}};var n=function(b,c,d){var e=Math.round(b.width()/c.boxCols);var f=Math.round(b.height()/c.boxRows);for(var g=0;g<c.boxRows;g++){for(var h=0;h<c.boxCols;h++){if(h==c.boxCols-1){b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:b.width()-e*h+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}else{b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:e+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}}}};var o=function(b,c,d,e){var f=b.data("nivo:vars");if(f&&f.currentSlide==f.totalSlides-1){d.lastSlide.call(this)}if((!f||f.stop)&&!e)return false;d.beforeChange.call(this);if(!e){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}else{if(e=="prev"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}if(e=="next"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}}f.currentSlide++;if(f.currentSlide==f.totalSlides){f.currentSlide=0;d.slideshowEnd.call(this)}if(f.currentSlide<0)f.currentSlide=f.totalSlides-1;if(a(c[f.currentSlide]).is("img")){f.currentImage=a(c[f.currentSlide])}else{f.currentImage=a(c[f.currentSlide]).find("img:first")}if(d.controlNav){a(".nivo-controlNav a",b).removeClass("active");a(".nivo-controlNav a:eq("+f.currentSlide+")",b).addClass("active")}h(d);a(".nivo-slice",b).remove();a(".nivo-box",b).remove();var g=d.effect;if(d.effect=="random"){var i=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");g=i[Math.floor(Math.random()*(i.length+1))];if(g==undefined)g="fade"}if(d.effect.indexOf(",")!=-1){var i=d.effect.split(",");g=i[Math.floor(Math.random()*i.length)];if(g==undefined)g="fade"}if(f.currentImage.attr("data-transition")){g=f.currentImage.attr("data-transition")}f.running=true;if(g=="sliceDown"||g=="sliceDownRight"||g=="sliceDownLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({top:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUp"||g=="sliceUpRight"||g=="sliceUpLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceUpLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({bottom:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUpDown"||g=="sliceUpDownRight"||g=="sliceUpDownLeft"){m(b,d,f);var j=0;var k=0;var o=0;var l=a(".nivo-slice",b);if(g=="sliceUpDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);if(k==0){c.css("top","0px");k++}else{c.css("bottom","0px");k=0}if(o==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;o++})}else if(g=="fold"){m(b,d,f);var j=0;var k=0;a(".nivo-slice",b).each(function(){var c=a(this);var e=c.width();c.css({top:"0px",height:"100%",width:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="fade"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:b.width()+"px"});q.animate({opacity:"1.0"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInRight"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInLeft"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}else if(g=="boxRandom"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var s=p(a(".nivo-box",b));s.each(function(){var c=a(this);if(k==r-1){setTimeout(function(){c.animate({opacity:"1"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({opacity:"1"},d.animSpeed)},100+j)}j+=20;k++})}else if(g=="boxRain"||g=="boxRainReverse"||g=="boxRainGrow"||g=="boxRainGrowReverse"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var t=0;var u=0;var v=new Array;v[t]=new Array;var s=a(".nivo-box",b);if(g=="boxRainReverse"||g=="boxRainGrowReverse"){s=a(".nivo-box",b)._reverse()}s.each(function(){v[t][u]=a(this);u++;if(u==d.boxCols){t++;u=0;v[t]=new Array}});for(var w=0;w<d.boxCols*2;w++){var x=w;for(var y=0;y<d.boxRows;y++){if(x>=0&&x<d.boxCols){(function(c,e,f,h,i){var j=a(v[c][e]);var k=j.width();var l=j.height();if(g=="boxRainGrow"||g=="boxRainGrowReverse"){j.width(0).height(0)}if(h==i-1){setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3,"",function(){b.trigger("nivo:animFinished")})},100+f)}else{setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3)},100+f)}})(y,x,j,k,r);k++}x--}j+=100}}};var p=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a};var q=function(a){if(this.console&&typeof console.log!="undefined")console.log(a)};this.stop=function(){if(!a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=true;q("Stop Slider")}};this.start=function(){if(a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=false;q("Start Slider")}};d.afterLoad.call(this);return this};a.fn.nivoSlider=function(c){return this.each(function(d,e){var f=a(this);if(f.data("nivoslider"))return f.data("nivoslider");var g=new b(this,c);f.data("nivoslider",g)})};a.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:".jpg",controlNavThumbsReplace:"_thumb.jpg",keyboardNav:true,pauseOnHover:true,manualAdvance:false,captionOpacity:.8,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery)


/*===============================
/plugins/system/t3/base-bs3/js/nav-collapse.js
================================================================================*/;
jQuery(document).ready(function($){$('.t3-navbar').each(function(){var $navwrapper=$(this),$menu=null,$placeholder=null;if($navwrapper.find('.t3-megamenu').length){$menu=$navwrapper.find('ul.level0').clone(),$placeholder=$navwrapper.prev('.navbar-collapse');if(!$placeholder.length){$placeholder=$navwrapper.closest('.container, .t3-mainnav').find('.navbar-collapse:empty');}
var lis=$menu.find('li[data-id]'),liactive=lis.filter('.current');lis.removeClass('mega dropdown mega-align-left mega-align-right mega-align-center mega-align-adjust');lis.each(function(){var $li=$(this),$child=$li.find('>:first-child');if($child[0].nodeName=='DIV'){$child.find('>:first-child').prependTo($li);$child.remove();}
if($li.data('hidewcol')){$child.find('.caret').remove();$child.nextAll().remove();return;}
var subul=$li.find('ul.level'+$li.data('level'));if(subul.length){$ul=$('<ul class="level'+$li.data('level')+' dropdown-menu">');subul.each(function(){if($(this).parents('.mega-col-nav').data('hidewcol'))return;$(this).find('>li').appendTo($ul);});if($ul.children().length){$ul.appendTo($li);}}
$li.find('>div').remove();if(!$li.children('ul').length){$child.find('.caret').remove();}
var divider=$li.hasClass('divider');for(var x in $li.data()){$li.removeAttr('data-'+x)}
$child.removeAttr('class');for(var x in $child.data()){$child.removeAttr('data-'+x)}
if(divider){$li.addClass('divider');}});liactive.addClass('current active');}else{$menu=$navwrapper.find('ul.nav').clone();$placeholder=$('.t3-navbar-collapse:empty, .navbar-collapse:empty').eq(0);}
$menu.find('a[data-toggle="dropdown"]').removeAttr('data-toggle').removeAttr('data-target');$menu.find('> li > ul.dropdown-menu').prev('a').attr('data-toggle','dropdown').attr('data-target','#').parent('li').addClass(function(){return'dropdown'+($(this).data('level')>1?' dropdown-submenu':'');});$menu.appendTo($placeholder);});});


/*===============================
/media/system/js/mootools-core.js
================================================================================*/;
(function(){this.MooTools={version:"1.4.5",build:"74e34796f5f76640cdb98853004650aea1499d69"};var b=this.typeOf=function(b){if(null==b)return"null";if(null!=b.$family)return b.$family();if(b.nodeName){if(1==b.nodeType)return"element";if(3==b.nodeType)return/\S/.test(b.nodeValue)?"textnode":"whitespace"}else if("number"==typeof b.length){if(b.callee)return"arguments";if("item"in b)return"collection"}return typeof b};this.instanceOf=function(b,a){if(null==b)return!1;for(var c=b.$constructor||b.constructor;c;){if(c===a)return!0;c=c.parent}return!b.hasOwnProperty?!1:b instanceof a};var a=this.Function,c=!0,d;for(d in{toString:1})c=null;c&&(c="hasOwnProperty,valueOf,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,constructor".split(","));a.prototype.overloadSetter=function(b){var a=this;return function(h,k){if(null==h)return this;if(b||"string"!=typeof h){for(var e in h)a.call(this,e,h[e]);if(c)for(var d=c.length;d--;)e=c[d],h.hasOwnProperty(e)&&a.call(this,e,h[e])}else a.call(this,h,k);return this}};a.prototype.overloadGetter=function(b){var a=this;return function(c){var h,k;"string"!=typeof c?h=c:1<arguments.length?h=arguments:b&&(h=[c]);if(h){k={};for(var e=0;e<h.length;e++)k[h[e]]=a.call(this,h[e])}else k=a.call(this,c);return k}};a.prototype.extend=function(b,a){this[b]=a}.overloadSetter();a.prototype.implement=function(b,a){this.prototype[b]=a}.overloadSetter();var e=Array.prototype.slice;a.from=function(a){return"function"==b(a)?a:function(){return a}};Array.from=function(a){return null==a?[]:f.isEnumerable(a)&&"string"!=typeof a?"array"==b(a)?a:e.call(a):[a]};Number.from=function(b){b=parseFloat(b);return isFinite(b)?b:null};String.from=function(b){return b+""};a.implement({hide:function(){this.$hidden=!0;return this},protect:function(){this.$protected=!0;return this}});var f=this.Type=function(a,c){if(a){var h=a.toLowerCase();f["is"+a]=function(a){return b(a)==h};null!=c&&(c.prototype.$family=function(){return h}.hide())}if(null==c)return null;c.extend(this);c.$constructor=f;return c.prototype.$constructor=c},g=Object.prototype.toString;f.isEnumerable=function(b){return null!=b&&"number"==typeof b.length&&"[object Function]"!=g.call(b)};var i={},j=function(a){a=b(a.prototype);return i[a]||(i[a]=[])},m=function(a,c){if(!c||!c.$hidden){for(var k=j(this),d=0;d<k.length;d++){var o=k[d];"type"==b(o)?m.call(o,a,c):o.call(this,a,c)}k=this.prototype[a];if(null==k||!k.$protected)this.prototype[a]=c;null==this[a]&&"function"==b(c)&&h.call(this,a,function(b){return c.apply(b,e.call(arguments,1))})}},h=function(b,a){if(!a||!a.$hidden){var c=this[b];if(null==c||!c.$protected)this[b]=a}};f.implement({implement:m.overloadSetter(),extend:h.overloadSetter(),alias:function(b,a){m.call(this,b,this.prototype[a])}.overloadSetter(),mirror:function(b){j(this).push(b);return this}});new f("Type",f);var k=function(b,a,c){var h=a!=Object,e=a.prototype;h&&(a=new f(b,a));for(var b=0,d=c.length;b<d;b++){var o=c[b],q=a[o],g=e[o];q&&q.protect();h&&g&&a.implement(o,g.protect())}if(h){var j=e.propertyIsEnumerable(c[0]);a.forEachMethod=function(b){if(!j)for(var a=0,h=c.length;a<h;a++)b.call(e,e[c[a]],c[a]);for(var k in e)b.call(e,e[k],k)}}return k};k("String",String,"charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice,split,substr,substring,trim,toLowerCase,toUpperCase".split(","))("Array",Array,"pop,push,reverse,shift,sort,splice,unshift,concat,join,slice,indexOf,lastIndexOf,filter,forEach,every,map,some,reduce,reduceRight".split(","))("Number",Number,["toExponential","toFixed","toLocaleString","toPrecision"])("Function",a,["apply","call","bind"])("RegExp",RegExp,["exec","test"])("Object",Object,"create,defineProperty,defineProperties,keys,getPrototypeOf,getOwnPropertyDescriptor,getOwnPropertyNames,preventExtensions,isExtensible,seal,isSealed,freeze,isFrozen".split(","))("Date",Date,["now"]);Object.extend=h.overloadSetter();Date.extend("now",function(){return+new Date});new f("Boolean",Boolean);Number.prototype.$family=function(){return isFinite(this)?"number":"null"}.hide();Number.extend("random",function(b,a){return Math.floor(Math.random()*(a-b+1)+b)});var o=Object.prototype.hasOwnProperty;Object.extend("forEach",function(b,a,c){for(var h in b)o.call(b,h)&&a.call(c,b[h],h,b)});Object.each=Object.forEach;Array.implement({forEach:function(b,a){for(var c=0,h=this.length;c<h;c++)c in this&&b.call(a,this[c],c,this)},each:function(b,a){Array.forEach(this,b,a);return this}});var q=function(a){switch(b(a)){case"array":return a.clone();case"object":return Object.clone(a);default:return a}};Array.implement("clone",function(){for(var b=this.length,a=Array(b);b--;)a[b]=q(this[b]);return a});var u=function(a,c,h){switch(b(h)){case"object":"object"==b(a[c])?Object.merge(a[c],h):a[c]=Object.clone(h);break;case"array":a[c]=h.clone();break;default:a[c]=h}return a};Object.extend({merge:function(a,c,h){if("string"==b(c))return u(a,c,h);for(var k=1,e=arguments.length;k<e;k++){var d=arguments[k],o;for(o in d)u(a,o,d[o])}return a},clone:function(b){var a={},c;for(c in b)a[c]=q(b[c]);return a},append:function(b){for(var a=1,c=arguments.length;a<c;a++){var h=arguments[a]||{},k;for(k in h)b[k]=h[k]}return b}});["Object","WhiteSpace","TextNode","Collection","Arguments"].each(function(b){new f(b)});var r=Date.now();String.extend("uniqueID",function(){return(r++).toString(36)})})();Array.implement({every:function(b,a){for(var c=0,d=this.length>>>0;c<d;c++)if(c in this&&!b.call(a,this[c],c,this))return!1;return!0},filter:function(b,a){for(var c=[],d,e=0,f=this.length>>>0;e<f;e++)e in this&&(d=this[e],b.call(a,d,e,this)&&c.push(d));return c},indexOf:function(b,a){for(var c=this.length>>>0,d=0>a?Math.max(0,c+a):a||0;d<c;d++)if(this[d]===b)return d;return-1},map:function(b,a){for(var c=this.length>>>0,d=Array(c),e=0;e<c;e++)e in this&&(d[e]=b.call(a,this[e],e,this));return d},some:function(b,a){for(var c=0,d=this.length>>>0;c<d;c++)if(c in this&&b.call(a,this[c],c,this))return!0;return!1},clean:function(){return this.filter(function(b){return null!=b})},invoke:function(b){var a=Array.slice(arguments,1);return this.map(function(c){return c[b].apply(c,a)})},associate:function(b){for(var a={},c=Math.min(this.length,b.length),d=0;d<c;d++)a[b[d]]=this[d];return a},link:function(b){for(var a={},c=0,d=this.length;c<d;c++)for(var e in b)if(b[e](this[c])){a[e]=this[c];delete b[e];break}return a},contains:function(b,a){return-1!=this.indexOf(b,a)},append:function(b){this.push.apply(this,b);return this},getLast:function(){return this.length?this[this.length-1]:null},getRandom:function(){return this.length?this[Number.random(0,this.length-1)]:null},include:function(b){this.contains(b)||this.push(b);return this},combine:function(b){for(var a=0,c=b.length;a<c;a++)this.include(b[a]);return this},erase:function(b){for(var a=this.length;a--;)this[a]===b&&this.splice(a,1);return this},empty:function(){this.length=0;return this},flatten:function(){for(var b=[],a=0,c=this.length;a<c;a++){var d=typeOf(this[a]);"null"!=d&&(b=b.concat("array"==d||"collection"==d||"arguments"==d||instanceOf(this[a],Array)?Array.flatten(this[a]):this[a]))}return b},pick:function(){for(var b=0,a=this.length;b<a;b++)if(null!=this[b])return this[b];return null},hexToRgb:function(b){if(3!=this.length)return null;var a=this.map(function(b){1==b.length&&(b+=b);return b.toInt(16)});return b?a:"rgb("+a+")"},rgbToHex:function(b){if(3>this.length)return null;if(4==this.length&&0==this[3]&&!b)return"transparent";for(var a=[],c=0;3>c;c++){var d=(this[c]-0).toString(16);a.push(1==d.length?"0"+d:d)}return b?a:"#"+a.join("")}});String.implement({test:function(b,a){return("regexp"==typeOf(b)?b:RegExp(""+b,a)).test(this)},contains:function(b,a){return a?-1<(a+this+a).indexOf(a+b+a):-1<(""+this).indexOf(b)},trim:function(){return(""+this).replace(/^\s+|\s+$/g,"")},clean:function(){return(""+this).replace(/\s+/g," ").trim()},camelCase:function(){return(""+this).replace(/-\D/g,function(b){return b.charAt(1).toUpperCase()})},hyphenate:function(){return(""+this).replace(/[A-Z]/g,function(b){return"-"+b.charAt(0).toLowerCase()})},capitalize:function(){return(""+this).replace(/\b[a-z]/g,function(b){return b.toUpperCase()})},escapeRegExp:function(){return(""+this).replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")},toInt:function(b){return parseInt(this,b||10)},toFloat:function(){return parseFloat(this)},hexToRgb:function(b){var a=(""+this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return a?a.slice(1).hexToRgb(b):null},rgbToHex:function(b){var a=(""+this).match(/\d{1,3}/g);return a?a.rgbToHex(b):null},substitute:function(b,a){return(""+
this).replace(a||/\\?\{([^{}]+)\}/g,function(a,d){return"\\"==a.charAt(0)?a.slice(1):null!=b[d]?b[d]:""})}});Number.implement({limit:function(b,a){return Math.min(a,Math.max(b,this))},round:function(b){b=Math.pow(10,b||0).toFixed(0>b?-b:0);return Math.round(this*b)/b},times:function(b,a){for(var c=0;c<this;c++)b.call(a,c,this)},toFloat:function(){return parseFloat(this)},toInt:function(b){return parseInt(this,b||10)}});Number.alias("each","times");(function(b){var a={};b.each(function(b){Number[b]||(a[b]=function(){return Math[b].apply(null,[this].concat(Array.from(arguments)))})});Number.implement(a)})("abs,acos,asin,atan,atan2,ceil,cos,exp,floor,log,max,min,pow,sin,sqrt,tan".split(","));Function.extend({attempt:function(){for(var b=0,a=arguments.length;b<a;b++)try{return arguments[b]()}catch(c){}return null}});Function.implement({attempt:function(b,a){try{return this.apply(a,Array.from(b))}catch(c){}return null},bind:function(b){var a=this,c=1<arguments.length?Array.slice(arguments,1):null,d=function(){},e=function(){var f=b,g=arguments.length;this instanceof e&&(d.prototype=a.prototype,f=new d);g=!c&&!g?a.call(f):a.apply(f,c&&g?c.concat(Array.slice(arguments)):c||arguments);return f==b?g:f};return e},pass:function(b,a){var c=this;null!=b&&(b=Array.from(b));return function(){return c.apply(a,b||arguments)}},delay:function(b,a,c){return setTimeout(this.pass(null==c?[]:c,a),b)},periodical:function(b,a,c){return setInterval(this.pass(null==c?[]:c,a),b)}});(function(){var b=Object.prototype.hasOwnProperty;Object.extend({subset:function(b,c){for(var d={},e=0,f=c.length;e<f;e++){var g=c[e];g in b&&(d[g]=b[g])}return d},map:function(a,c,d){var e={},f;for(f in a)b.call(a,f)&&(e[f]=c.call(d,a[f],f,a));return e},filter:function(a,c,d){var e={},f;for(f in a){var g=a[f];b.call(a,f)&&c.call(d,g,f,a)&&(e[f]=g)}return e},every:function(a,c,d){for(var e in a)if(b.call(a,e)&&!c.call(d,a[e],e))return!1;return!0},some:function(a,c,d){for(var e in a)if(b.call(a,e)&&c.call(d,a[e],e))return!0;return!1},keys:function(a){var c=[],d;for(d in a)b.call(a,d)&&c.push(d);return c},values:function(a){var c=[],d;for(d in a)b.call(a,d)&&c.push(a[d]);return c},getLength:function(b){return Object.keys(b).length},keyOf:function(a,c){for(var d in a)if(b.call(a,d)&&a[d]===c)return d;return null},contains:function(b,c){return null!=Object.keyOf(b,c)},toQueryString:function(b,c){var d=[];Object.each(b,function(b,a){c&&(a=c+"["+a+"]");var g;switch(typeOf(b)){case"object":g=Object.toQueryString(b,a);break;case"array":var i={};b.each(function(b,a){i[a]=b});g=Object.toQueryString(i,a);break;default:g=a+"="+encodeURIComponent(b)}null!=b&&d.push(g)});return d.join("&")}})})();(function(){var b=this.document,a=b.window=this,c=navigator.userAgent.toLowerCase(),d=navigator.platform.toLowerCase(),e=c.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],f=this.Browser={extend:Function.prototype.extend,name:"version"==e[1]?e[3]:e[1],version:"ie"==e[1]&&b.documentMode||parseFloat("opera"==e[1]&&e[4]?e[4]:e[2]),Platform:{name:c.match(/ip(?:ad|od|hone)/)?"ios":(c.match(/(?:webos|android)/)||d.match(/mac|win|linux/)||["other"])[0]},Features:{xpath:!!b.evaluate,air:!!a.runtime,query:!!b.querySelector,json:!!a.JSON},Plugins:{}};f[f.name]=!0;f[f.name+parseInt(f.version,10)]=!0;f.Platform[f.Platform.name]=!0;f.Request=function(){var b=function(){return new XMLHttpRequest},a=function(){return new ActiveXObject("MSXML2.XMLHTTP")},c=function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Function.attempt(function(){b();return b},function(){a();return a},function(){c();return c})}();f.Features.xhr=!!f.Request;c=(Function.attempt(function(){return navigator.plugins["Shockwave Flash"].description},function(){return(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")})||"0 r0").match(/\d+/g);f.Plugins.Flash={version:Number(c[0]||"0."+c[1])||0,build:Number(c[2])||0};f.exec=function(c){if(!c)return c;if(a.execScript)a.execScript(c);else{var h=b.createElement("script");h.setAttribute("type","text/javascript");h.text=c;b.head.appendChild(h);b.head.removeChild(h)}return c};String.implement("stripScripts",function(b){var a="",c=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(b,c){a+=c+"\n";return""});!0===b?f.exec(a):"function"==typeOf(b)&&b(a,c);return c});f.extend({Document:this.Document,Window:this.Window,Element:this.Element,Event:this.Event});this.Window=this.$constructor=new Type("Window",function(){});this.$family=Function.from("window").hide();Window.mirror(function(b,c){a[b]=c});this.Document=b.$constructor=new Type("Document",function(){});b.$family=Function.from("document").hide();Document.mirror(function(a,c){b[a]=c});b.html=b.documentElement;b.head||(b.head=b.getElementsByTagName("head")[0]);if(b.execCommand)try{b.execCommand("BackgroundImageCache",!1,!0)}catch(g){}if(this.attachEvent&&!this.addEventListener){var i=function(){this.detachEvent("onunload",i);b.head=b.html=b.window=null};this.attachEvent("onunload",i)}var j=Array.from;try{j(b.html.childNodes)}catch(m){Array.from=function(b){if(typeof b!="string"&&Type.isEnumerable(b)&&typeOf(b)!="array"){for(var a=b.length,c=Array(a);a--;)c[a]=b[a];return c}return j(b)};var h=Array.prototype,k=h.slice;"pop,push,reverse,shift,sort,splice,unshift,concat,join,slice".split(",").each(function(b){var a=h[b];Array[b]=function(b){return a.apply(Array.from(b),k.call(arguments,1))}})}})();(function(){var b={},a=this.DOMEvent=new Type("DOMEvent",function(a,d){d||(d=window);a=a||d.event;if(a.$extended)return a;this.event=a;this.$extended=!0;this.shift=a.shiftKey;this.control=a.ctrlKey;this.alt=a.altKey;this.meta=a.metaKey;for(var e=this.type=a.type,f=a.target||a.srcElement;f&&3==f.nodeType;)f=f.parentNode;this.target=document.id(f);if(0==e.indexOf("key")){if(f=this.code=a.which||a.keyCode,this.key=b[f],"keydown"==e&&(111<f&&124>f?this.key="f"+(f-111):95<f&&106>f&&(this.key=f-96)),null==this.key)this.key=String.fromCharCode(f).toLowerCase()}else if("click"==e||"dblclick"==e||"contextmenu"==e||"DOMMouseScroll"==e||0==e.indexOf("mouse")){f=d.document;f=!f.compatMode||"CSS1Compat"==f.compatMode?f.html:f.body;this.page={x:null!=a.pageX?a.pageX:a.clientX+f.scrollLeft,y:null!=a.pageY?a.pageY:a.clientY+f.scrollTop};this.client={x:null!=a.pageX?a.pageX-d.pageXOffset:a.clientX,y:null!=a.pageY?a.pageY-d.pageYOffset:a.clientY};if("DOMMouseScroll"==e||"mousewheel"==e)this.wheel=a.wheelDelta?a.wheelDelta/120:-(a.detail||0)/3;this.rightClick=3==a.which||2==a.button;if("mouseover"==e||"mouseout"==e){for(e=a.relatedTarget||a[("mouseover"==e?"from":"to")+"Element"];e&&3==e.nodeType;)e=e.parentNode;this.relatedTarget=document.id(e)}}else if(0==e.indexOf("touch")||0==e.indexOf("gesture"))if(this.rotation=a.rotation,this.scale=a.scale,this.targetTouches=a.targetTouches,this.changedTouches=a.changedTouches,(e=this.touches=a.touches)&&e[0])e=e[0],this.page={x:e.pageX,y:e.pageY},this.client={x:e.clientX,y:e.clientY};this.client||(this.client={});this.page||(this.page={})});a.implement({stop:function(){return this.preventDefault().stopPropagation()},stopPropagation:function(){this.event.stopPropagation?this.event.stopPropagation():this.event.cancelBubble=!0;return this},preventDefault:function(){this.event.preventDefault?this.event.preventDefault():this.event.returnValue=!1;return this}});a.defineKey=function(a,d){b[a]=d;return this};a.defineKeys=a.defineKey.overloadSetter(!0);a.defineKeys({38:"up",40:"down",37:"left",39:"right",27:"esc",32:"space",8:"backspace",9:"tab",46:"delete",13:"enter"})})();(function(){var b=this.Class=new Type("Class",function(e){instanceOf(e,Function)&&(e={initialize:e});var d=function(){c(this);if(d.$prototyping)return this;this.$caller=null;var a=this.initialize?this.initialize.apply(this,arguments):this;this.$caller=this.caller=null;return a}.extend(this).implement(e);d.$constructor=b;d.prototype.$constructor=d;d.prototype.parent=a;return d}),a=function(){if(!this.$caller)throw Error('The method "parent" cannot be called.');var a=this.$caller.$name,b=this.$caller.$owner.parent,b=b?b.prototype[a]:null;if(!b)throw Error('The method "'+a+'" has no parent.');return b.apply(this,arguments)},c=function(a){for(var b in a){var e=a[b];switch(typeOf(e)){case"object":var d=function(){};d.prototype=e;a[b]=c(new d);break;case"array":a[b]=e.clone()}}return a},d=function(a,b,c){c.$origin&&(c=c.$origin);var e=function(){if(c.$protected&&this.$caller==null)throw Error('The method "'+b+'" cannot be called.');var a=this.caller,h=this.$caller;this.caller=h;this.$caller=e;var k=c.apply(this,arguments);this.$caller=h;this.caller=a;return k}.extend({$owner:a,$origin:c,$name:b});return e},e=function(a,c,e){if(b.Mutators.hasOwnProperty(a)&&(c=b.Mutators[a].call(this,c),null==c))return this;if("function"==typeOf(c)){if(c.$hidden)return this;this.prototype[a]=e?c:d(this,a,c)}else Object.merge(this.prototype,a,c);return this};b.implement("implement",e.overloadSetter());b.Mutators={Extends:function(a){this.parent=a;a.$prototyping=!0;var b=new a;delete a.$prototyping;this.prototype=b},Implements:function(a){Array.from(a).each(function(a){var a=new a,b;for(b in a)e.call(this,b,a[b],!0)},this)}}})();(function(){this.Chain=new Class({$chain:[],chain:function(){this.$chain.append(Array.flatten(arguments));return this},callChain:function(){return this.$chain.length?this.$chain.shift().apply(this,arguments):!1},clearChain:function(){this.$chain.empty();return this}});var b=function(a){return a.replace(/^on([A-Z])/,function(a,b){return b.toLowerCase()})};this.Events=new Class({$events:{},addEvent:function(a,c,d){a=b(a);this.$events[a]=(this.$events[a]||[]).include(c);d&&(c.internal=!0);return this},addEvents:function(a){for(var b in a)this.addEvent(b,a[b]);return this},fireEvent:function(a,c,d){a=b(a);a=this.$events[a];if(!a)return this;c=Array.from(c);a.each(function(a){d?a.delay(d,this,c):a.apply(this,c)},this);return this},removeEvent:function(a,c){var a=b(a),d=this.$events[a];if(d&&!c.internal){var e=d.indexOf(c);-1!=e&&delete d[e]}return this},removeEvents:function(a){var c;if("object"==typeOf(a)){for(c in a)this.removeEvent(c,a[c]);return this}a&&(a=b(a));for(c in this.$events)if(!(a&&a!=c))for(var d=this.$events[c],e=d.length;e--;)e in d&&this.removeEvent(c,d[e]);return this}});this.Options=new Class({setOptions:function(){var a=this.options=Object.merge.apply(null,[{},this.options].append(arguments));if(this.addEvent)for(var b in a)"function"==typeOf(a[b])&&/^on[A-Z]/.test(b)&&(this.addEvent(b,a[b]),delete a[b]);return this}})})();(function(){function b(b,h,o,l,f,q,j,g,x,F,t,B,A,D,v,z){if(h||-1===c)if(a.expressions[++c]=[],d=-1,h)return"";if(o||l||-1===d)o=o||" ",b=a.expressions[c],e&&b[d]&&(b[d].reverseCombinator=m(o)),b[++d]={combinator:o,tag:"*"};o=a.expressions[c][d];if(f)o.tag=f.replace(i,"");else if(q)o.id=q.replace(i,"");else if(j)j=j.replace(i,""),o.classList||(o.classList=[]),o.classes||(o.classes=[]),o.classList.push(j),o.classes.push({value:j,regexp:RegExp("(^|\\s)"+k(j)+"(\\s|$)")});else if(A)z=(z=z||v)?z.replace(i,""):null,o.pseudos||(o.pseudos=[]),o.pseudos.push({key:A.replace(i,""),value:z,type:1==B.length?"class":"element"});else if(g){var g=g.replace(i,""),t=(t||"").replace(i,""),y,E;switch(x){case"^=":E=RegExp("^"+k(t));break;case"$=":E=RegExp(k(t)+"$");break;case"~=":E=RegExp("(^|\\s)"+k(t)+"(\\s|$)");break;case"|=":E=RegExp("^"+k(t)+"(-|$)");break;case"=":y=function(a){return t==a};break;case"*=":y=function(a){return a&&-1<a.indexOf(t)};break;case"!=":y=function(a){return t!=a};break;default:y=function(a){return!!a}}""==t&&/^[*$^]=$/.test(x)&&(y=function(){return!1});y||(y=function(a){return a&&E.test(a)});o.attributes||(o.attributes=[]);o.attributes.push({key:g,operator:x,value:t,test:y})}return""}var a,c,d,e,f={},g={},i=/\\/g,j=function(k,d){if(null==k)return null;if(!0===k.Slick)return k;var k=(""+k).replace(/^\s+|\s+$/g,""),q=(e=!!d)?g:f;if(q[k])return q[k];a={Slick:!0,expressions:[],raw:k,reverse:function(){return j(this.raw,!0)}};for(c=-1;k!=(k=k.replace(o,b)););a.length=a.expressions.length;return q[a.raw]=e?h(a):a},m=function(a){return"!"===a?" ":" "===a?"!":/^!/.test(a)?a.replace(/^!/,""):"!"+a},h=function(a){for(var b=a.expressions,c=0;c<b.length;c++){for(var h=b[c],k={parts:[],tag:"*",combinator:m(h[0].combinator)},e=0;e<h.length;e++){var d=h[e];d.reverseCombinator||(d.reverseCombinator=" ");d.combinator=d.reverseCombinator;delete d.reverseCombinator}h.reverse().push(k)}return a},k=function(a){return a.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,function(a){return"\\"+a})},o=RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/,"["+k(">+~`!@$%^&={}\\;</")+"]").replace(/<unicode>/g,"(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g,"(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")),q=this.Slick||{};q.parse=function(a){return j(a)};q.escapeRegExp=k;this.Slick||(this.Slick=q)}).apply("undefined"!=typeof exports?exports:this);(function(){var b={},a={},c=Object.prototype.toString;b.isNativeCode=function(a){return/\{\s*\[native code\]\s*\}/.test(""+a)};b.isXML=function(a){return!!a.xmlVersion||!!a.xml||"[object XMLDocument]"==c.call(a)||9==a.nodeType&&"HTML"!=a.documentElement.nodeName};b.setDocument=function(b){var c=b.nodeType;if(9!=c)if(c)b=b.ownerDocument;else if(b.navigator)b=b.document;else return;if(this.document!==b){this.document=b;var c=b.documentElement,e=this.getUIDXML(c),d=a[e],f;if(!d){d=a[e]={};d.root=c;d.isXMLDocument=this.isXML(b);d.brokenStarGEBTN=d.starSelectsClosedQSA=d.idGetsName=d.brokenMixedCaseQSA=d.brokenGEBCN=d.brokenCheckedQSA=d.brokenEmptyAttributeQSA=d.isHTMLDocument=d.nativeMatchesSelector=!1;var j,m,l,s,g,n=b.createElement("div"),i=b.body||b.getElementsByTagName("body")[0]||c;i.appendChild(n);try{n.innerHTML='<a id="slick_uniqueid"></a>',d.isHTMLDocument=!!b.getElementById("slick_uniqueid")}catch(x){}if(d.isHTMLDocument){n.style.display="none";n.appendChild(b.createComment(""));e=1<n.getElementsByTagName("*").length;try{n.innerHTML="foo</foo>",j=(g=n.getElementsByTagName("*"))&&!!g.length&&"/"==g[0].nodeName.charAt(0)}catch(F){}d.brokenStarGEBTN=e||j;try{n.innerHTML='<a name="slick_uniqueid"></a><b id="slick_uniqueid"></b>',d.idGetsName=b.getElementById("slick_uniqueid")===n.firstChild}catch(t){}if(n.getElementsByClassName){try{n.innerHTML='<a class="f"></a><a class="b"></a>',n.getElementsByClassName("b").length,n.firstChild.className="b",l=2!=n.getElementsByClassName("b").length}catch(B){}try{n.innerHTML='<a class="a"></a><a class="f b a"></a>',m=2!=n.getElementsByClassName("a").length}catch(A){}d.brokenGEBCN=l||m}if(n.querySelectorAll){try{n.innerHTML="foo</foo>",g=n.querySelectorAll("*"),d.starSelectsClosedQSA=g&&!!g.length&&"/"==g[0].nodeName.charAt(0)}catch(D){}try{n.innerHTML='<a class="MiX"></a>',d.brokenMixedCaseQSA=!n.querySelectorAll(".MiX").length}catch(v){}try{n.innerHTML='<select><option selected="selected">a</option></select>',d.brokenCheckedQSA=0==n.querySelectorAll(":checked").length}catch(z){}try{n.innerHTML='<a class=""></a>',d.brokenEmptyAttributeQSA=0!=n.querySelectorAll('[class*=""]').length}catch(y){}}try{n.innerHTML='<form action="s"><input id="action"/></form>',s="s"!=n.firstChild.getAttribute("action")}catch(E){}d.nativeMatchesSelector=c.matchesSelector||c.mozMatchesSelector||c.webkitMatchesSelector;if(d.nativeMatchesSelector)try{d.nativeMatchesSelector.call(c,":slick"),d.nativeMatchesSelector=null}catch(G){}}try{c.slick_expando=1,delete c.slick_expando,d.getUID=this.getUIDHTML}catch(H){d.getUID=this.getUIDXML}i.removeChild(n);n=g=i=null;d.getAttribute=d.isHTMLDocument&&s?function(a,b){var c=this.attributeGetters[b];return c?c.call(a):(c=a.getAttributeNode(b))?c.nodeValue:null}:function(a,b){var c=this.attributeGetters[b];return c?c.call(a):a.getAttribute(b)};d.hasAttribute=c&&this.isNativeCode(c.hasAttribute)?function(a,b){return a.hasAttribute(b)}:function(a,b){a=a.getAttributeNode(b);return!(!a||!a.specified&&!a.nodeValue)};j=c&&this.isNativeCode(c.contains);m=b&&this.isNativeCode(b.contains);d.contains=j&&m?function(a,b){return a.contains(b)}:j&&!m?function(a,c){return a===c||(a===b?b.documentElement:a).contains(c)}:c&&c.compareDocumentPosition?function(a,b){return a===b||!!(a.compareDocumentPosition(b)&16)}:function(a,b){if(b){do if(b===a)return!0;while(b=b.parentNode)}return!1};d.documentSorter=c.compareDocumentPosition?function(a,b){return!a.compareDocumentPosition||!b.compareDocumentPosition?0:a.compareDocumentPosition(b)&4?-1:a===b?0:1}:"sourceIndex"in c?function(a,b){return!a.sourceIndex||!b.sourceIndex?0:a.sourceIndex-b.sourceIndex}:b.createRange?function(a,b){if(!a.ownerDocument||!b.ownerDocument)return 0;var c=a.ownerDocument.createRange(),h=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);h.setStart(b,0);h.setEnd(b,0);return c.compareBoundaryPoints(Range.START_TO_END,h)}:null;c=null}for(f in d)this[f]=d[f]}};var d=/^([#.]?)((?:[\w-]+|\*))$/,e=/\[.+[*$^]=(?:""|'')?\]/,f={};b.search=function(a,b,c,j){var g=this.found=j?null:c||[];if(a)if(a.navigator)a=a.document;else{if(!a.nodeType)return g}else return g;var r,i,l=this.uniques={},c=!(!c||!c.length),s=9==a.nodeType;this.document!==(s?a:a.ownerDocument)&&this.setDocument(a);if(c)for(i=g.length;i--;)l[this.getUID(g[i])]=!0;if("string"==typeof b){var p=b.match(d);a:if(p){i=p[1];var n=p[2];if(i)if("#"==i){if(!this.isHTMLDocument||!s)break a;p=a.getElementById(n);if(!p)return g;if(this.idGetsName&&p.getAttributeNode("id").nodeValue!=n)break a;if(j)return p||null;(!c||!l[this.getUID(p)])&&g.push(p)}else{if("."==i){if(!this.isHTMLDocument||(!a.getElementsByClassName||this.brokenGEBCN)&&a.querySelectorAll)break a;if(a.getElementsByClassName&&!this.brokenGEBCN){r=a.getElementsByClassName(n);if(j)return r[0]||null;for(i=0;p=r[i++];)(!c||!l[this.getUID(p)])&&g.push(p)}else{var C=RegExp("(^|\\s)"+m.escapeRegExp(n)+"(\\s|$)");r=a.getElementsByTagName("*");for(i=0;p=r[i++];)if((className=p.className)&&C.test(className)){if(j)return p;(!c||!l[this.getUID(p)])&&g.push(p)}}}}else{if("*"==n&&this.brokenStarGEBTN)break a;r=a.getElementsByTagName(n);if(j)return r[0]||null;for(i=0;p=r[i++];)(!c||!l[this.getUID(p)])&&g.push(p)}c&&this.sort(g);return j?null:g}a:if(a.querySelectorAll&&this.isHTMLDocument&&!f[b]&&!this.brokenMixedCaseQSA&&!(this.brokenCheckedQSA&&-1<b.indexOf(":checked")||this.brokenEmptyAttributeQSA&&e.test(b)||!s&&-1<b.indexOf(",")||m.disableQSA)){i=b;p=a;if(!s){var x=p.getAttribute("id");p.setAttribute("id","slickid__");i="#slickid__ "+i;a=p.parentNode}try{if(j)return a.querySelector(i)||null;r=a.querySelectorAll(i)}catch(F){f[b]=1;break a}finally{s||(x?p.setAttribute("id",x):p.removeAttribute("id"),a=p)}if(this.starSelectsClosedQSA)for(i=0;p=r[i++];)"@"<p.nodeName&&(!c||!l[this.getUID(p)])&&g.push(p);else for(i=0;p=r[i++];)(!c||!l[this.getUID(p)])&&g.push(p);c&&this.sort(g);return g}r=this.Slick.parse(b);if(!r.length)return g}else{if(null==b)return g;if(b.Slick)r=b;else{if(this.contains(a.documentElement||a,b))g?g.push(b):g=b;return g}}this.posNTH={};this.posNTHLast={};this.posNTHType={};this.posNTHTypeLast={};this.push=!c&&(j||1==r.length&&1==r.expressions[0].length)?this.pushArray:this.pushUID;null==g&&(g=[]);var t,B,A,D,v,z,y=r.expressions;i=0;a:for(;z=y[i];i++)for(b=0;v=z[b];b++){x="combinator:"+v.combinator;if(!this[x])continue a;s=this.isXMLDocument?v.tag:v.tag.toUpperCase();p=v.id;n=v.classList;A=v.classes;D=v.attributes;v=v.pseudos;t=b===z.length-1;this.bitUniques={};t?(this.uniques=l,this.found=g):(this.uniques={},this.found=[]);if(0===b){if(this[x](a,s,p,A,D,v,n),j&&t&&g.length)break a}else if(j&&t){t=0;for(B=C.length;t<B;t++)if(this[x](C[t],s,p,A,D,v,n),g.length)break a}else{t=0;for(B=C.length;t<B;t++)this[x](C[t],s,p,A,D,v,n)}C=this.found}(c||1<r.expressions.length)&&this.sort(g);return j?g[0]||null:g};b.uidx=1;b.uidk="slick-uniqueid";b.getUIDXML=function(a){var b=a.getAttribute(this.uidk);b||(b=this.uidx++,a.setAttribute(this.uidk,b));return b};b.getUIDHTML=function(a){return a.uniqueNumber||(a.uniqueNumber=this.uidx++)};b.sort=function(a){if(!this.documentSorter)return a;a.sort(this.documentSorter);return a};b.cacheNTH={};b.matchNTH=/^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;b.parseNTHArgument=function(a){var b=a.match(this.matchNTH);if(!b)return!1;var c=b[2]||!1,d=b[1]||1;"-"==d&&(d=-1);b=+b[3]||0;b="n"==c?{a:d,b:b}:"odd"==c?{a:2,b:1}:"even"==c?{a:2,b:0}:{a:0,b:d};return this.cacheNTH[a]=b};b.createNTHPseudo=function(a,b,c,d){return function(e,f){var g=this.getUID(e);if(!this[c][g]){var l=e.parentNode;if(!l)return!1;var l=l[a],s=1;if(d){var j=e.nodeName;do l.nodeName==j&&(this[c][this.getUID(l)]=s++);while(l=l[b])}else{do 1==l.nodeType&&(this[c][this.getUID(l)]=s++);while(l=l[b])}}f=f||"n";s=this.cacheNTH[f]||this.parseNTHArgument(f);if(!s)return!1;l=s.a;s=s.b;g=this[c][g];if(0==l)return s==g;if(0<l){if(g<s)return!1}else if(s<g)return!1;return 0==(g-s)%l}};b.pushArray=function(a,b,c,d,e,f){this.matchSelector(a,b,c,d,e,f)&&this.found.push(a)};b.pushUID=function(a,b,c,d,e,f){var g=this.getUID(a);!this.uniques[g]&&this.matchSelector(a,b,c,d,e,f)&&(this.uniques[g]=!0,this.found.push(a))};b.matchNode=function(a,b){if(this.isHTMLDocument&&this.nativeMatchesSelector)try{return this.nativeMatchesSelector.call(a,b.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g,'[$1="$2"]'))}catch(c){}var d=this.Slick.parse(b);if(!d)return!0;var e=d.expressions,f=0,g;for(g=0;currentExpression=e[g];g++)if(1==currentExpression.length){var l=currentExpression[0];if(this.matchSelector(a,this.isXMLDocument?l.tag:l.tag.toUpperCase(),l.id,l.classes,l.attributes,l.pseudos))return!0;f++}if(f==d.length)return!1;d=this.search(this.document,d);for(g=0;e=d[g++];)if(e===a)return!0;return!1};b.matchPseudo=function(a,b,c){var d="pseudo:"+b;if(this[d])return this[d](a,c);a=this.getAttribute(a,b);return c?c==a:!!a};b.matchSelector=function(a,b,c,d,e,f){if(b){var g=this.isXMLDocument?a.nodeName:a.nodeName.toUpperCase();if("*"==b){if("@">g)return!1}else if(g!=b)return!1}if(c&&a.getAttribute("id")!=c)return!1;if(d)for(b=d.length;b--;)if(c=this.getAttribute(a,"class"),!c||!d[b].regexp.test(c))return!1;if(e)for(b=e.length;b--;)if(d=e[b],d.operator?!d.test(this.getAttribute(a,d.key)):!this.hasAttribute(a,d.key))return!1;if(f)for(b=f.length;b--;)if(d=f[b],!this.matchPseudo(a,d.key,d.value))return!1;return!0};var g={" ":function(a,b,c,d,e,f,g){var l;if(this.isHTMLDocument){if(c){l=this.document.getElementById(c);if(!l&&a.all||this.idGetsName&&l&&l.getAttributeNode("id").nodeValue!=c){g=a.all[c];if(!g)return;g[0]||(g=[g]);for(a=0;l=g[a++];){var s=l.getAttributeNode("id");if(s&&s.nodeValue==c){this.push(l,b,null,d,e,f);break}}return}if(l){if(this.document!==a&&!this.contains(a,l))return;this.push(l,b,null,d,e,f);return}if(this.contains(this.root,a))return}if(d&&a.getElementsByClassName&&!this.brokenGEBCN&&(g=a.getElementsByClassName(g.join(" ")))&&g.length){for(a=0;l=g[a++];)this.push(l,b,c,null,e,f);return}}if((g=a.getElementsByTagName(b))&&g.length){this.brokenStarGEBTN||(b=null);for(a=0;l=g[a++];)this.push(l,b,c,d,e,f)}},">":function(a,b,c,d,e,f){if(a=a.firstChild){do 1==a.nodeType&&this.push(a,b,c,d,e,f);while(a=a.nextSibling)}},"+":function(a,b,c,d,e,f){for(;a=a.nextSibling;)if(1==a.nodeType){this.push(a,b,c,d,e,f);break}},"^":function(a,b,c,d,e,f){if(a=a.firstChild)if(1==a.nodeType)this.push(a,b,c,d,e,f);else this["combinator:+"](a,b,c,d,e,f)},"~":function(a,b,c,d,e,f){for(;a=a.nextSibling;)if(1==a.nodeType){var g=this.getUID(a);if(this.bitUniques[g])break;this.bitUniques[g]=!0;this.push(a,b,c,d,e,f)}},"++":function(a,b,c,d,e,f){this["combinator:+"](a,b,c,d,e,f);this["combinator:!+"](a,b,c,d,e,f)},"~~":function(a,b,c,d,e,f){this["combinator:~"](a,b,c,d,e,f);this["combinator:!~"](a,b,c,d,e,f)},"!":function(a,b,c,d,e,f){for(;a=a.parentNode;)a!==this.document&&this.push(a,b,c,d,e,f)},"!>":function(a,b,c,d,e,f){a=a.parentNode;a!==this.document&&this.push(a,b,c,d,e,f)},"!+":function(a,b,c,d,e,f){for(;a=a.previousSibling;)if(1==a.nodeType){this.push(a,b,c,d,e,f);break}},"!^":function(a,b,c,d,e,f){if(a=a.lastChild)if(1==a.nodeType)this.push(a,b,c,d,e,f);else this["combinator:!+"](a,b,c,d,e,f)},"!~":function(a,b,c,d,e,f){for(;a=a.previousSibling;)if(1==a.nodeType){var g=this.getUID(a);if(this.bitUniques[g])break;this.bitUniques[g]=!0;this.push(a,b,c,d,e,f)}}},i;for(i in g)b["combinator:"+i]=g[i];var g={empty:function(a){var b=a.firstChild;return!(b&&1==b.nodeType)&&!(a.innerText||a.textContent||"").length},not:function(a,b){return!this.matchNode(a,b)},contains:function(a,b){return-1<(a.innerText||a.textContent||"").indexOf(b)},"first-child":function(a){for(;a=a.previousSibling;)if(1==a.nodeType)return!1;return!0},"last-child":function(a){for(;a=a.nextSibling;)if(1==a.nodeType)return!1;return!0},"only-child":function(a){for(var b=a;b=b.previousSibling;)if(1==b.nodeType)return!1;for(;a=a.nextSibling;)if(1==a.nodeType)return!1;return!0},"nth-child":b.createNTHPseudo("firstChild","nextSibling","posNTH"),"nth-last-child":b.createNTHPseudo("lastChild","previousSibling","posNTHLast"),"nth-of-type":b.createNTHPseudo("firstChild","nextSibling","posNTHType",!0),"nth-last-of-type":b.createNTHPseudo("lastChild","previousSibling","posNTHTypeLast",!0),index:function(a,b){return this["pseudo:nth-child"](a,""+(b+1))},even:function(a){return this["pseudo:nth-child"](a,"2n")},odd:function(a){return this["pseudo:nth-child"](a,"2n+1")},"first-of-type":function(a){for(var b=a.nodeName;a=a.previousSibling;)if(a.nodeName==b)return!1;return!0},"last-of-type":function(a){for(var b=a.nodeName;a=a.nextSibling;)if(a.nodeName==b)return!1;return!0},"only-of-type":function(a){for(var b=a,c=a.nodeName;b=b.previousSibling;)if(b.nodeName==c)return!1;for(;a=a.nextSibling;)if(a.nodeName==c)return!1;return!0},enabled:function(a){return!a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked||a.selected},focus:function(a){return this.isHTMLDocument&&this.document.activeElement===a&&(a.href||a.type||this.hasAttribute(a,"tabindex"))},root:function(a){return a===this.root},selected:function(a){return a.selected}},j;for(j in g)b["pseudo:"+j]=g[j];j=b.attributeGetters={"for":function(){return"htmlFor"in this?this.htmlFor:this.getAttribute("for")},href:function(){return"href"in this?this.getAttribute("href",2):this.getAttribute("href")},style:function(){return this.style?this.style.cssText:this.getAttribute("style")},tabindex:function(){var a=this.getAttributeNode("tabindex");return a&&a.specified?a.nodeValue:null},type:function(){return this.getAttribute("type")},maxlength:function(){var a=this.getAttributeNode("maxLength");return a&&a.specified?a.nodeValue:null}};j.MAXLENGTH=j.maxLength=j.maxlength;var m=b.Slick=this.Slick||{};m.version="1.1.7";m.search=function(a,c,d){return b.search(a,c,d)};m.find=function(a,c){return b.search(a,c,null,!0)};m.contains=function(a,c){b.setDocument(a);return b.contains(a,c)};m.getAttribute=function(a,c){b.setDocument(a);return b.getAttribute(a,c)};m.hasAttribute=function(a,c){b.setDocument(a);return b.hasAttribute(a,c)};m.match=function(a,c){if(!a||!c)return!1;if(!c||c===a)return!0;b.setDocument(a);return b.matchNode(a,c)};m.defineAttributeGetter=function(a,c){b.attributeGetters[a]=c;return this};m.lookupAttributeGetter=function(a){return b.attributeGetters[a]};m.definePseudo=function(a,c){b["pseudo:"+
a]=function(a,b){return c.call(a,b)};return this};m.lookupPseudo=function(a){var c=b["pseudo:"+a];return c?function(a){return c.call(this,a)}:null};m.override=function(a,c){b.override(a,c);return this};m.isXML=b.isXML;m.uidOf=function(a){return b.getUIDHTML(a)};this.Slick||(this.Slick=m)}).apply("undefined"!=typeof exports?exports:this);var Element=function(b,a){var c=Element.Constructors[b];if(c)return c(a);if("string"!=typeof b)return document.id(b).set(a);a||(a={});if(!/^[\w-]+$/.test(b)){c=Slick.parse(b).expressions[0][0];b="*"==c.tag?"div":c.tag;c.id&&null==a.id&&(a.id=c.id);var d=c.attributes;if(d)for(var e,f=0,g=d.length;f<g;f++)e=d[f],null==a[e.key]&&(null!=e.value&&"="==e.operator?a[e.key]=e.value:!e.value&&!e.operator&&(a[e.key]=!0));c.classList&&null==a["class"]&&(a["class"]=c.classList.join(" "))}return document.newElement(b,a)};Browser.Element&&(Element.prototype=Browser.Element.prototype,Element.prototype._fireEvent=function(b){return function(a,c){return b.call(this,a,c)}}(Element.prototype.fireEvent));(new Type("Element",Element)).mirror(function(b){if(!Array.prototype[b]){var a={};a[b]=function(){for(var a=[],d=arguments,e=true,f=0,g=this.length;f<g;f++)var i=this[f],i=a[f]=i[b].apply(i,d),e=e&&typeOf(i)=="element";return e?new Elements(a):a};Elements.implement(a)}});Browser.Element||(Element.parent=Object,Element.Prototype={$constructor:Element,$family:Function.from("element").hide()},Element.mirror(function(b,a){Element.Prototype[b]=a}));Element.Constructors={};var IFrame=new Type("IFrame",function(){var b=Array.link(arguments,{properties:Type.isObject,iframe:function(a){return a!=null}}),a=b.properties||{},c;b.iframe&&(c=document.id(b.iframe));var d=a.onload||function(){};delete a.onload;a.id=a.name=[a.id,a.name,c?c.id||c.name:"IFrame_"+String.uniqueID()].pick();c=new Element(c||"iframe",a);b=function(){d.call(c.contentWindow)};window.frames[a.id]?b():c.addListener("load",b);return c}),Elements=this.Elements=function(b){if(b&&b.length)for(var a={},c,d=0;c=b[d++];){var e=Slick.uidOf(c);if(!a[e]){a[e]=true;this.push(c)}}};Elements.prototype={length:0};Elements.parent=Array;(new Type("Elements",Elements)).implement({filter:function(b,a){return!b?this:new Elements(Array.filter(this,typeOf(b)=="string"?function(a){return a.match(b)}:b,a))}.protect(),push:function(){for(var b=this.length,a=0,c=arguments.length;a<c;a++){var d=document.id(arguments[a]);d&&(this[b++]=d)}return this.length=b}.protect(),unshift:function(){for(var b=[],a=0,c=arguments.length;a<c;a++){var d=document.id(arguments[a]);d&&b.push(d)}return Array.prototype.unshift.apply(this,b)}.protect(),concat:function(){for(var b=new Elements(this),a=0,c=arguments.length;a<c;a++){var d=arguments[a];Type.isEnumerable(d)?b.append(d):b.push(d)}return b}.protect(),append:function(b){for(var a=0,c=b.length;a<c;a++)this.push(b[a]);return this}.protect(),empty:function(){for(;this.length;)delete this[--this.length];return this}.protect()});(function(){var b=Array.prototype.splice,a={"0":0,1:1,length:2};b.call(a,1,1);a[1]==1&&Elements.implement("splice",function(){for(var a=this.length,c=b.apply(this,arguments);a>=this.length;)delete this[a--];return c}.protect());Array.forEachMethod(function(a,b){Elements.implement(b,a)});Array.mirror(Elements);var c;try{c=document.createElement("<input name=x>").name=="x"}catch(d){}var e=function(a){return(""+a).replace(/&/g,"&amp;").replace(/"/g,"&quot;")};Document.implement({newElement:function(a,b){if(b&&b.checked!=null)b.defaultChecked=b.checked;if(c&&b){a="<"+a;b.name&&(a=a+(' name="'+e(b.name)+'"'));b.type&&(a=a+(' type="'+e(b.type)+'"'));a=a+">";delete b.name;delete b.type}return this.id(this.createElement(a)).set(b)}})})();(function(){Slick.uidOf(window);Slick.uidOf(document);Document.implement({newTextNode:function(a){return this.createTextNode(a)},getDocument:function(){return this},getWindow:function(){return this.window},id:function(){var a={string:function(b,c,d){return(b=Slick.find(d,"#"+b.replace(/(\W)/g,"\\$1")))?a.element(b,c):null},element:function(a,b){Slick.uidOf(a);if(!b&&!a.$family&&!/^(?:object|embed)$/i.test(a.tagName)){var c=a.fireEvent;a._fireEvent=function(a,b){return c(a,b)};Object.append(a,Element.Prototype)}return a},object:function(b,c,d){return b.toElement?a.element(b.toElement(d),c):null}};a.textnode=a.whitespace=a.window=a.document=function(a){return a};return function(b,c,d){if(b&&b.$family&&b.uniqueNumber)return b;var e=typeOf(b);return a[e]?a[e](b,c,d||document):null}}()});window.$==null&&Window.implement("$",function(a,b){return document.id(a,b,this.document)});Window.implement({getDocument:function(){return this.document},getWindow:function(){return this}});[Document,Element].invoke("implement",{getElements:function(a){return Slick.search(this,a,new Elements)},getElement:function(a){return document.id(Slick.find(this,a))}});var b={contains:function(a){return Slick.contains(this,a)}};document.contains||Document.implement(b);document.createElement("div").contains||Element.implement(b);var a=function(a,b){if(!a)return b;for(var a=Object.clone(Slick.parse(a)),c=a.expressions,d=c.length;d--;)c[d][0].combinator=b;return a};Object.forEach({getNext:"~",getPrevious:"!~",getParent:"!"},function(b,c){Element.implement(c,function(c){return this.getElement(a(c,b))})});Object.forEach({getAllNext:"~",getAllPrevious:"!~",getSiblings:"~~",getChildren:">",getParents:"!"},function(b,c){Element.implement(c,function(c){return this.getElements(a(c,b))})});Element.implement({getFirst:function(b){return document.id(Slick.search(this,a(b,">"))[0])},getLast:function(b){return document.id(Slick.search(this,a(b,">")).getLast())},getWindow:function(){return this.ownerDocument.window},getDocument:function(){return this.ownerDocument},getElementById:function(a){return document.id(Slick.find(this,"#"+(""+a).replace(/(\W)/g,"\\$1")))},match:function(a){return!a||Slick.match(this,a)}});window.$$==null&&Window.implement("$$",function(a){if(arguments.length==1){if(typeof a=="string")return Slick.search(this.document,a,new Elements);if(Type.isEnumerable(a))return new Elements(a)}return new Elements(arguments)});var c={before:function(a,b){var c=b.parentNode;c&&c.insertBefore(a,b)},after:function(a,b){var c=b.parentNode;c&&c.insertBefore(a,b.nextSibling)},bottom:function(a,b){b.appendChild(a)},top:function(a,b){b.insertBefore(a,b.firstChild)}};c.inside=c.bottom;var d={},e={},f={};Array.forEach(["type","value","defaultValue","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","rowSpan","tabIndex","useMap"],function(a){f[a.toLowerCase()]=a});f.html="innerHTML";f.text=document.createElement("div").textContent==null?"innerText":"textContent";Object.forEach(f,function(a,b){e[b]=function(b,c){b[a]=c};d[b]=function(b){return b[a]}});Array.forEach(["compact","nowrap","ismap","declare","noshade","checked","disabled","readOnly","multiple","selected","noresize","defer","defaultChecked","autofocus","controls","autoplay","loop"],function(a){var b=a.toLowerCase();e[b]=function(b,c){b[a]=!!c};d[b]=function(b){return!!b[a]}});Object.append(e,{"class":function(a,b){"className"in a?a.className=b||"":a.setAttribute("class",b)},"for":function(a,b){"htmlFor"in a?a.htmlFor=b:a.setAttribute("for",b)},style:function(a,b){a.style?a.style.cssText=b:a.setAttribute("style",b)},value:function(a,b){a.value=b!=null?b:""}});d["class"]=function(a){return"className"in a?a.className||null:a.getAttribute("class")};b=document.createElement("button");try{b.type="button"}catch(g){}if(b.type!="button")e.type=function(a,b){a.setAttribute("type",b)};b=null;b=document.createElement("input");b.value="t";b.type="submit";if(b.value!="t")e.type=function(a,b){var c=a.value;a.type=b;a.value=c};var b=null,i=function(a){a.random="attribute";return a.getAttribute("random")=="attribute"}(document.createElement("div"));Element.implement({setProperty:function(a,b){var c=e[a.toLowerCase()];if(c)c(this,b);else{if(i)var d=this.retrieve("$attributeWhiteList",{});if(b==null){this.removeAttribute(a);i&&delete d[a]}else{this.setAttribute(a,""+b);i&&(d[a]=true)}}return this},setProperties:function(a){for(var b in a)this.setProperty(b,a[b]);return this},getProperty:function(a){var b=d[a.toLowerCase()];if(b)return b(this);if(i){var c=this.getAttributeNode(a),b=this.retrieve("$attributeWhiteList",{});if(!c)return null;if(c.expando&&!b[a]){c=this.outerHTML;if(c.substr(0,c.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(a)<0)return null;b[a]=true}}b=Slick.getAttribute(this,a);return!b&&!Slick.hasAttribute(this,a)?null:b},getProperties:function(){var a=Array.from(arguments);return a.map(this.getProperty,this).associate(a)},removeProperty:function(a){return this.setProperty(a,null)},removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this},set:function(a,b){var c=Element.Properties[a];c&&c.set?c.set.call(this,b):this.setProperty(a,b)}.overloadSetter(),get:function(a){var b=Element.Properties[a];return b&&b.get?b.get.apply(this):this.getProperty(a)}.overloadGetter(),erase:function(a){var b=Element.Properties[a];b&&b.erase?b.erase.apply(this):this.removeProperty(a);return this},hasClass:function(a){return this.className.clean().contains(a," ")},addClass:function(a){if(!this.hasClass(a))this.className=(this.className+" "+a).clean();return this},removeClass:function(a){this.className=this.className.replace(RegExp("(^|\\s)"+a+"(?:\\s|$)"),"$1");return this},toggleClass:function(a,b){b==null&&(b=!this.hasClass(a));return b?this.addClass(a):this.removeClass(a)},adopt:function(){var a=this,b,c=Array.flatten(arguments),d=c.length;d>1&&(a=b=document.createDocumentFragment());for(var e=0;e<d;e++){var f=document.id(c[e],true);f&&a.appendChild(f)}b&&this.appendChild(b);return this},appendText:function(a,b){return this.grab(this.getDocument().newTextNode(a),b)},grab:function(a,b){c[b||"bottom"](document.id(a,true),this);return this},inject:function(a,b){c[b||"bottom"](this,document.id(a,true));return this},replaces:function(a){a=document.id(a,true);a.parentNode.replaceChild(this,a);return this},wraps:function(a,b){a=document.id(a,true);return this.replaces(a).grab(a,b)},getSelected:function(){this.selectedIndex;return new Elements(Array.from(this.options).filter(function(a){return a.selected}))},toQueryString:function(){var a=[];this.getElements("input, select, textarea").each(function(b){var c=b.type;if(b.name&&!b.disabled&&!(c=="submit"||c=="reset"||c=="file"||c=="image")){c=b.get("tag")=="select"?b.getSelected().map(function(a){return document.id(a).get("value")}):(c=="radio"||c=="checkbox")&&!b.checked?null:b.get("value");Array.from(c).each(function(c){typeof c!="undefined"&&a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(c))})}});return a.join("&")}});var j={},m={},h=function(a){return m[a]||(m[a]={})},k=function(a){var b=a.uniqueNumber;a.removeEvents&&a.removeEvents();a.clearAttributes&&a.clearAttributes();if(b!=null){delete j[b];delete m[b]}return a},o={input:"checked",option:"selected",textarea:"value"};Element.implement({destroy:function(){var a=k(this).getElementsByTagName("*");Array.each(a,k);Element.dispose(this);return null},empty:function(){Array.from(this.childNodes).each(Element.dispose);return this},dispose:function(){return this.parentNode?this.parentNode.removeChild(this):this},clone:function(a,b){var a=a!==false,c=this.cloneNode(a),d=[c],e=[this],f;if(a){d.append(Array.from(c.getElementsByTagName("*")));e.append(Array.from(this.getElementsByTagName("*")))}for(f=d.length;f--;){var k=d[f],g=e[f];b||k.removeAttribute("id");if(k.clearAttributes){k.clearAttributes();k.mergeAttributes(g);k.removeAttribute("uniqueNumber");if(k.options)for(var j=k.options,m=g.options,h=j.length;h--;)j[h].selected=m[h].selected}(j=o[g.tagName.toLowerCase()])&&g[j]&&(k[j]=g[j])}if(Browser.ie){d=c.getElementsByTagName("object");e=this.getElementsByTagName("object");for(f=d.length;f--;)d[f].outerHTML=e[f].outerHTML}return document.id(c)}});[Element,Window,Document].invoke("implement",{addListener:function(a,b,c){if(a=="unload")var d=b,e=this,b=function(){e.removeListener("unload",b);d()};else j[Slick.uidOf(this)]=this;this.addEventListener?this.addEventListener(a,b,!!c):this.attachEvent("on"+a,b);return this},removeListener:function(a,b,c){this.removeEventListener?this.removeEventListener(a,b,!!c):this.detachEvent("on"+a,b);return this},retrieve:function(a,b){var c=h(Slick.uidOf(this)),d=c[a];b!=null&&d==null&&(d=c[a]=b);return d!=null?d:null},store:function(a,b){h(Slick.uidOf(this))[a]=b;return this},eliminate:function(a){delete h(Slick.uidOf(this))[a];return this}});window.attachEvent&&!window.addEventListener&&window.addListener("unload",function(){Object.each(j,k);window.CollectGarbage&&CollectGarbage()});Element.Properties={};Element.Properties.style={set:function(a){this.style.cssText=a},get:function(){return this.style.cssText},erase:function(){this.style.cssText=""}};Element.Properties.tag={get:function(){return this.tagName.toLowerCase()}};Element.Properties.html={set:function(a){a==null?a="":typeOf(a)=="array"&&(a=a.join(""));this.innerHTML=a},erase:function(){this.innerHTML=""}};b=document.createElement("div");b.innerHTML="<nav></nav>";var q=b.childNodes.length==1;if(!q)for(var b=["abbr","article","aside","audio","canvas","datalist","details","figcaption","figure","footer","header","hgroup","mark","meter","nav","output","progress","section","summary","time","video"],u=document.createDocumentFragment(),r=b.length;r--;)u.createElement(b[r]);b=null;b=Function.attempt(function(){document.createElement("table").innerHTML="<tr><td></td></tr>";return true});r=document.createElement("tr");r.innerHTML="<td></td>";var w=r.innerHTML=="<td></td>",r=null;if(!b||!w||!q)Element.Properties.html.set=function(a){var b={table:[1,"<table>","</table>"],select:[1,"<select>","</select>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"]};b.thead=b.tfoot=b.tbody;return function(c){var d=b[this.get("tag")];!d&&!q&&(d=[0,"",""]);if(!d)return a.call(this,c);var e=d[0],f=document.createElement("div"),k=f;q||u.appendChild(f);for(f.innerHTML=[d[1],c,d[2]].flatten().join("");e--;)k=k.firstChild;this.empty().adopt(k.childNodes);q||u.removeChild(f)}}(Element.Properties.html.set);b=document.createElement("form");b.innerHTML="<select><option>s</option></select>";if(b.firstChild.value!="s")Element.Properties.value={set:function(a){if(this.get("tag")!="select")return this.setProperty("value",a);for(var b=this.getElements("option"),c=0;c<b.length;c++){var d=b[c],e=d.getAttributeNode("value");if((e&&e.specified?d.value:d.get("text"))==a)return d.selected=true}},get:function(){var a=this,b=a.get("tag");if(b!="select"&&b!="option")return this.getProperty("value");if(b=="select"&&!(a=a.getSelected()[0]))return"";return(b=a.getAttributeNode("value"))&&b.specified?a.value:a.get("text")}};b=null;if(document.createElement("div").getAttributeNode("id"))Element.Properties.id={set:function(a){this.id=this.getAttributeNode("id").value=a},get:function(){return this.id||null},erase:function(){this.id=this.getAttributeNode("id").value=""}}})();(function(){var b=document.html,a=document.createElement("div");a.style.color="red";a.style.color=null;var c=a.style.color=="red",a=null;Element.Properties.styles={set:function(a){this.setStyles(a)}};var a=b.style.opacity!=null,d=b.style.filter!=null,e=/alpha\(opacity=([\d.]+)\)/i,f=a?function(a,b){a.style.opacity=b}:d?function(a,b){var c=a.style;if(!a.currentStyle||!a.currentStyle.hasLayout)c.zoom=1;var b=b==null||b==1?"":"alpha(opacity="+(b*100).limit(0,100).round()+")",d=c.filter||a.getComputedStyle("filter")||"";c.filter=e.test(d)?d.replace(e,b):d+b;c.filter||c.removeAttribute("filter")}:function(a,b){a.store("$opacity",b);a.style.visibility=b>0||b==null?"visible":"hidden"},g=a?function(a){a=a.style.opacity||a.getComputedStyle("opacity");return a==""?1:a.toFloat()}:d?function(a){var a=a.style.filter||a.getComputedStyle("filter"),b;a&&(b=a.match(e));return b==null||a==null?1:b[1]/100}:function(a){var b=a.retrieve("$opacity");b==null&&(b=a.style.visibility=="hidden"?0:1);return b},i=b.style.cssFloat==null?"styleFloat":"cssFloat";Element.implement({getComputedStyle:function(a){if(this.currentStyle)return this.currentStyle[a.camelCase()];var b=Element.getDocument(this).defaultView;return(b=b?b.getComputedStyle(this,null):null)?b.getPropertyValue(a==i?"float":a.hyphenate()):null},setStyle:function(a,b){if(a=="opacity"){b!=null&&(b=parseFloat(b));f(this,b);return this}a=(a=="float"?i:a).camelCase();if(typeOf(b)!="string")var d=(Element.Styles[a]||"@").split(" "),b=Array.from(b).map(function(a,b){return!d[b]?"":typeOf(a)=="number"?d[b].replace("@",Math.round(a)):a}).join(" ");else b==""+Number(b)&&(b=Math.round(b));this.style[a]=b;(b==""||b==null)&&c&&this.style.removeAttribute&&this.style.removeAttribute(a);return this},getStyle:function(a){if(a=="opacity")return g(this);var a=(a=="float"?i:a).camelCase(),b=this.style[a];if(!b||a=="zIndex"){var b=[],c;for(c in Element.ShortStyles)if(a==c){for(var d in Element.ShortStyles[c])b.push(this.getStyle(d));return b.join(" ")}b=this.getComputedStyle(a)}if(b){b=""+b;(c=b.match(/rgba?\([\d\s,]+\)/))&&(b=b.replace(c[0],c[0].rgbToHex()))}if(Browser.ie&&isNaN(parseFloat(b))){if(/^(height|width)$/.test(a)){var e=0;(a=="width"?["left","right"]:["top","bottom"]).each(function(a){e=e+(this.getStyle("border-"+a+"-width").toInt()+this.getStyle("padding-"+a).toInt())},this);return this["offset"+a.capitalize()]-e+"px"}if(Browser.opera&&(""+b).indexOf("px")!=-1)return b;if(/^border(.+)Width|margin|padding/.test(a))return"0px"}return b},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},getStyles:function(){var a={};Array.flatten(arguments).each(function(b){a[b]=this.getStyle(b)},this);return a}});Element.Styles={left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@"};Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};["Top","Right","Bottom","Left"].each(function(a){var b=Element.ShortStyles,c=Element.Styles;["margin","padding"].each(function(d){var e=d+a;b[d][e]=c[e]="@px"});var d="border"+a;b.border[d]=c[d]="@px @ rgb(@, @, @)";var e=d+"Width",f=d+"Style",g=d+"Color";b[d]={};b.borderWidth[e]=b[d][e]=c[e]="@px";b.borderStyle[f]=b[d][f]=c[f]="@";b.borderColor[g]=b[d][g]=c[g]="rgb(@, @, @)"})})();(function(){Element.Properties.events={set:function(a){this.addEvents(a)}};[Element,Window,Document].invoke("implement",{addEvent:function(a,b,d){var e=this.retrieve("events",{});e[a]||(e[a]={keys:[],values:[]});if(e[a].keys.contains(b))return this;e[a].keys.push(b);var f=a,g=Element.Events[a],i=b,j=this;if(g){g.onAdd&&g.onAdd.call(this,b,a);g.condition&&(i=function(d){return g.condition.call(this,d,a)?b.call(this,d):true});g.base&&(f=Function.from(g.base).call(this,a))}var m=function(){return b.call(j)},h=Element.NativeEvents[f];if(h){h==2&&(m=function(a){a=new DOMEvent(a,j.getWindow());i.call(j,a)===false&&a.stop()});this.addListener(f,m,d)}e[a].values.push(m);return this},removeEvent:function(a,b,d){var e=this.retrieve("events");if(!e||!e[a])return this;var f=e[a],g=f.keys.indexOf(b);if(g==-1)return this;e=f.values[g];delete f.keys[g];delete f.values[g];if(f=Element.Events[a]){f.onRemove&&f.onRemove.call(this,b,a);f.base&&(a=Function.from(f.base).call(this,a))}return Element.NativeEvents[a]?this.removeListener(a,e,d):this},addEvents:function(a){for(var b in a)this.addEvent(b,a[b]);return this},removeEvents:function(a){var b;if(typeOf(a)=="object"){for(b in a)this.removeEvent(b,a[b]);return this}var d=this.retrieve("events");if(!d)return this;if(a){if(d[a]){d[a].keys.each(function(b){this.removeEvent(a,b)},this);delete d[a]}}else{for(b in d)this.removeEvents(b);this.eliminate("events")}return this},fireEvent:function(a,b,d){var e=this.retrieve("events");if(!e||!e[a])return this;b=Array.from(b);e[a].keys.each(function(a){d?a.delay(d,this,b):a.apply(this,b)},this);return this},cloneEvents:function(a,b){var a=document.id(a),d=a.retrieve("events");if(!d)return this;if(b)d[b]&&d[b].keys.each(function(a){this.addEvent(b,a)},this);else for(var e in d)this.cloneEvents(a,e);return this}});Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,orientationchange:2,touchstart:2,touchmove:2,touchend:2,touchcancel:2,gesturestart:2,gesturechange:2,gestureend:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,paste:2,input:2,load:2,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};Element.Events={mousewheel:{base:Browser.firefox?"DOMMouseScroll":"mousewheel"}};if("onmouseenter"in document.documentElement)Element.NativeEvents.mouseenter=Element.NativeEvents.mouseleave=2;else{var b=function(a){a=a.relatedTarget;return a==null?true:!a?false:a!=this&&a.prefix!="xul"&&typeOf(this)!="document"&&!this.contains(a)};Element.Events.mouseenter={base:"mouseover",condition:b};Element.Events.mouseleave={base:"mouseout",condition:b}}if(!window.addEventListener){Element.NativeEvents.propertychange=2;Element.Events.change={base:function(){var a=this.type;return this.get("tag")=="input"&&(a=="radio"||a=="checkbox")?"propertychange":"change"},condition:function(a){return this.type!="radio"||a.event.propertyName=="checked"&&this.checked}}}})();(function(){var b,a=!!window.addEventListener;Element.NativeEvents.focusin=Element.NativeEvents.focusout=2;var c=function(a,b,c,d,e){for(;e&&e!=a;){if(b(e,d))return c.call(e,d,e);e=document.id(e.parentNode)}},d={mouseenter:{base:"mouseover"},mouseleave:{base:"mouseout"},focus:{base:"focus"+(a?"":"in"),capture:true},blur:{base:a?"blur":"focusout",capture:true}},e=function(a){return{base:"focusin",remove:function(b,c){var d=b.retrieve("$delegation:"+a+"listeners",{})[c];if(d&&d.forms)for(var e=d.forms.length;e--;)d.forms[e].removeEvent(a,d.fns[e])},listen:function(b,d,e,f,g,i){if(f=g.get("tag")=="form"?g:f.target.getParent("form")){var r=b.retrieve("$delegation:"+a+"listeners",{}),w=r[i]||{forms:[],fns:[]},l=w.forms,s=w.fns;if(l.indexOf(f)==-1){l.push(f);l=function(a){c(b,d,e,a,g)};f.addEvent(a,l);s.push(l);r[i]=w;b.store("$delegation:"+a+"listeners",r)}}}}},f=function(a){return{base:"focusin",listen:function(b,d,e,f,g){var i={blur:function(){this.removeEvents(i)}};i[a]=function(a){c(b,d,e,a,g)};f.target.addEvents(i)}}};a||Object.append(d,{submit:e("submit"),reset:e("reset"),change:f("change"),select:f("select")});var a=Element.prototype,g=a.addEvent,i=a.removeEvent,a=function(a,b){return function(c,d,e){if(c.indexOf(":relay")==-1)return a.call(this,c,d,e);var f=Slick.parse(c).expressions[0][0];if(f.pseudos[0].key!="relay")return a.call(this,c,d,e);var g=f.tag;f.pseudos.slice(1).each(function(a){g=g+(":"+a.key+(a.value?"("+a.value+")":""))});a.call(this,c,d);return b.call(this,g,f.pseudos[0].value,d)}};b=function(a,c,e,f){var g=this.retrieve("$delegates",{}),q=g[a];if(!q)return this;if(f){var c=a,e=q[f].delegator,u=d[a]||{},a=u.base||c;u.remove&&u.remove(this,f);delete q[f];g[c]=q;return i.call(this,a,e)}if(e)for(u in q){f=q[u];if(f.match==c&&f.fn==e)return b.call(this,a,c,e,u)}else for(u in q){f=q[u];f.match==c&&b.call(this,a,c,f.fn,u)}return this};[Element,Window,Document].invoke("implement",{addEvent:a(g,function(a,b,e){var f=this.retrieve("$delegates",{}),i=f[a];if(i)for(var q in i)if(i[q].fn==e&&i[q].match==b)return this;q=a;var u=b,r=d[a]||{},a=r.base||q,b=function(a){return Slick.match(a,u)},w=Element.Events[q];if(w&&w.condition)var l=b,s=w.condition,b=function(b,c){return l(b,c)&&s.call(b,c,a)};var p=this,n=String.uniqueID(),w=r.listen?function(a,c){if(!c&&a&&a.target)c=a.target;c&&r.listen(p,b,e,a,c,n)}:function(a,d){if(!d&&a&&a.target)d=a.target;d&&c(p,b,e,a,d)};i||(i={});i[n]={match:u,fn:e,delegator:w};f[q]=i;return g.call(this,a,w,r.capture)}),removeEvent:a(i,b)})})();(function(){function b(a){return h(a,"-moz-box-sizing")=="border-box"}function a(a){return h(a,"border-top-width").toInt()||0}function c(a){return h(a,"border-left-width").toInt()||0}function d(a){return/^(?:body|html)$/i.test(a.tagName)}function e(a){a=a.getDocument();return!a.compatMode||a.compatMode=="CSS1Compat"?a.html:a.body}var f=document.createElement("div"),g=document.createElement("div");f.style.height="0";f.appendChild(g);var i=g.offsetParent===f,f=g=null,j=function(a){return h(a,"position")!="static"||d(a)},m=function(a){return j(a)||/^(?:table|td|th)$/i.test(a.tagName)};Element.implement({scrollTo:function(a,b){if(d(this))this.getWindow().scrollTo(a,b);else{this.scrollLeft=a;this.scrollTop=b}return this},getSize:function(){return d(this)?this.getWindow().getSize():{x:this.offsetWidth,y:this.offsetHeight}},getScrollSize:function(){return d(this)?this.getWindow().getScrollSize():{x:this.scrollWidth,y:this.scrollHeight}},getScroll:function(){return d(this)?this.getWindow().getScroll():{x:this.scrollLeft,y:this.scrollTop}},getScrolls:function(){for(var a=this.parentNode,b={x:0,y:0};a&&!d(a);){b.x=b.x+a.scrollLeft;b.y=b.y+a.scrollTop;a=a.parentNode}return b},getOffsetParent:i?function(){var a=this;if(d(a)||h(a,"position")=="fixed")return null;for(var b=h(a,"position")=="static"?m:j;a=a.parentNode;)if(b(a))return a;return null}:function(){if(d(this)||h(this,"position")=="fixed")return null;try{return this.offsetParent}catch(a){}return null},getOffsets:function(){if(this.getBoundingClientRect&&!Browser.Platform.ios){var e=this.getBoundingClientRect(),f=document.id(this.getDocument().documentElement),g=f.getScroll(),i=this.getScrolls(),j=h(this,"position")=="fixed";return{x:e.left.toInt()+i.x+(j?0:g.x)-f.clientLeft,y:e.top.toInt()+i.y+(j?0:g.y)-f.clientTop}}e=this;f={x:0,y:0};if(d(this))return f;for(;e&&!d(e);){f.x=f.x+e.offsetLeft;f.y=f.y+e.offsetTop;if(Browser.firefox){if(!b(e)){f.x=f.x+c(e);f.y=f.y+a(e)}if((g=e.parentNode)&&h(g,"overflow")!="visible"){f.x=f.x+c(g);f.y=f.y+a(g)}}else if(e!=this&&Browser.safari){f.x=f.x+c(e);f.y=f.y+a(e)}e=e.offsetParent}if(Browser.firefox&&!b(this)){f.x=f.x-c(this);f.y=f.y-a(this)}return f},getPosition:function(b){var d=this.getOffsets(),e=this.getScrolls(),d={x:d.x-e.x,y:d.y-e.y};if(b&&(b=document.id(b))){e=b.getPosition();return{x:d.x-e.x-c(b),y:d.y-e.y-a(b)}}return d},getCoordinates:function(a){if(d(this))return this.getWindow().getCoordinates();var a=this.getPosition(a),b=this.getSize(),a={left:a.x,top:a.y,width:b.x,height:b.y};a.right=a.left+a.width;a.bottom=a.top+a.height;return a},computePosition:function(a){return{left:a.x-(h(this,"margin-left").toInt()||0),top:a.y-(h(this,"margin-top").toInt()||0)}},setPosition:function(a){return this.setStyles(this.computePosition(a))}});[Document,Window].invoke("implement",{getSize:function(){var a=e(this);return{x:a.clientWidth,y:a.clientHeight}},getScroll:function(){var a=this.getWindow(),b=e(this);return{x:a.pageXOffset||b.scrollLeft,y:a.pageYOffset||b.scrollTop}},getScrollSize:function(){var a=e(this),b=this.getSize(),c=this.getDocument().body;return{x:Math.max(a.scrollWidth,c.scrollWidth,b.x),y:Math.max(a.scrollHeight,c.scrollHeight,b.y)}},getPosition:function(){return{x:0,y:0}},getCoordinates:function(){var a=this.getSize();return{top:0,left:0,bottom:a.y,right:a.x,height:a.y,width:a.x}}});var h=Element.getComputedStyle})();Element.alias({position:"setPosition"});[Window,Document,Element].invoke("implement",{getHeight:function(){return this.getSize().y},getWidth:function(){return this.getSize().x},getScrollTop:function(){return this.getScroll().y},getScrollLeft:function(){return this.getScroll().x},getScrollHeight:function(){return this.getScrollSize().y},getScrollWidth:function(){return this.getScrollSize().x},getTop:function(){return this.getPosition().y},getLeft:function(){return this.getPosition().x}});(function(){var b=this.Fx=new Class({Implements:[Chain,Events,Options],options:{fps:60,unit:false,duration:500,frames:null,frameSkip:true,link:"ignore"},initialize:function(a){this.subject=this.subject||this;this.setOptions(a)},getTransition:function(){return function(a){return-(Math.cos(Math.PI*a)-1)/2}},step:function(a){if(this.options.frameSkip){var b=(this.time!=null?a-this.time:0)/this.frameInterval;this.time=a;this.frame=this.frame+b}else this.frame++;if(this.frame<this.frames)this.set(this.compute(this.from,this.to,this.transition(this.frame/this.frames)));else{this.frame=this.frames;this.set(this.compute(this.from,this.to,1));this.stop()}},set:function(a){return a},compute:function(a,c,d){return b.compute(a,c,d)},check:function(){if(!this.isRunning())return true;switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.pass(arguments,this))}return false},start:function(a,c){if(!this.check(a,c))return this;this.from=a;this.to=c;this.frame=this.options.frameSkip?0:-1;this.time=null;this.transition=this.getTransition();var d=this.options.frames,f=this.options.fps,h=this.options.duration;this.duration=b.Durations[h]||h.toInt();this.frameInterval=1E3/f;this.frames=d||Math.round(this.duration/this.frameInterval);this.fireEvent("start",this.subject);e.call(this,f);return this},stop:function(){if(this.isRunning()){this.time=null;f.call(this,this.options.fps);if(this.frames==this.frame){this.fireEvent("complete",this.subject);this.callChain()||this.fireEvent("chainComplete",this.subject)}else this.fireEvent("stop",this.subject)}return this},cancel:function(){if(this.isRunning()){this.time=null;f.call(this,this.options.fps);this.frame=this.frames;this.fireEvent("cancel",this.subject).clearChain()}return this},pause:function(){if(this.isRunning()){this.time=null;f.call(this,this.options.fps)}return this},resume:function(){this.frame<this.frames&&!this.isRunning()&&e.call(this,this.options.fps);return this},isRunning:function(){var b=a[this.options.fps];return b&&b.contains(this)}});b.compute=function(a,b,c){return(b-a)*c+a};b.Durations={"short":250,normal:500,"long":1E3};var a={},c={},d=function(){for(var a=Date.now(),b=this.length;b--;){var c=this[b];c&&c.step(a)}},e=function(b){var e=a[b]||(a[b]=[]);e.push(this);c[b]||(c[b]=d.periodical(Math.round(1E3/b),e))},f=function(b){var d=a[b];if(d){d.erase(this);if(!d.length&&c[b]){delete a[b];c[b]=clearInterval(c[b])}}}})();Fx.CSS=new Class({Extends:Fx,prepare:function(b,a,c){var c=Array.from(c),d=c[0],c=c[1];if(c==null){var c=d,d=b.getStyle(a),e=this.options.unit;if(e&&d.slice(-e.length)!=e&&parseFloat(d)!=0){b.setStyle(a,c+e);var f=b.getComputedStyle(a);if(!/px$/.test(f)){f=b.style[("pixel-"+a).camelCase()];if(f==null){var g=b.style.left;b.style.left=c+e;f=b.style.pixelLeft;b.style.left=g}}d=(c||1)/(parseFloat(f)||1)*(parseFloat(d)||0);b.setStyle(a,d+e)}}return{from:this.parse(d),to:this.parse(c)}},parse:function(b){b=Function.from(b)();b=typeof b=="string"?b.split(" "):Array.from(b);return b.map(function(a){var a=""+a,b=false;Object.each(Fx.CSS.Parsers,function(d){if(!b){var e=d.parse(a);if(e||e===0)b={value:e,parser:d}}});return b=b||{value:a,parser:Fx.CSS.Parsers.String}})},compute:function(b,a,c){var d=[];Math.min(b.length,a.length).times(function(e){d.push({value:b[e].parser.compute(b[e].value,a[e].value,c),parser:b[e].parser})});d.$family=Function.from("fx:css:value");return d},serve:function(b,a){typeOf(b)!="fx:css:value"&&(b=this.parse(b));var c=[];b.each(function(b){c=c.concat(b.parser.serve(b.value,a))});return c},render:function(b,a,c,d){b.setStyle(a,this.serve(c,d))},search:function(b){if(Fx.CSS.Cache[b])return Fx.CSS.Cache[b];var a={},c=RegExp("^"+b.escapeRegExp()+"$");Array.each(document.styleSheets,function(b){var e=b.href;if(!e||!e.contains("://")||e.contains(document.domain))Array.each(b.rules||b.cssRules,function(b){if(b.style){var d=b.selectorText?b.selectorText.replace(/^\w+/,function(a){return a.toLowerCase()}):null;d&&c.test(d)&&Object.each(Element.Styles,function(c,d){if(b.style[d]&&!Element.ShortStyles[d]){c=""+b.style[d];a[d]=/^rgb/.test(c)?c.rgbToHex():c}})}})});return Fx.CSS.Cache[b]=a}});Fx.CSS.Cache={};Fx.CSS.Parsers={Color:{parse:function(b){return b.match(/^#[0-9a-f]{3,6}$/i)?b.hexToRgb(true):(b=b.match(/(\d+),\s*(\d+),\s*(\d+)/))?[b[1],b[2],b[3]]:false},compute:function(b,a,c){return b.map(function(d,e){return Math.round(Fx.compute(b[e],a[e],c))})},serve:function(b){return b.map(Number)}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(b,a){return a?b+a:b}},String:{parse:Function.from(!1),compute:function(b,a){return a},serve:function(b){return b}}};Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=document.id(b);this.parent(a)},set:function(b,a){if(arguments.length==1){a=b;b=this.property||this.options.property}this.render(this.element,b,a,this.options.unit);return this},start:function(b,a,c){if(!this.check(b,a,c))return this;var d=Array.flatten(arguments);this.property=this.options.property||d.shift();d=this.prepare(this.element,this.property,d);return this.parent(d.from,d.to)}});Element.Properties.tween={set:function(b){this.get("tween").cancel().setOptions(b);return this},get:function(){var b=this.retrieve("tween");if(!b){b=new Fx.Tween(this,{link:"cancel"});this.store("tween",b)}return b}};Element.implement({tween:function(b,a,c){this.get("tween").start(b,a,c);return this},fade:function(b){var a=this.get("tween"),c,d=["opacity"].append(arguments),e;d[1]==null&&(d[1]="toggle");switch(d[1]){case"in":c="start";d[1]=1;break;case"out":c="start";d[1]=0;break;case"show":c="set";d[1]=1;break;case"hide":c="set";d[1]=0;break;case"toggle":e=this.retrieve("fade:flag",this.getStyle("opacity")==1);c="start";d[1]=e?0:1;this.store("fade:flag",!e);e=true;break;default:c="start"}e||this.eliminate("fade:flag");a[c].apply(a,d);d=d[d.length-1];c=="set"||d!=0?this.setStyle("visibility",d==0?"hidden":"visible"):a.chain(function(){this.element.setStyle("visibility","hidden");this.callChain()});return this},highlight:function(b,a){if(!a){a=this.retrieve("highlight:original",this.getStyle("background-color"));a=a=="transparent"?"#fff":a}var c=this.get("tween");c.start("background-color",b||"#ffff88",a).chain(function(){this.setStyle("background-color",this.retrieve("highlight:original"));c.callChain()}.bind(this));return this}});Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=document.id(b);this.parent(a)},set:function(b){typeof b=="string"&&(b=this.search(b));for(var a in b)this.render(this.element,a,b[a],this.options.unit);return this},compute:function(b,a,c){var d={},e;for(e in b)d[e]=this.parent(b[e],a[e],c);return d},start:function(b){if(!this.check(b))return this;typeof b=="string"&&(b=this.search(b));var a={},c={},d;for(d in b){var e=this.prepare(this.element,d,b[d]);a[d]=e.from;c[d]=e.to}return this.parent(a,c)}});Element.Properties.morph={set:function(b){this.get("morph").cancel().setOptions(b);return this},get:function(){var b=this.retrieve("morph");if(!b){b=new Fx.Morph(this,{link:"cancel"});this.store("morph",b)}return b}};Element.implement({morph:function(b){this.get("morph").start(b);return this}});Fx.implement({getTransition:function(){var b=this.options.transition||Fx.Transitions.Sine.easeInOut;if(typeof b=="string"){var a=b.split(":"),b=Fx.Transitions,b=b[a[0]]||b[a[0].capitalize()];a[1]&&(b=b["ease"+a[1].capitalize()+(a[2]?a[2].capitalize():"")])}return b}});Fx.Transition=function(b,a){var a=Array.from(a),c=function(c){return b(c,a)};return Object.append(c,{easeIn:c,easeOut:function(c){return 1-b(1-c,a)},easeInOut:function(c){return(c<=0.5?b(2*c,a):2-b(2*(1-c),a))/2}})};Fx.Transitions={linear:function(b){return b}};Fx.Transitions.extend=function(b){for(var a in b)Fx.Transitions[a]=new Fx.Transition(b[a])};Fx.Transitions.extend({Pow:function(b,a){return Math.pow(b,a&&a[0]||6)},Expo:function(b){return Math.pow(2,8*(b-1))},Circ:function(b){return 1-Math.sin(Math.acos(b))},Sine:function(b){return 1-Math.cos(b*Math.PI/2)},Back:function(b,a){a=a&&a[0]||1.618;return Math.pow(b,2)*((a+1)*b-a)},Bounce:function(b){for(var a,c=0,d=1;;c=c+d,d=d/2)if(b>=(7-4*c)/11){a=d*d-Math.pow((11-6*c-11*b)/4,2);break}return a},Elastic:function(b,a){return Math.pow(2,10*--b)*Math.cos(20*b*Math.PI*(a&&a[0]||1)/3)}});["Quad","Cubic","Quart","Quint"].each(function(b,a){Fx.Transitions[b]=new Fx.Transition(function(b){return Math.pow(b,a+2)})});(function(){var b=function(){},a="onprogress"in new Browser.Request,c=this.Request=new Class({Implements:[Chain,Events,Options],options:{url:"",data:"",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:true,format:false,method:"post",link:"ignore",isSuccess:null,emulation:true,urlEncoded:true,encoding:"utf-8",evalScripts:false,evalResponse:false,timeout:0,noCache:false},initialize:function(a){this.xhr=new Browser.Request;this.setOptions(a);this.headers=this.options.headers},onStateChange:function(){var c=this.xhr;if(c.readyState==4&&this.running){this.running=false;this.status=0;Function.attempt(function(){var a=c.status;this.status=a==1223?204:a}.bind(this));c.onreadystatechange=b;if(a)c.onprogress=c.onloadstart=b;clearTimeout(this.timer);this.response={text:this.xhr.responseText||"",xml:this.xhr.responseXML};this.options.isSuccess.call(this,this.status)?this.success(this.response.text,this.response.xml):this.failure()}},isSuccess:function(){var a=this.status;return a>=200&&a<300},isRunning:function(){return!!this.running},processScripts:function(a){return this.options.evalResponse||/(ecma|java)script/.test(this.getHeader("Content-type"))?Browser.exec(a):a.stripScripts(this.options.evalScripts)},success:function(a,b){this.onSuccess(this.processScripts(a),b)},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain()},failure:function(){this.onFailure()},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr)},loadstart:function(a){this.fireEvent("loadstart",[a,this.xhr])},progress:function(a){this.fireEvent("progress",[a,this.xhr])},timeout:function(){this.fireEvent("timeout",this.xhr)},setHeader:function(a,b){this.headers[a]=b;return this},getHeader:function(a){return Function.attempt(function(){return this.xhr.getResponseHeader(a)}.bind(this))},check:function(){if(!this.running)return true;switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.pass(arguments,this))}return false},send:function(b){if(!this.check(b))return this;this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.running=true;var c=typeOf(b);if(c=="string"||c=="element")b={data:b};var c=this.options,b=Object.append({data:c.data,url:c.url,method:c.method},b),c=b.data,d=""+b.url,b=b.method.toLowerCase();switch(typeOf(c)){case"element":c=document.id(c).toQueryString();break;case"object":case"hash":c=Object.toQueryString(c)}if(this.options.format)var i="format="+this.options.format,c=c?i+"&"+c:i;if(this.options.emulation&&!["get","post"].contains(b)){b="_method="+b;c=c?b+"&"+c:b;b="post"}this.options.urlEncoded&&["post","put"].contains(b)&&(this.headers["Content-type"]="application/x-www-form-urlencoded"+(this.options.encoding?"; charset="+this.options.encoding:""));if(!d)d=document.location.pathname;i=d.lastIndexOf("/");if(i>-1&&(i=d.indexOf("#"))>-1)d=d.substr(0,i);this.options.noCache&&(d=d+((d.contains("?")?"&":"?")+String.uniqueID()));if(c&&b=="get"){d=d+((d.contains("?")?"&":"?")+c);c=null}var j=this.xhr;if(a){j.onloadstart=this.loadstart.bind(this);j.onprogress=this.progress.bind(this)}j.open(b.toUpperCase(),d,this.options.async,this.options.user,this.options.password);if(this.options.user&&"withCredentials"in j)j.withCredentials=true;j.onreadystatechange=this.onStateChange.bind(this);Object.each(this.headers,function(a,b){try{j.setRequestHeader(b,a)}catch(c){this.fireEvent("exception",[b,a])}},this);this.fireEvent("request");j.send(c);if(this.options.async){if(this.options.timeout)this.timer=this.timeout.delay(this.options.timeout,this)}else this.onStateChange();return this},cancel:function(){if(!this.running)return this;this.running=false;var c=this.xhr;c.abort();clearTimeout(this.timer);c.onreadystatechange=b;if(a)c.onprogress=c.onloadstart=b;this.xhr=new Browser.Request;this.fireEvent("cancel");return this}}),d={};["get","post","put","delete","GET","POST","PUT","DELETE"].each(function(a){d[a]=function(b){var c={method:a};if(b!=null)c.data=b;return this.send(c)}});c.implement(d);Element.Properties.send={set:function(a){this.get("send").cancel().setOptions(a);return this},get:function(){var a=this.retrieve("send");if(!a){a=new c({data:this,link:"cancel",method:this.get("method")||"post",url:this.get("action")});this.store("send",a)}return a}};Element.implement({send:function(a){var b=this.get("send");b.send({data:this,url:a||b.options.url});return this}})})();Request.HTML=new Class({Extends:Request,options:{update:!1,append:!1,evalScripts:!0,filter:!1,headers:{Accept:"text/html, application/xml, text/xml, */*"}},success:function(b){var a=this.options,c=this.response;c.html=b.stripScripts(function(a){c.javascript=a});if(b=c.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i))c.html=b[1];b=(new Element("div")).set("html",c.html);c.tree=b.childNodes;c.elements=b.getElements(a.filter||"*");if(a.filter)c.tree=c.elements;if(a.update){b=document.id(a.update).empty();a.filter?b.adopt(c.elements):b.set("html",c.html)}else if(a.append){var d=document.id(a.append);a.filter?c.elements.reverse().inject(d):d.adopt(b.getChildren())}a.evalScripts&&Browser.exec(c.javascript);this.onSuccess(c.tree,c.elements,c.html,c.javascript)}});Element.Properties.load={set:function(b){this.get("load").cancel().setOptions(b);return this},get:function(){var b=this.retrieve("load");if(!b){b=new Request.HTML({data:this,link:"cancel",update:this,method:"get"});this.store("load",b)}return b}};Element.implement({load:function(){this.get("load").send(Array.link(arguments,{data:Type.isObject,url:Type.isString}));return this}});"undefined"==typeof JSON&&(this.JSON={});(function(){var b={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},a=function(a){return b[a]||"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)};JSON.validate=function(a){a=a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");return/^[\],:{}\s]*$/.test(a)};JSON.encode=JSON.stringify?function(a){return JSON.stringify(a)}:function(b){b&&b.toJSON&&(b=b.toJSON());switch(typeOf(b)){case"string":return'"'+b.replace(/[\x00-\x1f\\"]/g,a)+'"';case"array":return"["+b.map(JSON.encode).clean()+"]";case"object":case"hash":var d=[];Object.each(b,function(a,b){var c=JSON.encode(a);c&&d.push(JSON.encode(b)+":"+c)});return"{"+d+"}";case"number":case"boolean":return""+b;case"null":return"null"}return null};JSON.decode=function(a,b){if(!a||typeOf(a)!="string")return null;if(b||JSON.secure){if(JSON.parse)return JSON.parse(a);if(!JSON.validate(a))throw Error("JSON could not decode the input; security is enabled and the value is not secure.");}return eval("("+a+")")}})();Request.JSON=new Class({Extends:Request,options:{secure:!0},initialize:function(b){this.parent(b);Object.append(this.headers,{Accept:"application/json","X-Request":"JSON"})},success:function(b){var a;try{a=this.response.json=JSON.decode(b,this.options.secure)}catch(c){this.fireEvent("error",[b,c]);return}if(a==null)this.onFailure();else this.onSuccess(a,b)}});var Cookie=new Class({Implements:Options,options:{path:"/",domain:!1,duration:!1,secure:!1,document:document,encode:!0},initialize:function(b,a){this.key=b;this.setOptions(a)},write:function(b){this.options.encode&&(b=encodeURIComponent(b));this.options.domain&&(b=b+("; domain="+this.options.domain));this.options.path&&(b=b+("; path="+this.options.path));if(this.options.duration){var a=new Date;a.setTime(a.getTime()+this.options.duration*864E5);b=b+("; expires="+a.toGMTString())}this.options.secure&&(b=b+"; secure");this.options.document.cookie=this.key+"="+b;return this},read:function(){var b=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.escapeRegExp()+"=([^;]*)");return b?decodeURIComponent(b[1]):null},dispose:function(){(new Cookie(this.key,Object.merge({},this.options,{duration:-1}))).write("");return this}});Cookie.write=function(b,a,c){return(new Cookie(b,c)).write(a)};Cookie.read=function(b){return(new Cookie(b)).read()};Cookie.dispose=function(b,a){return(new Cookie(b,a)).dispose()};(function(b,a){var c,d,e=[],f,g,i=a.createElement("div"),j=function(){clearTimeout(g);if(!c){Browser.loaded=c=true;a.removeListener("DOMContentLoaded",j).removeListener("readystatechange",m);a.fireEvent("domready");b.fireEvent("domready")}},m=function(){for(var a=e.length;a--;)if(e[a]()){j();return true}return false},h=function(){clearTimeout(g);m()||(g=setTimeout(h,10))};a.addListener("DOMContentLoaded",j);var k=function(){try{i.doScroll();return true}catch(a){}return false};if(i.doScroll&&!k()){e.push(k);f=true}a.readyState&&e.push(function(){var b=a.readyState;return b=="loaded"||b=="complete"});"onreadystatechange"in a?a.addListener("readystatechange",m):f=true;f&&h();Element.Events.domready={onAdd:function(a){c&&a.call(this)}};Element.Events.load={base:"load",onAdd:function(a){d&&this==b&&a.call(this)},condition:function(){if(this==b){j();delete Element.Events.load}return true}};b.addEvent("load",function(){d=true})})(window,document);(function(){var b=this.Swiff=new Class({Implements:Options,options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:"high",allowScriptAccess:"always",wMode:"window",swLiveConnect:true},callBacks:{},vars:{}},toElement:function(){return this.object},initialize:function(a,c){this.instance="Swiff_"+String.uniqueID();this.setOptions(c);var c=this.options,d=this.id=c.id||this.instance,e=document.id(c.container);b.CallBacks[this.instance]={};var f=c.params,g=c.vars,i=c.callBacks,j=Object.append({height:c.height,width:c.width},c.properties),m=this,h;for(h in i){b.CallBacks[this.instance][h]=function(a){return function(){return a.apply(m.object,arguments)}}(i[h]);g[h]="Swiff.CallBacks."+this.instance+"."+h}f.flashVars=Object.toQueryString(g);if(Browser.ie){j.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";f.movie=a}else j.type="application/x-shockwave-flash";j.data=a;var d='<object id="'+d+'"',k;for(k in j)d=d+(" "+k+'="'+j[k]+'"');var d=d+">",o;for(o in f)f[o]&&(d=d+('<param name="'+
o+'" value="'+f[o]+'" />'));this.object=(e?e.empty():new Element("div")).set("html",d+"</object>").firstChild},replaces:function(a){a=document.id(a,true);a.parentNode.replaceChild(this.toElement(),a);return this},inject:function(a){document.id(a,true).appendChild(this.toElement());return this},remote:function(){return b.remote.apply(b,[this.toElement()].append(arguments))}});b.CallBacks={};b.remote=function(a,b){var d=a.CallFunction('<invoke name="'+b+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+"</invoke>");return eval(d)}})();


/*===============================
/media/system/js/core.js
================================================================================*/;
Joomla=window.Joomla||{},Joomla.editors=Joomla.editors||{},Joomla.editors.instances=Joomla.editors.instances||{},function(e,t){"use strict";e.submitform=function(e,n,r){n||(n=t.getElementById("adminForm")),e&&(n.task.value=e),n.noValidate=!r;var i=t.createElement("input");i.style.display="none",i.type="submit",n.appendChild(i).click(),n.removeChild(i)},e.submitbutton=function(t){e.submitform(t)},e.JText={strings:{},_:function(e,t){return typeof this.strings[e.toUpperCase()]!="undefined"?this.strings[e.toUpperCase()]:t},load:function(e){for(var t in e){if(!e.hasOwnProperty(t))continue;this.strings[t.toUpperCase()]=e[t]}return this}},e.replaceTokens=function(e){if(!/^[0-9A-F]{32}$/i.test(e))return;var n=t.getElementsByTagName("input"),r,i,s;for(r=0,s=n.length;r<s;r++)i=n[r],i.type=="hidden"&&i.value=="1"&&i.name.length==32&&(i.name=e)},e.isEmail=function(e){var t=/^[\w.!#$%&‚Äô*+\/=?^`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]{2,})+$/i;return t.test(e)},e.checkAll=function(e,t){if(!e.form)return!1;t=t?t:"cb";var n=0,r,i,s;for(r=0,s=e.form.elements.length;r<s;r++)i=e.form.elements[r],i.type==e.type&&i.id.indexOf(t)===0&&(i.checked=e.checked,n+=i.checked?1:0);return e.form.boxchecked&&(e.form.boxchecked.value=n),!0},e.renderMessages=function(n){e.removeMessages();var r=t.getElementById("system-message-container"),i,s,o,u,a,f,l;for(i in n){if(!n.hasOwnProperty(i))continue;s=n[i],o=t.createElement("div"),o.className="alert alert-"+i,u=e.JText._(i),typeof u!="undefined"&&(a=t.createElement("h4"),a.className="alert-heading",a.innerHTML=e.JText._(i),o.appendChild(a));for(f=s.length-1;f>=0;f--)l=t.createElement("p"),l.innerHTML=s[f],o.appendChild(l);r.appendChild(o)}},e.removeMessages=function(){var e=t.getElementById("system-message-container");while(e.firstChild)e.removeChild(e.firstChild);e.style.display="none",e.offsetHeight,e.style.display=""},e.isChecked=function(e,n){typeof n=="undefined"&&(n=t.getElementById("adminForm")),n.boxchecked.value+=e?1:-1;if(!n.elements["checkall-toggle"])return;var r=!0,i,s,o;for(i=0,o=n.elements.length;i<o;i++){s=n.elements[i];if(s.type=="checkbox"&&s.name!="checkall-toggle"&&!s.checked){r=!1;break}}n.elements["checkall-toggle"].checked=r},e.popupWindow=function(e,t,n,r,i){var s=(screen.width-n)/2,o=(screen.height-r)/2,u="height="+r+",width="+n+",top="+o+",left="+s+",scrollbars="+i+",resizable";window.open(e,t,u).window.focus()},e.tableOrdering=function(n,r,i,s){typeof s=="undefined"&&(s=t.getElementById("adminForm")),s.filter_order.value=n,s.filter_order_Dir.value=r,e.submitform(i,s)},window.writeDynaList=function(e,n,r,i,s){var o="<select "+e+">",u=r==i,a=0,f,l,c;for(l in n){if(!n.hasOwnProperty(l))continue;c=n[l];if(c[0]!=r)continue;f="";if(u&&s==c[1]||!u&&a===0)f='selected="selected"';o+='<option value="'+c[1]+'" '+f+">"+c[2]+"</option>",a++}o+="</select>",t.writeln(o)},window.changeDynaList=function(e,n,r,i,s){var o=t.adminForm[e],u=r==i,a,f,l,c;while(o.firstChild)o.removeChild(o.firstChild);a=0;for(f in n){if(!n.hasOwnProperty(f))continue;l=n[f];if(l[0]!=r)continue;c=new Option,c.value=l[1],c.text=l[2];if(u&&s==c.value||!u&&a===0)c.selected=!0;o.options[a++]=c}o.length=a},window.radioGetCheckedValue=function(e){if(!e)return"";var t=e.length,n;if(t===undefined)return e.checked?e.value:"";for(n=0;n<t;n++)if(e[n].checked)return e[n].value;return""},window.getSelectedValue=function(e,n){var r=t[e][n],i=r.selectedIndex;return i!==null&&i>-1?r.options[i].value:null},window.listItemTask=function(e,n){var r=t.adminForm,i=0,s,o=r[e];if(!o)return!1;for(;;){s=r["cb"+i];if(!s)break;s.checked=!1,i++}return o.checked=!0,r.boxchecked.value=1,window.submitform(n),!1},window.submitbutton=function(t){e.submitbutton(t)},window.submitform=function(t){e.submitform(t)},window.saveorder=function(e,t){window.checkAll_button(e,t)},window.checkAll_button=function(n,r){r=r?r:"saveorder";var i,s;for(i=0;i<=n;i++){s=t.adminForm["cb"+i];if(!s){alert("You cannot change the order of items, as an item in the list is `Checked Out`");return}s.checked=!0}e.submitform(r)}}(Joomla,document);