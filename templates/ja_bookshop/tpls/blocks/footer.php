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
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 footer-info">
                    <?php if ($this->countModules('footer-info')) : ?>
                        <jdoc:include type="modules" name="<?php $this->_p('footer-info') ?>" style="T3xhtml" />
                    <?php endif ?>
                </div>

                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 footer-links">
                    <div class="row">
                        <div class=" col-lg-1 col-md-1 col-sm-1 hidden-sm  col-xs-12"></div>
                        <div class=" col-lg-3 col-md-3  col-sm-3 hidden-sm  col-xs-12">
                            <?php if ($this->countModules('footer-logo')) : ?>
                                <jdoc:include type="modules" name="<?php $this->_p('footer-logo') ?>" style="T3xhtml" />
                            <?php endif ?>
                        </div>
                        <div class=" col-lg-6 col-md-6  col-sm-6 hidden-sm  col-xs-12">
                        <?php if ($this->countModules('footer-subcribe')) : ?>
                            <jdoc:include type="modules" name="<?php $this->_p('footer-subcribe') ?>" style="T3xhtml" />
                        <?php endif ?>
                        </div>
                        <div class=" col-lg-2 col-md-2 col-sm-2 hidden-sm  col-xs-12"></div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 footer-links">
                    <div class="row">
                        <div class=" col-lg-2 col-md-2  col-sm-2 hidden-sm  col-xs-12"></div>
                        <div class=" col-lg-3 col-md-3  col-sm-3 hidden-sm  col-xs-12">
                            <?php if ($this->countModules('footer-1')) : ?>
                                <jdoc:include type="modules" name="<?php $this->_p('footer-1') ?>" style="T3xhtml" />
                            <?php endif ?>
                        </div>
                        <div class=" col-lg-6 col-md-6  col-sm-6 hidden-sm  col-xs-12">
                            <?php if ($this->countModules('footer-2')) : ?>
                                <jdoc:include type="modules" name="<?php $this->_p('footer-2') ?>" style="T3xhtml" />
                            <?php endif ?>
                        </div>
                        <div class=" col-lg-1 col-md-1  col-sm-1 hidden-sm  col-xs-12"></div>
                    </div>
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