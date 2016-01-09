<?php
/**
 * @package   T3 Blank
 * @copyright Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license   GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
?>

<div id="back-to-top" class="back-to-top hidden-xs hidden-sm">
  <button class="btn btn-primary"><i class="fa fa-caret-up"></i>Top</button>
</div>

<!-- FOOTER -->
<footer id="t3-footer" class="wrap t3-footer">

	
		<!-- FOOT NAVIGATION -->
		<div class="container">
			<div class="row">
        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 footer-info">
          <?php if ($this->countModules('footer-info')) : ?>
              <jdoc:include type="modules" name="<?php $this->_p('footer-info') ?>" style="T3xhtml" />
          <?php endif ?>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-8 col-xs-12 footer-links">
          
            <?php if ($this->countModules('footer-subcribe')) : ?>
              <jdoc:include type="modules" name="<?php $this->_p('footer-subcribe') ?>" style="T3xhtml" />
            <?php endif ?>
          
            <?php if ($this->checkSpotlight('footnav', 'footer-1, footer-2, footer-3, footer-4, footer-5, footer-6')) : ?>
              <?php $this->spotlight('footnav', 'footer-1, footer-2, footer-3, footer-4, footer-5, footer-6') ?>
            <?php endif ?>
          
        </div>
      </div>
		</div>
		<!-- //FOOT NAVIGATION

	<section class="t3-copyright">
		<div class="container">
			<div class="row">
				<div class="<?php echo $this->getParam('t3-rmvlogo', 1) ? 'col-md-8' : 'col-md-12' ?> copyright <?php $this->_c('footer') ?>">
					<jdoc:include type="modules" name="<?php $this->_p('footer') ?>" />
          <small>
            <a href="http://twitter.github.io/bootstrap/" target="_blank">Bootstrap</a> is a front-end framework of Twitter, Inc. Code licensed under <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>.
          </small>
          <small>
            <a href="http://fortawesome.github.io/Font-Awesome/" target="_blank">Font Awesome</a> font licensed under <a href="http://scripts.sil.org/OFL">SIL OFL 1.1</a>.
          </small>
				</div>
				<?php if ($this->getParam('t3-rmvlogo', 1)): ?>
					<div class="col-md-4 poweredby">
						<a class="t3-logo t3-logo-light" href="http://t3-framework.org" title="Powered By T3 Framework" <?php echo method_exists('T3', 'isHome') && T3::isHome() ? '' : 'rel="nofollow"' ?>
						   target="_blank">Powered by <strong>T3 Framework</strong></a>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section> -->

</footer>
<!-- //FOOTER -->