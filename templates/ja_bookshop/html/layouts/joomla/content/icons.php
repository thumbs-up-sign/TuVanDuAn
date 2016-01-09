<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

$canEdit = $displayData['params']->get('access-edit');

?>

<?php if (empty($displayData['print'])) : ?>

	<?php if ($canEdit || $displayData['params']->get('show_print_icon') || $displayData['params']->get('show_email_icon')) : ?>
		<div class="article-action pull-right">

			<?php // Note the actions class is deprecated. Use dropdown-menu instead. ?>
				<?php if ($displayData['params']->get('show_print_icon')) : ?>
					<div class="print-icon"> <?php echo JHtml::_('icon.print_popup', $displayData['item'], $displayData['params']); ?> </div>
				<?php endif; ?>
				<?php if ($displayData['params']->get('show_email_icon')) : ?>
					<div class="email-icon"> <?php echo JHtml::_('icon.email', $displayData['item'], $displayData['params']); ?> </div>
				<?php endif; ?>
				<?php if ($canEdit) : ?>
					<div class="edit-icon"> <?php echo JHtml::_('icon.edit', $displayData['item'], $displayData['params']); ?> </div>
				<?php endif; ?>
		</div>
	<?php endif; ?>

<?php else : ?>

	<div class="pull-right">
		<?php echo JHtml::_('icon.print_screen', $displayData['item'], $displayData['params']); ?>
	</div>

<?php endif; ?>