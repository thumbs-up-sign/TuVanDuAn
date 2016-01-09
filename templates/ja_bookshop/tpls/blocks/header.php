<?php

defined('_JEXEC') or die;

// get params
$sitename  = $this->params->get('sitename');
$slogan    = $this->params->get('slogan', '');
$logotype  = $this->params->get('logotype', 'text');
$logoimage = $logotype == 'image' ? $this->params->get('logoimage', 'templates/' . T3_TEMPLATE . '/images/logo.png') : '';
$logoimgsm = ($logotype == 'image' && $this->params->get('enable_logoimage_sm', 0)) ? $this->params->get('logoimage_sm', '') : false;

if (!$sitename) {
	$sitename = JFactory::getConfig()->get('sitename');
}

$logosize = 'col-md-6';
if ($headright = $this->countModules('head-search')) {
	$logosize = 'col-md-3';
}
?>

<div id="toolbar">
  <div class="container">
    <div class="row">
      <div class="toolbar-ct col-xs-12 col-md-6 <?php $this->_c('toolbar-ct-1') ?>">
        <?php if ($this->countModules('toolbar-ct-1')) : ?>
          <div class="toolbar-ct-1">
            <jdoc:include type="modules" name="<?php $this->_p('toolbar-ct-1') ?>" style="T3xhtml" />
          </div>
        <?php endif ?>
      </div>
      <div class="toolbar-ct toolbar-ct-right col-xs-12 col-md-6">
      	<?php if ($this->countModules('toolbar-ct-3')) : ?>
          <div class="toolbar-ct-3 <?php $this->_c('toolbar-ct-3') ?>">
          	<div class="btn-group">
						  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
						    <i class="fa fa-globe"></i><?php echo JText::_( 'TPL_SETTINGS' ); ?>
						  </button>
						  <div class="dropdown-menu" role="menu">
						    <jdoc:include type="modules" name="<?php $this->_p('toolbar-ct-3') ?>" style="T3xhtml" />
						  </div>
						</div>
          </div>
        <?php endif ?>
        
        <?php if ($this->countModules('toolbar-ct-2')) : ?>
          <div class="toolbar-ct-2 <?php $this->_c('toolbar-ct-2') ?>">
            <jdoc:include type="modules" name="<?php $this->_p('toolbar-ct-2') ?>" style="T3xhtml" />
          </div>
        <?php endif ?>
      </div>
    </div>
  </div>
</div>

<!-- HEADER -->
<header id="t3-header" class="wrap t3-header">
  <div class="container">
    <div class="row">
  		<!-- LOGO <?php echo $logosize ?>-->
  		<div class="col-xs-12 col-md-2 logo col-sm-6">
  			<div class="logo-<?php echo $logotype, ($logoimgsm ? ' logo-control' : '') ?>">
  				<a href="<?php echo JURI::base(true) ?>" title="<?php echo strip_tags($sitename) ?>">
            <?php if($logotype == 'image'): ?>
              <img class="logo-img" src="<?php echo JURI::base(true) . '/' . $logoimage ?>" alt="<?php echo strip_tags($sitename) ?>" />
            <?php endif ?>
            <?php if($logoimgsm) : ?>
              <img class="logo-img-sm visible-sm visible-xs" src="<?php echo JURI::base(true) . '/' . $logoimgsm ?>" alt="<?php echo strip_tags($sitename) ?>" />
            <?php endif ?>
            <span><?php echo $sitename ?></span>
          </a>
  				<small class="site-slogan hidden-xs"><?php echo $slogan ?></small>
  			</div>
  		</div>
  		<!-- //LOGO -->
  		
  		<!-- MAIN NAVIGATION -->
  		<nav id="t3-mainnav" class="col-xs-12 col-md-10 t3-mainnav navbar navbar-default">
  		
  				<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
					
						<?php if ($this->getParam('navigation_collapse_enable', 1) && $this->getParam('responsive', 1)) : ?>
							<?php $this->addScript(T3_URL.'/js/nav-collapse.js'); ?>
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".t3-navbar-collapse">
								<i class="fa fa-bars"></i>
							</button>
						<?php endif ?>
			
					</div>
			
					<?php if ($this->getParam('navigation_collapse_enable')) : ?>
						<div class="t3-navbar-collapse navbar-collapse collapse"></div>
					<?php endif ?>
			
					<div class="t3-navbar navbar-collapse collapse">
						<jdoc:include type="<?php echo $this->getParam('navigation_type', 'megamenu') ?>" name="<?php echo $this->getParam('mm_type', 'mainmenu') ?>" />
						<jdoc:include type="modules" name="main-menu" style="T3xhtml" />
					</div>
  				
  		</nav>
  		<!-- //MAIN NAVIGATION -->
  		
  		
  		<?php if ($this->getParam('addon_offcanvas_enable')) : ?>
				<?php $this->loadBlock ('off-canvas') ?>
			<?php endif ?>

  		<?php if ($headright): ?>
  			<div class="col-xs-12 col-md-3 pull-right col-sm-6">
  				<?php if ($this->countModules('head-search')) : ?>
  					<!-- HEAD SEARCH -->
  					<div class="head-search <?php $this->_c('head-search') ?>">
  						<jdoc:include type="modules" name="<?php $this->_p('head-search') ?>" style="raw" />
  					</div>
  					<!-- //HEAD SEARCH -->
  				<?php endif ?>

  				<?php if ($this->countModules('languageswitcherload')) : ?>
  					<!-- LANGUAGE SWITCHER -->
  					<div class="languageswitcherload">
  						<jdoc:include type="modules" name="<?php $this->_p('languageswitcherload') ?>" style="raw" />
  					</div>
  					<!-- //LANGUAGE SWITCHER -->
  				<?php endif ?>
  			</div>
  		<?php endif ?>
     </div> 
  </div>
</header>
<!-- //HEADER -->