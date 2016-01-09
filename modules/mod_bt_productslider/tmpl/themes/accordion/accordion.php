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

// no direct access

defined('_JEXEC') or die('Restricted access');

$document = JFactory::getDocument();

$itemsPerPages = $params->get( 'items_per_page', 5 );
$showArrow = $params->get( 'show_arrow', 1 );
$arrowPosition = $params->get('arrow_position', 'right');
$activateFirst = $params->get( 'activate_first', 1 );
$vertical = $params->get('slide_direction') != 'vertical' ? false : true;
$effect = $params->get('slide_effect');

//Get pages list array
$pages = null;
$totalPages = 0;

if($list) {
    $pages = array_chunk( $list, $itemsPerPages  );
    $totalPages = count($pages);
}

$nextBackPosition = $params->get('next_back_position');
$navigationType = $params->get('navigation_type');
$navigationPosition = $params->get('navigation_position');
$slide_item_per_time = $params->get('slide_item_per_time', 1);
?>

<?php if(count($list)>0) : ?>
<div class="accordionLayout" style="width:<?php echo $moduleWidthWrapper;?>; ">
	<div id="btproductslider<?php echo $module->id; ?>" class="bt-productslider<?php echo $moduleclass_sfx? ' bt-productslider'.$params->get('moduleclass_sfx'):'';?>">
		<?php 
		$add_style = "";
		if( trim($params->get('content_title')) ){
		$add_style= "border: 1px solid #CFCFCF;";
		?>
		<h3>
			<?php if($params->get('content_title_link')) {?>
			<a href="<?php echo $params->get('content_title_link');?>"><span><?php echo $params->get('content_title') ?> </span></a>
			<?php } else { ?>
			<span><?php echo $params->get('content_title') ?> </span>                    
			<?php   }?>
		</h3>
		<?php } ?>
		<div  style="width:<?php echo $moduleWidth.";".$add_style;?>">
			<?php if($totalPages > 1 && $nextBackPosition == 'flanks'){?>
			<div class="btproductslider-prev"></div>
			<div class="btproductslider-next"></div>
			<?php } 
			//if both of navigation and button are showed and their position is top
			if($totalPages > 1 && (($nextBackPosition == 'top') || ($navigationPosition == 'top'))){ ?>
			<div id="btproductslider-control">
				<?php 
				//show prev button first if available
				if($nextBackPosition == 'top'){
				?>
				<div class="btproductslider-next"></div>
				<?php
				}
				//show navigation
				if($navigationPosition == 'top'){
				?>
				<div class="btproductslider-navigation"></div>
				<?php
				}
				?>
				<?php 
				//show next button if available
				if($nextBackPosition == 'top'){
				?>
				<div class="btproductslider-prev"></div>
				<?php
				}
				?>
				<div style="clear: both;"></div>
			</div>
			<?php 
			}
			?>
			<ul id="btproductslider<?php echo $module->id; ?>_jcarousel" class="jcarousel jcarousel-skin-tango">
				<?php foreach( $pages as $key => $list ): ?>
				<li>
                    <?php foreach( $list as $i => $row ): ?>
					<div class="bt-row <?php if($i==0) {echo 'bt-row-first'; if($activateFirst) echo ' actived';} if($i==count($list)-1) echo ' bt-row-last';  ?>"  >
						<div class="bt-inner">
                                            
                                            <?php if( $showTitle ): ?>
						<a class="bt-title" target="<?php echo $openTarget; ?>"
							title="<?php echo $row->name; ?>"
							href="<?php echo $row->link;?>"
                                                > 
                                                    <?php echo $row->name; ?> 
                                                    <?php if($showArrow){?>
                                                    <img src="<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button.png' ?>" alt=""/>
                                                    <?php }?>
                                                </a>
						<?php endif; ?>
                                            <div class="bt-inner-wrapper">
                                            <?php if( $show_category_name ): ?>
                                            <?php if($show_category_name_as_link) : ?>
                                                    <a class="bt-category" target="<?php echo $openTarget; ?>"
                                                            title="<?php echo $row->category_name; ?>"
                                                            href="<?php echo $row->category_link;?>"> <?php echo $row->category_name; ?>
                                                    </a>
                                                    <?php else :?>
                                                    <span class="bt-category"> <?php echo $row->category_name; ?> </span>
                                                    <?php endif; ?>
                                                    <?php endif; ?>


                                                    <?php if( $row->thumbnail): ?>
                                                    
                                                    <div style="text-align:<?php echo $align_image?>">
                                                    <a target="<?php echo $openTarget; ?>"
                                                            class="bt-image-link"
                                                            title="<?php echo $row->name;?>" href="<?php echo $row->link;?>">
                                                            <img <?php echo $imgClass ?> src="<?php echo $row->thumbnail; ?>" alt="<?php echo $row->name?>"  style="width:<?php echo $thumbWidth ;?>px; <?php echo ($align_image != 'center') ? 'float: '. $align_image : '';?>;" title="<?php echo $row->name?>" />
                                                    </a>
                                                    </div>
                                                    <?php endif ; ?>
                                                    <?php if($showPrice):?>
                                            <div class="bt-prices">
                                            <?php if($row->old_price && $row->sales_price != $row->old_price ):?>
                                                <span class="bt-prices-oldPrice"><?php echo  $row->old_price ?></span>
                                            <?php endif;?>
                                            <?php if($row->sales_price):?>
                                                <span class="bt-prices-salesPrice"><?php echo  $row->sales_price ?></span>
                                            <?php endif;?>
                                            </div>    
                                        <?php endif;?>
                                                    <?php if( $showManufacturer || $showDate ): ?>
                                                    <div class="bt-extra">
                                                    <?php if( $showManufacturer ): ?>
                                                            <span class="bt-author"><?php 	echo JText::sprintf('BT_CREATEDBY' , '<a href="' . $row->manufacturer_link . '">' . $row->manufacturer_name . '</a>')?></span>
                                                            </span>
                                                            <?php endif; ?>
                                                            <?php if( $showDate ): ?>
                                                            <span class="bt-date"><?php echo JText::sprintf('BT_CREATEDON', $row->date); ?>
                                                            </span>
                                                            <?php endif; ?>
                                                    </div>
                                                    <?php endif; ?>
<?php if($showRating || $showReviewCount): ?>
						<div class="bt-extra">
							<?php if($showRating) { echo $row->ratingSpan; }?>
							<?php if($showReviewCount) : ?>
							<span class="bt-review-count"><?php echo JText::sprintf('BT_REVIEW_COUNT', $row->review_count ? $row->review_count : 0); ?></span>
							<?php endif; ?>
						</div>
						<?php endif; ?>
                                                    <?php if( $show_intro ): ?>
                                                    <div class="bt-introtext">
                                                    <?php echo $row->description; ?>
                                                    </div>
                                                    <?php endif; ?>

                                                    <?php if( $showViewDetails || $showAddToCart ) : ?>
                                                    <div class="bt-buttons">
                                                        <div class="bt-buttons-wrapper">
                                                        <?php if($showViewDetails && $row->link):?>
                                                            <a class="bt-viewdetails" target="<?php echo $openTarget; ?>"
                                                                    title="<?php sprintf(JText::_('VIEW_DETAILS_OF'), $row->name);?>"
                                                                    href="<?php echo $row->link;?>"> <?php echo JText::_('VIEW_DETAILS');?>
                                                            </a>
                                                        <?php endif;?>
                                                        <?php if($showAddToCart && $row->add_to_cart) echo $row->add_to_cart;?>
                                                        </div>
                                                    </div>
                                                    <?php endif; ?>
                                            </div>
					</div>
					<!-- bt-inner -->
				</div>
				<!-- bt-row -->
				<?php endforeach; ?>
                                 
                        </li>
                    <?php endforeach; ?>    
                    </ul> 
                    <?php
                    //if both of navigation and button are showed and their position is bottom
                    if($totalPages > 1 && (($nextBackPosition == 'bottom') || ($navigationPosition == 'bottom'))){
                        
                    ?>
                    <div id="btproductslider-control">
                        <?php 
                        //show prev button first if available
                        if($nextBackPosition == 'bottom'){
                        ?>
                        <div class="btproductslider-next"></div>
                        <?php
                        }
                        
                        //show navigation
                        if($navigationPosition == 'bottom'){
                        ?>
                        <div class="btproductslider-navigation">
                            
                        </div>
                        <?php
                        }
                        ?>
                        <?php 
                        //show next button if available
                        if($nextBackPosition == 'bottom'){
                        ?>
                        <div class="btproductslider-prev"></div>
                        <?php
                        }
                        ?>
                        <div style="clear: both;"></div>
                    </div>
                    <?php 
                    }
                    ?>
		</div>
			<!-- bt-main-item page	-->
	</div>
	<!-- bt-container -->


</div>
			<?php else : ?>
<div>No result...</div>
			<?php endif; ?>
<div style="clear: both;"></div>

<?php 
//add style for layout
$css = '';
$moduleCssId = '#btproductslider'. $module->id;
if( $totalPages  > 1 ): ?>
<?php 
    
    $css = '';

    if ($nextBackPosition == 'flanks'){
        $css.=  $moduleCssId.' .btproductslider-prev{ position: absolute; left: -15px; top: 48%;} ';
        $css.=  $moduleCssId.' .btproductslider-next{ position: absolute; right: -15px; top: 48%;} ';
    }

?>
       
<script type="text/javascript">
    $B(document).ready(function(){
        var moduleID = '#btproductslider<?php echo $module->id; ?>';
        //calculate li with
        $B(moduleID + ' .jcarousel li').width($B(moduleID + ' .jcarousel').width());   
        <?php if($activateFirst){?>
        //actived first
        jQuery(moduleID + ' .bt-row.actived').find('.bt-inner-wrapper').show(0, function(){
                $B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_contentshowcase/tmpl/themes/accordion/images/button-active.png' ?>');
            }
        ); 
		<?php } ?>

        var originalHeight = 0;
        // calculate height for jcarousel li before init jcarousel
        <?php if(!$vertical || $effect == 'fade'){?>
        $B(moduleID + ' .jcarousel li').each(function(){
            var self = $B(this);
            self.height(0);
            $B(this).find('.bt-row').each(function(){

                var height = $B(this).height() +
                                parseInt($B(this).css('margin-top')) +   
                                parseInt($B(this).css('margin-bottom')) +
                                parseInt($B(this).css('padding-top')) +
                                parseInt($B(this).css('padding-bottom'));

                self.height(self.height() + height);    

            });
            if($B(this).index() == 0 ) originalHeight = $B(this).height();
        });
        <?php } else {?>
        var height = 0;
        $B(moduleID + ' .jcarousel li').eq(0).find('.bt-row').each(function(){
            height += $B(this).height() +
                                parseInt($B(this).css('margin-top')) +   
                                parseInt($B(this).css('margin-bottom')) +
                                parseInt($B(this).css('padding-top')) +
                                parseInt($B(this).css('padding-bottom'));

        });
        $B(moduleID + ' .jcarousel li').height(height);
        originalHeight = height;
        <?php } ?>

        //init jcarousel
        $B(moduleID + ' .jcarousel').jcarousel({
            initCallback: function(carousel, state){
                $B(carousel.clip[0]).height(originalHeight);
				
                <?php if($moduleWidth == 'auto' && $vertical) {?>
                    $B(window).resize(function(){
						$B(moduleID + ' .jcarousel li').width($B(moduleID + ' .jcarousel').width());
					});	
					$B(window).resize();
                      
				<?php } ?>
					//if module's width is
				renderNavigation(carousel, moduleID);

                //stop auto when click bt-title
                $B(moduleID + ' .bt-title').click(function(){
                    carousel.stopAuto();
                    carousel.options.auto = 10000;
                });

                <?php 
                //hook next and prev
                if($nextBackPosition){?>     
                var prev = moduleID + ' .btproductslider-prev';
                var next = moduleID + ' .btproductslider-next';



                $B(prev).unbind('click').click(function(){
                    btproductsliderAjustHeight(carousel, originalHeight);
                    carousel.prev();
                    carousel.stopAuto();
                    carousel.options.auto = 10000;
                    return false;
                });

                $B(next).unbind('click').click(function(){
                    btproductsliderAjustHeight(carousel, originalHeight);
                    carousel.next(); 
                    carousel.stopAuto();
                    carousel.options.auto = 10000;
                    return false;
                });
                <?php }?>

                <?php 
                //if turn on pause_hover
                if($params->get('pause_hover')){ ?>
                btproductsliderHoverCallback(carousel, state);
                <?php } ?>
            },

            itemLoadCallback: {
                <?php if($effect == 'fade'){?>    
                onBeforeAnimation : function(carousel, state){

                    if(state != 'init'){
                        var containerID = carousel.clip.context.id;
                        $B('#' + containerID).fadeOut(500);
                    }

                },    
                <?php }?> 

                onAfterAnimation: function(carousel, state){
                    if(state != 'init'){
                        var jCarouselClip = $B(moduleID + '').find('.jcarousel-clip');
                        var loadedLi = jCarouselClip.find('.jcarousel .jcarousel-item-' + carousel.first);
                        var liHeight = 0;

                        <?php 
                        //if effect is fade
                        if($effect == 'fade'){?>

                        var containerID = carousel.clip.context.id;

                        $B('#' + containerID).fadeIn(500, function(){
                            loadedLi.find('.bt-row').each(function(){

                                liHeight += $B(this).height() +
                                            parseInt($B(this).css('margin-top')) +   
                                            parseInt($B(this).css('margin-bottom')) +
                                            parseInt($B(this).css('padding-top')) +
                                            parseInt($B(this).css('padding-bottom'));

                            });

                            if(liHeight != jCarouselClip.height()){

                                    $B(moduleID + ' .jcarousel').height(liHeight);
                            }
                            jCarouselClip.animate({height: liHeight}, carousel.options.animation);
                        });
                        <?php } else{?>   

                        /**
                        * Ajust height for current item
                        */


                        loadedLi.find('.bt-row').each(function(){

                            liHeight += $B(this).height() +
                                        parseInt($B(this).css('margin-top')) +   
                                        parseInt($B(this).css('margin-bottom')) +
                                        parseInt($B(this).css('padding-top')) +
                                        parseInt($B(this).css('padding-bottom'));

                        });
                        if(liHeight > 0)
                        jCarouselClip.animate({height: liHeight}, carousel.options.animation);


                        <?php } ?>

                        // dành cho verical và horizontal nhưng không dành cho fade
                        <?php if($effect != 'fade'){?>
                        if(liHeight != jCarouselClip.height() && liHeight != 0){
                            if(!carousel.options.vertical) 
                                $B(moduleID + ' .jcarousel').height(liHeight);
                        }
                        <?php } ?>
                        /**
                        * Re-caculate height of items
                        */  
                        <?php if($vertical){?>
                        $B(moduleID + ' .jcarousel li').height(originalHeight); 
                        <?php }?>
                        }
                        <?php if($navigationPosition) {?>
                    var size = carousel.options.size;
                    var index = carousel.first;
                    
                    $B(moduleID + ' .btproductslider-navigation a').removeClass('current');
                    if($B(moduleID + ' .btproductslider-navigation a.<?php echo $navigationType?>-' + index).length == 0){
                        var last = carousel.last;
                        while (last > size){
                            last -=size;
                        }
                        if( last == size){
                            $B(moduleID + ' .btproductslider-navigation a').last().addClass('current');
                        }else{


                            var lastNavigation;
                            do {
                                last--;
                                lastNavigation = $B(moduleID + ' .btproductslider-navigation a.<?php echo $navigationType?>-' + last);
                                if(last <=0) break;
                            } while(lastNavigation.length == 0);

                            lastNavigation.addClass('current');
                            
                        }
                    }else{
                        $B(moduleID + ' .btproductslider-navigation a.<?php echo $navigationType?>-' + index).addClass('current');
                    }
                <?php }?>

                }

            },


            auto: <?php echo ($params->get('auto_start')) ? $params->get('interval', 5000) : '0' ?>,
            animation: <?php echo (int)$params->get('duration', '1000')?>,
            buttonNextHTML: null,
            buttonPrevHTML: null,
            scroll : <?php echo $slide_item_per_time ?>,
            vertical: <?php echo ($vertical && $effect == 'scroll') ? 'true' : 'false' ?>,
            wrap : 'both',
			<?php if(!$vertical){?>
			visible : 1,
			<?php } ?>
            rtl: <?php echo $params->get('rtl') ? 'true' : 'false'?>               
        });

    });
    <?php if($params->get('pause_hover')){ ?>
    function btproductsliderHoverCallback(carousel, state){
        carousel.clip.hover(function() {
            carousel.stopAuto();
        }, function() {
            carousel.startAuto();
        });
    }
    <?php } ?>
    function btproductsliderAjustHeight(carousel, originalHeight){
        var jCarouselClip = $B('#btproductslider<?php echo $module->id; ?>').find('.jcarousel-clip');
        var jCarouselClipHeight = jCarouselClip.height();


        <?php if($vertical) { ?>
        <?php if($params->get('activate_first')){?>
        /**
            * Checked actived exist
            *
            */
        if(carousel.options.vertical){
            jCarouselClip.find('.jcarousel-item').each(function(){

                var hasActived = ($B(this).find('.bt-row.actived').length > 0) ? true : false;
                if(!hasActived){
                    $B(this).find('.bt-row').eq(0).addClass('actived').find('.bt-inner-wrapper').show(0, function(){
                        $B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button-active.png' ?>');
                        var increaseHeight = $B(this).height();
                        if (increaseHeight == null) increaseHeight = 0;
                        $B('#btproductslider<?php echo $module->id; ?> .jcarousel').height($B('#btproductslider<?php echo $module->id; ?> .jcarousel').height()   + increaseHeight);
                    });
                }
                $B(this).height(originalHeight);
                jCarouselClip.height(originalHeight);
            });
        }

        <?php } else {?>
        /**
            * Close actived
            */

        if(carousel.options.vertical){
            var btRowActived = $B('#btproductslider<?php echo $module->id; ?> .bt-row.actived');
            var btInnerWrapper = btRowActived.find('.bt-inner-wrapper');
            var height = btInnerWrapper.height();
            if (height == null) height = 0;

            $B('#btproductslider<?php echo $module->id; ?> .jcarousel').height($B('#btproductslider<?php echo $module->id; ?> .jcarousel').height()  - height);
            btRowActived.removeClass('actived');
            //btInnerWrapper.hide();
            btInnerWrapper.slideUp(carousel.animation);
            btInnerWrapper.prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button.png' ?>');
            //jCarouselClip.animate({height: originalHeight}, carousel.animation);
            jCarouselClip.height(originalHeight);
            jCarouselClip.find('.jcarousel-item').height(originalHeight);

        }
        <?php }?>
        <?php }?>
	}
	function renderNavigation(carousel, moduleID){
		<?php if($navigationPosition){?>
		if($B(moduleID + ' .btproductslider-navigation').html() != ''){
			$B(moduleID + ' .btproductslider-navigation').html('');
		}		
		var i = 1;
		var step = <?php echo $slide_item_per_time ?>;
		var size = $B(moduleID + ' .jcarousel li').length;
		if(step >=  size){
			$B(moduleID + ' .btproductslider-navigation').append('<a href="#" class="<?php echo $navigationType?> <?php echo $navigationType?>-' + (1) + '" rel="' + (1) + '">' + (1) + '</a>');
			$B(moduleID + ' .btproductslider-navigation').append('<a href="#" class="<?php echo $navigationType?> <?php echo $navigationType?>-' + (size) + '" rel="' + (size) + '">' + (2) + '</a>');
		}else{
			$B(moduleID + ' .jcarousel li').each(function(){
				if((($B(this).index()) % step == 0)){
					$B(moduleID + ' .btproductslider-navigation').append('<a href="#" class="<?php echo $navigationType?> <?php echo $navigationType?>-' + ($B(this).index() + 1) + '" rel="' + ($B(this).index() + 1) + '">' + (i++) + '</a>');
					if($B(this).index() + 2 > size) return false;
					if($B(this).index() + 2 <= size && $B(this).index() + 1 + step > size){
						$B(moduleID + ' .btproductslider-navigation').append('<a href="#" class="<?php echo $navigationType?> <?php echo $navigationType?>-' + (size) + '" rel="' + (size) + '">' + (i) + '</a>');
					}
				}
			});
		}
		
		$B(moduleID + ' .btproductslider-navigation a').eq(0).addClass('current');
		$B(moduleID + ' .btproductslider-navigation').append('<div style="clear: both;"></div>');
		
		//hook navigation
		$B('.btproductslider-navigation a').bind('click', function() {
			if($B(this).hasClass('current')) return false;
			carousel.stopAuto();
			carousel.options.auto = 10000;
			$B(this).parent().find('.current').removeClass('current');
			$B(this).addClass('current');
			carousel.scroll($B.jcarousel.intval($B(this).attr('rel')));
			return false;
		});
		<?php } ?>
		return false;
	}

</script>
<?php else: ?>
<script type="text/javascript">	
	(function(){
		jQuery('#btproductslider<?php echo $module->id; ?>').fadeIn("fast");
	})();
</script>
<?php endif; ?>

<script type="text/javascript">	
/**
* Js for accordion
*/
$B = jQuery.noConflict();
$B(document).ready(function(){
var jCarouselClip = $B('#btproductslider<?php echo $module->id; ?>').find('.jcarousel-clip');

    var inProgress = false;
	
	var moduleID = '#btproductslider<?php echo $module->id; ?>';  
	<?php if($activateFirst){?>
	//actived first
	jQuery(moduleID + ' .bt-row.actived').find('.bt-inner-wrapper').show(0, function(){
			$B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_contentshowcase/tmpl/themes/accordion/images/button-active.png' ?>');
		}
	); 
	<?php } ?>
		
    $B('#btproductslider<?php echo $module->id; ?> .bt-title').click(function(){
        if(inProgress){
            return false;
        }
        inProgress = true;
        var jCarouselClipHeight = jCarouselClip.height();
        var decreaseHeight = 0;
        var increaseHeight = 0;
        if(!$B(this).parent().parent().hasClass('actived')){
            decreaseHeight = $B(this).parent().parent().parent().find('.actived').find('.bt-inner-wrapper').height();
            if (decreaseHeight == null) decreaseHeight = 0;
            $B(this).parent().parent().parent().find('.actived')
                .removeClass('actived').find('.bt-inner-wrapper').slideUp(300, function(){
                    $B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button.png' ?>');

                });
            $B(this).parent().parent().addClass('actived');    
            $B(this).next().slideDown(300, function(){
                $B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button-active.png' ?>');
                <?php if($totalPages > 1){?>
                increaseHeight = $B(this).height();
                if (increaseHeight == null) increaseHeight = 0;
                $B('#btproductslider<?php echo $module->id; ?> .jcarousel').height($B('#btproductslider<?php echo $module->id; ?> .jcarousel').height()   + increaseHeight - decreaseHeight);
                $B(this).parent().parent().parent().height(jCarouselClipHeight  + increaseHeight - decreaseHeight);
                jCarouselClip.animate({height: jCarouselClipHeight  + increaseHeight - decreaseHeight}, 200);
                <?php } ?>
                inProgress = false;
            });
        }else{
            var height = $B(this).parent().parent().find('.bt-inner-wrapper').height();
            if (height == null) height = 0;
            $B(this).parent().parent()
                .removeClass('actived')
                .find('.bt-inner-wrapper')
                .slideUp(300, function(){
                    $B(this).prev().find('img').attr('src', '<?php echo JURI::root() . 'modules/mod_bt_productslider/tmpl/themes/accordion/images/button.png' ?>');
                    <?php if($totalPages > 1){?>
                    $B('#btproductslider<?php echo $module->id; ?> .jcarousel').height($B('#btproductslider<?php echo $module->id; ?> .jcarousel').height()  - height);
                    $B(this).parent().parent().parent().height(jCarouselClipHeight   - height);
                    jCarouselClip.animate({height: jCarouselClipHeight  - height}, 200);
                    <?php } ?>
                    inProgress = false;
                });
        }

        return false;
    });
});
</script>    
<?php 
if($showArrow)
    $css.= $moduleCssId . ' .bt-title img{ outline: none; vertical-align: middle; float: '. $arrowPosition . ';} ';
$css .= $moduleCssId . ' .bt-inner .bt-inner-wrapper{ width: '. ($moduleWidth - 20) .'px;' . ($params->get('item_height') ? 'height: '. $params->get('item_height') . 'px;' : '') . '} ';     



if($align_image != 'center')
        $css.= $moduleCssId . ' .bt-inner .bt-title-nointro, '. $moduleCssId . ' .bt-inner .bt-introtext, ' . $moduleCssId . ' .bt-inner .bt-extra, ' . $moduleCssId . ' .bt-inner .readmore{ margin-' . $align_image . ': '. ($thumbWidth + 10) .'px;} ';
    
    $document->addStyleDeclaration($css);
?>
  