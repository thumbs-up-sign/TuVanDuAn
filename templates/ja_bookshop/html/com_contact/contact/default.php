<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_contact
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$cparams = JComponentHelper::getParams('com_media');

jimport('joomla.html.html.bootstrap');
?>
<div class="contact<?php echo $this->pageclass_sfx ?>">
<?php if ($this->params->get('show_page_heading')) : ?>
	<h1><?php echo $this->escape($this->params->get('page_heading')); ?></h1>
<?php endif; ?>

<div class="contact-wrap clearfix">

<?php if ($this->params->get('show_contact_category') == 'show_no_link') : ?>
	<h4><span class="contact-category"><?php echo $this->contact->category_title; ?></span></h4>
<?php endif; ?>

<?php if ($this->params->get('show_contact_category') == 'show_with_link') : ?>
	<?php $contactLink = ContactHelperRoute::getCategoryRoute($this->contact->catid); ?>
	<h4>
				<span class="contact-category"><a href="<?php echo $contactLink; ?>">
						<?php echo $this->escape($this->contact->category_title); ?></a>
				</span>
	</h4>
<?php endif; ?>

<?php if ($this->params->get('show_contact_list') && count($this->contacts) > 1) : ?>
	<form action="#" method="get" name="selectForm" id="selectForm">
		<?php echo JText::_('COM_CONTACT_SELECT_CONTACT'); ?>
		<?php echo JHtml::_('select.genericlist', $this->contacts, 'id', 'class="input" onchange="document.location.href = this.value"', 'link', 'name', $this->contact->link); ?>
	</form>
<?php endif; ?>

<?php if ($this->params->get('show_tags', 1) && !empty($this->item->tags)) : ?>
	<?php $this->item->tagLayout = new JLayoutFile('joomla.content.tags'); ?>
	<?php echo $this->item->tagLayout->render($this->item->tags->itemTags); ?>
<?php endif; ?>

<?php if ($this->params->get('presentation_style') == 'sliders') : ?>
<div class="accordion" id="slide-contact">
<div class="accordion-group">
<div class="accordion-heading">
	<a class="accordion-toggle" data-toggle="collapse" data-parent="#slide-contact" href="#basic-details">
		<?php echo JText::_('COM_CONTACT_DETAILS'); ?>
	</a>
</div>
<div id="basic-details" class="accordion-body collapse in">
	<div class="accordion-inner">
		<?php endif; ?>

		<?php if ($this->params->get('presentation_style') == 'tabs'): ?>
		<ul class="nav nav-tabs" id="contact-tab">
			<li class="active"><a data-toggle="tab"
								  href="#basic-details"><?php echo JText::_('COM_CONTACT_DETAILS'); ?></a></li>
			<?php if ($this->params->get('show_email_form') && ($this->contact->email_to || $this->contact->user_id)) : ?>
				<li><a data-toggle="tab" href="#display-form"><?php echo JText::_('COM_CONTACT_EMAIL_FORM'); ?></a>
				</li><?php endif; ?>
			<?php if ($this->params->get('show_links')) : ?>
				<li><a data-toggle="tab" href="#display-links"><?php echo JText::_('COM_CONTACT_LINKS'); ?></a>
				</li><?php endif; ?>
			<?php if ($this->params->get('show_articles') && $this->contact->user_id && $this->contact->articles) : ?>
				<li><a data-toggle="tab" href="#display-articles"><?php echo JText::_('JGLOBAL_ARTICLES'); ?></a>
				</li><?php endif; ?>
			<?php if ($this->params->get('show_profile') && $this->contact->user_id && JPluginHelper::isEnabled('user', 'profile')) : ?>
				<li><a data-toggle="tab" href="#display-profile"><?php echo JText::_('COM_CONTACT_PROFILE'); ?></a>
				</li><?php endif; ?>
			<?php if ($this->contact->misc && $this->params->get('show_misc')) : ?>
				<li><a data-toggle="tab"
					   href="#display-misc"><?php echo JText::_('COM_CONTACT_OTHER_INFORMATION'); ?></a>
				</li><?php endif; ?>
		</ul>
		<div class="tab-content" id="contact-tab-content">
			<div id="basic-details" class="tab-pane active">
				<?php endif; ?>

				<?php if ($this->params->get('presentation_style') == 'plain' && (($this->params->get('address_check') > 0) &&
		($this->contact->address || $this->contact->suburb  || $this->contact->state || $this->contact->country || $this->contact->postcode))  ) : ?>
					<h4><?php echo JText::_('COM_CONTACT_DETAILS') ?></h4>
				<?php endif; ?>


				<?php if ($this->contact->con_position && $this->params->get('show_position')) : ?>
					<dl class="contact-position dl-horizontal">
						<dd>
							<?php echo $this->contact->con_position; ?>
						</dd>
					</dl>
				<?php endif; ?>

				<?php echo $this->loadTemplate('address'); ?>

				<?php if ($this->params->get('allow_vcard')) : ?>
					<?php echo JText::_('COM_CONTACT_DOWNLOAD_INFORMATION_AS'); ?>
					<a href="<?php echo JRoute::_('index.php?option=com_contact&amp;view=contact&amp;id=' . $this->contact->id . '&amp;format=vcf'); ?>">
						<?php echo JText::_('COM_CONTACT_VCARD'); ?></a>
				<?php endif; ?>

				<?php if ($this->contact->image && $this->params->get('show_image')) : ?>
					<div class="thumbnail">
						<?php echo JHtml::_('image', $this->contact->image, JText::_('COM_CONTACT_IMAGE_DETAILS'), array('align' => 'middle')); ?>
					</div>
				<?php endif; ?>

				<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
			</div>
		</div>
	</div>
	<?php endif; ?>
	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
</div>
<?php endif; ?>

<?php if ($this->params->get('show_links')) : ?>
	<?php echo $this->loadTemplate('links'); ?>
<?php endif; ?>

<?php if ($this->params->get('show_articles') && $this->contact->user_id && $this->contact->articles) : ?>
	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
		<div class="accordion-group">
		<div class="accordion-heading">
			<a class="accordion-toggle" data-toggle="collapse" data-parent="#slide-contact" href="#display-articles">
				<?php echo JText::_('JGLOBAL_ARTICLES'); ?>
			</a>
		</div>
		<div id="display-articles" class="accordion-body collapse">
		<div class="accordion-inner">
	<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
	<div id="display-articles" class="tab-pane">
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'plain'): ?>
		<?php echo '<h4>' . JText::_('JGLOBAL_ARTICLES') . '</h4>'; ?>
	<?php endif; ?>

	<?php echo $this->loadTemplate('articles'); ?>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
	</div>
	</div>
	</div>
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
		</div>
	<?php endif; ?>
<?php endif; ?>

<?php if ($this->params->get('show_profile') && $this->contact->user_id && JPluginHelper::isEnabled('user', 'profile')) : ?>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
		<div class="accordion-group">
		<div class="accordion-heading">
			<a class="accordion-toggle" data-toggle="collapse" data-parent="#slide-contact" href="#display-profile">
				<?php echo JText::_('COM_CONTACT_PROFILE'); ?>
			</a>
		</div>
		<div id="display-profile" class="accordion-body collapse">
		<div class="accordion-inner">
	<?php endif; ?>


	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
	<div id="display-profile" class="tab-pane">
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'plain'): ?>
		<h4><?php echo JText::_('COM_CONTACT_PROFILE') ?></h4>
	<?php endif; ?>

	<?php echo $this->loadTemplate('profile'); ?>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
	</div>
	</div>
	</div>
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
		</div>
	<?php endif; ?>
<?php endif; ?>

<?php if ($this->params->get('show_email_form') && ($this->contact->email_to || $this->contact->user_id)) : ?>

	<?php if ($this->params->get('presentation_style') == 'plain') : ?>
		<div class="row">
		<div class="contact-col2 col-md-6 col-sm-6 col-xs-12">
			<?php echo $this->loadTemplate('form'); ?>
		</div>
		<div class="contact-col2 col-md-6 col-sm-6 col-xs-12">
	<?php endif ?>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
	<div class="accordion-group">
	<div class="accordion-heading">
		<a class="accordion-toggle" data-toggle="collapse" data-parent="#slide-contact" href="#display-form">
			<?php echo JText::_('COM_CONTACT_EMAIL_FORM'); ?>
		</a>
	</div>
	<div id="display-form" class="accordion-body collapse">
	<div class="accordion-inner">
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
	<div id="display-form" class="tab-pane">
<?php endif; ?>
	<?php if ($this->params->get('presentation_style') == 'plain') { ?>
		<?php if ($this->contact->misc && $this->params->get('show_misc')) : ?>
				<div class="contact-misc">
					<h4><?php echo JText::_('TPL_COM_CONTACT_HEADER');?></h4>
					<?php echo $this->contact->misc; ?>
				</div>
		<?php endif ?>
	<?php }else{?>
	<?php echo $this->loadTemplate('form'); ?>
	<?php } ?>
	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
	</div>
	</div>
	</div>
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
	</div>
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'plain') : ?>
		</div>
		</div>
	<?php endif ?>
<?php endif ?>

<?php if ($this->contact->misc && $this->params->get('show_misc') && $this->params->get('presentation_style') != 'plain') : ?>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
		<div class="accordion-group">
		<div class="accordion-heading">
			<a class="accordion-toggle" data-toggle="collapse" data-parent="#slide-contact" href="#display-misc">
				<?php echo JText::_('COM_CONTACT_OTHER_INFORMATION'); ?>
			</a>
		</div>
		<div id="display-misc" class="accordion-body collapse">
		<div class="accordion-inner">
	<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
	<div id="display-misc" class="tab-pane">
<?php endif; ?>

	<?php if ($this->params->get('presentation_style') == 'plain'): ?>
		<?php echo '<h4>' . JText::_('COM_CONTACT_OTHER_INFORMATION') . '</h4>'; ?>
	<?php endif; ?>

	<div class="contact-miscinfo">
		<dl class="dl-horizontal">
			<dt>
				<span class="<?php echo $this->params->get('marker_class'); ?>">
					<?php echo $this->params->get('marker_misc'); ?>
				</span>
			</dt>
			<dd>
				<div class="contact-misc">
					<?php echo $this->contact->misc; ?>
				</div>
			</dd>
		</dl>
	</div>

	<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
	</div>
	</div>
	</div>
<?php endif; ?>
	<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
		</div>
	<?php endif; ?>

<?php endif; ?>

<?php if ($this->params->get('presentation_style') == 'sliders'): ?>
<script type="text/javascript">
	(function ($) {
		$('#slide-contact').collapse({ parent: false, toggle: true, active: 'basic-details'});
	})(jQuery);
</script>
</div>
<?php endif; ?>
<?php if ($this->params->get('presentation_style') == 'tabs') : ?>
<script type="text/javascript">
	(function ($) {
		if(typeof google != 'undefined' && typeof google.maps != 'undefined' && typeof objWidgetMap1 != 'undefined'){
			$('#contact-tab [data-toggle="tab"]').on('shown', function(){
				google.maps.event.trigger(objWidgetMap1.objMap, 'resize');
			});
		}
	})(jQuery);
</script>
</div>
<?php endif; ?>
</div>
</div>
