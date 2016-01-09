jQuery.noConflict();
$B = jQuery;
$B(document).ready(function () {
	$B('img.hovereffect').hover(function () {
		$B(this).animate({
			opacity : 0.5
		}, 300)
	}, function () {
		$B(this).animate({
			opacity : 1
		}, 300)
	})
})
