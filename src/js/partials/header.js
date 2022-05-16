
$(document).ready(function () {
	$('.sh-burger').click(function () {
		$(this).toggleClass('sh-burger--active');
		$('.header-bottom').toggleClass('header-bottom--visible');
		
		$('body').toggleClass('body-fixed');
	});
});