$(document).ready(function () {
	var phoneMask = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];


	var telInputs = document.querySelectorAll('.js-tel-input')

	Array.prototype.forEach.call(telInputs, function (el, i) {
		var maskedInputController = vanillaTextMask.maskInput({
			inputElement: el,
			mask: phoneMask,
			guide: false
		})
	});

	$('.js-partners-slider').slick({
		infinite: true,
		arrows: true,
		slidesToScroll: 6,
		speed: 300,
		variableWidth: true,
		prevArrow: '<button type="button" class="partners-arrow partners-arrow--prev"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L6 6L1 1" stroke="white"/></svg></button>',
		nextArrow: '<button type="button" class="partners-arrow partners-arrow--next"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L6 6L1 1" stroke="white"/></svg></button>',
		responsive: [{
				breakpoint: 1280, //аналог max-width
				settings: {
					slidesToScroll: 6,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToScroll: 2,
					arrows: true,
				}
			}
		]
	});

	$(".js-range-slider-1").ionRangeSlider({
		hide_min_max: true,
		hide_from_to: true,
		skin: "round irs--custom",
		onChange: function (data) {
			var target = "#" + $(data.input).attr('data-target');
			$(target).html(data.from.toLocaleString() + " ₽");
		},
	});

	$(".js-range-slider-double").ionRangeSlider({
		type: 'double',
		hide_min_max: true,
		hide_from_to: true,
		skin: "round irs--custom",
		onStart: function (data) {
			var targetFrom = $("#" + $(data.input).attr('data-target-from'));
			targetFrom.val(data.from.toLocaleString());
			var targetTo = $("#" + $(data.input).attr('data-target-to'));
			targetTo.val(data.to.toLocaleString());
			var min = data.min;
			var max = data.max;
			var instBlock = $(data.input);
			//var inst =  data;
			targetFrom.on('keypress keyup', function () {
				var val = parseInt($(this).prop("value").replace(/\s+/g, ''));
				val = isNaN(val) ? 0 : val;
				// validate
				if (val < min) {
					val = min;
				} else if (val > max) {
					val = max;
				}
				$(this).val(val);
				var inst = instBlock.data("ionRangeSlider")
				console.log(inst);
				inst.update({
					from: val
				});
				$(this).val(inst.old_from.toLocaleString());
			});
			targetTo.on('keypress keyup', function () {
				var val = parseInt($(this).prop("value").replace(/\s+/g, ''));
				val = isNaN(val) ? 0 : val;
				// validate
				if (val < min) {
					val = min;
				} else if (val > max) {
					val = max;
				}
				var inst = instBlock.data("ionRangeSlider")
				console.log(inst);
				inst.update({
					to: val
				});
				$(this).val(inst.old_to.toLocaleString());
			});
		},
		onChange: function (data) {
			var targetFrom = "#" + $(data.input).attr('data-target-from');
			$(targetFrom).val(data.from.toLocaleString());
			var targetTo = "#" + $(data.input).attr('data-target-to');
			$(targetTo).val(data.to.toLocaleString());
			var inst = $(data.input).data("ionRangeSlider");
			//var inst =  data;

			console.log(inst);
		},
	});

	$("a[href*='#']:not([href='#'])").on("click", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});

	$('.js-specialization-slider').slick({
		arrows: false,
		slidesToScroll: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1500,
		speed: 2000,
		fade: true,
	});

});