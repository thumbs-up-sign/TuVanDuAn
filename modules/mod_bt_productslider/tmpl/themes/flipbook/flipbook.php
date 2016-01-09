<?php
/**
 * @package 	mod_bt_productslider - BT ProductSlider Module
 * @version		1.0
 * @created		Sep 2012
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

// ROW * COL
$itemsPerCol = (int) $params->get('items_per_cols', 1);

$itemPerLi = $itemsPerCol;

//Get pages list array
$pages = array_chunk($list, $itemPerLi);

?>
<?php if (count($list) > 0) : ?>
<div class="flipbookLayout">
	<?php if( trim($params->get('content_title')) ): ?>
	<div class="flipbookTitle">
		<h3>
			  <?php if($params->get('content_title_link')) {?>
                        <a href="<?php echo $params->get('content_title_link');?>"><span><?php echo $params->get('content_title') ?> </span></a>
                    <?php } else { ?>
                        <span><?php echo $params->get('content_title') ?> </span>                    
                    <?php   }?>
		</h3>
	</div>
	<?php endif; ?>
	<div class="loading"></div>
	<div id="flipbook<?php echo $module->id; ?>" style="display:none"
		class="flipbook<?php echo $moduleclass_sfx ? ' flipbook' . $moduleclass_sfx : ''; ?>">
		
		<?php foreach ($pages as $key => $list) : ?>
		<div class="bt-row">
		<?php foreach ($list as $i => $row) : ?>
				<div class="bt-inner">
					<?php if ($row->thumbnail && $align_image != 'center')
								{
					?>
					<div class="bt-image" style="float: <?php echo $align_image; ?>;">
						<a target="<?php echo $openTarget; ?>" class="bt-image-link"
							title="<?php echo $row->name; ?>"
							href="<?php echo $row->link; ?>"> <img
							<?php echo $imgClass ?> src="<?php echo $row->thumbnail; ?>"
							alt="<?php echo $row->name ?>"
							style="width:<?php echo $thumbWidth; ?>px;"
							title="<?php echo $row->name ?>" /> </a>
							
					</div>
					<?php } ?>
					<?php if ($show_category_name) : ?>
					<?php if ($show_category_name_as_link) : ?>
					<div class="bt-link"><a class="bt-category" target="<?php echo $openTarget; ?>"
						title="<?php echo $row->category_name; ?>"
						href="<?php echo $row->category_link; ?>"> <?php echo $row->category_name; ?>
					</a></div>
					<?php
									else :
					?>
					<span class="bt-category"> <?php echo $row->category_name; ?>
					</span>
					<?php endif; ?>
					<?php endif; ?>
					<?php if ($showTitle) : ?>
					<div class="bt-link">
					<a class="bt-title" target="<?php echo $openTarget; ?>"
						title="<?php echo $row->name; ?>" href="<?php echo $row->link; ?>">
						<?php echo $row->name; ?> </a></div>
					<?php endif; ?>
					<?php if ($row->thumbnail) : ?>
					<?php if ($row->thumbnail && $align_image == 'center')
									{
					?>
					<div style="text-align: center">
						<a target="<?php echo $openTarget; ?>" class="bt-image-link"
							title="<?php echo $row->name; ?>"
							href="<?php echo $row->link; ?>"> <img
							<?php echo $imgClass ?> src="<?php echo $row->thumbnail; ?>"
							alt="<?php echo $row->name ?>"
							style=" width:<?php echo $thumbWidth; ?>px;"
							title="<?php echo $row->name ?>" /> </a>
					</div>
					<?php } ?>
					<?php endif; ?>
					<?php if ($showPrice) : ?>
					<div class="bt-prices">
						<?php if ($row->old_price && $row->sales_price != $row->old_price) : ?>
						<span class="bt-prices-oldPrice"><?php echo $row->old_price ?>
						</span>
						<?php endif; ?>
						<?php if ($row->sales_price) : ?>
						<span class="bt-prices-salesPrice"><?php echo $row->sales_price ?>
						</span>
						<?php endif; ?>
					</div>
					<?php endif; ?>
					<?php if ($showManufacturer || $showDate) : ?>
					<div class="bt-extra">
						<?php if ($showManufacturer) : ?>
						<span class="bt-author"><?php 	echo JText::sprintf('BT_CREATEDBY' , '<a href="' . $row->manufacturer_link . '">' . $row->manufacturer_name . '</a>')?></span>
						</span>
						<?php endif; ?>
						<?php if ($showDate && $row->date) : ?>
						<span class="bt-date"><?php echo JText::sprintf('BT_CREATEDON', $row->date); ?>
						</span>
						<?php endif; ?>
					</div>
					<?php endif; ?>
					<?php if ($show_intro) : ?>
					<div class="bt-introtext">
						<?php echo $row->description; ?>
					</div>
					<?php endif; ?>
					<?php if ($showViewDetails || $showAddToCart) : ?>
					<div class="bt-buttons">
						<div class="bt-buttons-wrapper">
							<?php if ($showViewDetails && $row->link) : ?>
							<a class="bt-viewdetails" target="<?php echo $openTarget; ?>"
								title="<?php sprintf(JText::_('VIEW_DETAILS_OF'), $row->name); ?>"
								href="<?php echo $row->link; ?>"> <?php echo JText::_('VIEW_DETAILS'); ?>
							</a>
							<?php endif; ?>
							<?php if ($showAddToCart && $row->add_to_cart)
												echo $row->add_to_cart;
							?>
						</div>
					<?php endif; ?>
				</div>
				<!-- bt-inner -->
			</div>
		<?php endforeach; ?>
		</div>
		<?php endforeach; ?>
	</div>
	<!-- bt-container -->
</div>

<script type="text/javascript">
(function(){
	var img = new Image();
	$B(img).load(function(){
		$B('.flipbookLayout .loading').remove();
		$B('#flipbook<?php echo $module->id; ?>').show();
		$B('#flipbook<?php echo $module->id; ?>').booklet({
			width:  '100%',
			height: '100%',
			tabs: <?php echo $params->get('flipbook_nextback',1) ?>,
			previousControlText: 'Back',
			nextControlText: 'Next',
			pageNumbers: <?php echo $params->get('flipbook_pagenumber',1) ?>,
			pagePadding: 0,
			direction:'<?php echo $params->get('rtl')? 'RTL':'LTR' ?>',
			auto:<?php echo $params->get('auto_start',0) ?>,
			speed:<?php echo $params->get('duration',1000) ?>,
			delay:<?php echo $params->get('interval',3)*1000 ?>,
			pauseHover:<?php echo $params->get('pause_hover',1) ?>
		});
	}).error(function () {
		alert('invalid image');
	}).attr('src',$B('#flipbook<?php echo $module->id; ?> img:first').attr('src'));
})();
</script>

<?php
else :
?>
<div>No result...</div>
<?php endif; ?>
<div style="clear: both;"></div>
