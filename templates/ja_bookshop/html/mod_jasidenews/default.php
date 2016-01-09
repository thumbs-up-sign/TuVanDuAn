<?php
/**
 * ------------------------------------------------------------------------
 * JA Bookshop Template
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - Copyrighted Commercial Software
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites:  http://www.joomlart.com -  http://www.joomlancers.com
 * This file may not be redistributed in whole or significant part.
 * ------------------------------------------------------------------------
 */
// no direct access
defined('_JEXEC') or die('Restricted access');
?>
<div class="ja-sidenews-list clearfix">
	<?php foreach( $list as $item ) :
		$item->date = null;
		if( $showdate) {
			//$item->date =  strtotime ( $item->modified ) ? $item->created : $item->modified;
			$item->date = ($item->modified != '' && $item->modified != '0000-00-00 00:00:00') ? $item->modified : $item->created;
		}
		if(isset($item->text)){
			$item->text = $item->introtext . $item->text;
		}else{
			$item->text = $item->introtext;
		}
		

	?>
		<div class="ja-slidenews-item">
			
		  <?php if( $showimage ):  ?>
		  <div class="ja-slidenews-image">
		  <a href="<?php echo  $item->link; ?>">
  		  	<?php echo $helper->renderImage ($item, $params, $descMaxChars, $iwidth, $iheight ); ?>
  		</a>
  		<?php if( $showMoredetail ) : ?>
		  <a class="btn btn-primary" href="<?php echo  $item->link; ?>"> <i class="fa fa-external-link"></i></a>
		  <?php endif;?>
  		</div>
		  <?php endif; ?>
		  
		  <a class="ja-title" href="<?php echo  $item->link; ?>"><?php echo  $helper->trimString( $item->title, $titleMaxChars );?></a>
		  
		  <?php if (isset($item->date)) : ?>
				<span class="ja-createdate"><?php echo JHTML::_('date', $item->date, JText::_('DATE_FORMAT_LC4')); ?> </span>
			<?php endif; ?>
			
		  <?php if ($descMaxChars!=0) : ?>	
		  <p class="description">
			<?php echo $helper->trimString( strip_tags($item->introtext), $descMaxChars); ?>
			</p>
		  <?php endif;?>

		</div>
  <?php endforeach; ?>
</div>