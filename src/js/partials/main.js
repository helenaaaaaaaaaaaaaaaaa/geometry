
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
		slidesToScroll: 1,
		speed: 300,
		variableWidth: true,
		prevArrow: '<button type="button" class="partners-arrow partners-arrow--prev"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L6 6L1 1" stroke="white"/></svg></button>',
		nextArrow: '<button type="button" class="partners-arrow partners-arrow--next"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L6 6L1 1" stroke="white"/></svg></button>',
		autoplay: true,
		autoplaySpeed: 1500,
		speed: 2000,

	});

	$(".js-range-slider-1").ionRangeSlider({
		hide_min_max: true,
		hide_from_to: true,
		skin: "round irs--custom",
		onChange: function (data) {
			var target = "#" + $(data.input).attr('data-target');
			//var target = "#" + $(data.input).attr('data-percent');
			var percent = parseInt($("#" + $(data.input).attr('data-percent')).text());
			$(target).html(Math.floor(data.from).toLocaleString() + " ₽");
			var targetPrice = $("#" + $(data.input).attr('data-target-price'));
			$(targetPrice).html(Math.floor((data.from/100*percent/12)).toLocaleString() + " ₽");
		},
	});

	$(".js-range-slider-double").ionRangeSlider({
		type: 'double',
		hide_min_max: true,
		hide_from_to: true,
		skin: "round irs--custom",
		onStart: function (data) {
			var targetFrom = $("#" + $(data.input).attr('data-target-from'));
			targetFrom.val(data.from.toLocaleString('ru-RU'));
			var targetTo = $("#" + $(data.input).attr('data-target-to'));
			targetTo.val(data.to.toLocaleString('ru-RU'));
			var targetInputs=$("#" + $(data.input).attr('data-target-to')+','+"#" + $(data.input).attr('data-target-from'));
			var min = data.min;
			var max = data.max;
			var instBlock = $(data.input);
			//var inst =  data;
			
			targetInputs.on('focus', function () {
				$(this).val(("" + $(this).val()).split(' ').join(''));
			});

			targetFrom.on('blur', function () {				
				var val = parseInt($(this).prop("value").replace(/\s+/g, ''));
				//var numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
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
				$(this).val(inst.old_from.toLocaleString('ru-RU'));
			});
			targetTo.on('blur', function () {
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
				$(this).val(inst.old_to.toLocaleString('ru-RU'));
			});


			targetInputs.on('keyup', function (e) {
				if(e.keyCode==13){
					$(this).blur();
				}
			});
			/*targetFrom.on('keypress keyup', function () {
				
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
			});*/
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
	$('.js-answer-form--validation').on("submit", function (e) {
		e.preventDefault();
		var form = $(this);
		var valid = true;
		if (form.find('[name="description"]').val().length < 3) {
			valid = false;
		}
		if (form.find('[name="yourname"]').val().length < 3) {
			valid = false;
		}
		if (form.find('[name="yourphone"]').val().length < 3) {
			valid = false;
		}
		if (!valid) {
			form.find('.answer-form__required').addClass('answer-form__required--onerror');
		} else {
			form.find('.answer-form__required').removeClass('answer-form__required--onerror');
			//form.submit();
			alert('В этот момент должен срабатывать код отправки формы, который напишет бэкендер');
		}

	});

	
	$('.js-simple-select').each(function(index ){
		$(this).select2({
			language: 'ru',
			theme: 'custom-theme',
			minimumResultsForSearch: Infinity,
			width: '100%',
			dropdownParent: $(this).siblings('.simple-select-items-wrapper')
		}).on('select2:open', function (e) {
			$(this).siblings('.simple-select-items-wrapper').addClass('simple-select-items-wrapper--show');
		}).on('select2:closing', function (e) { 
			if($(this).attr('data-close-anvaliable')!=='1'){
				e.preventDefault();
				var $this=$(this);
				$(this).attr('data-close-anvaliable','1');
				$(this).siblings('.simple-select-items-wrapper').removeClass('simple-select-items-wrapper--show');
				setTimeout(function(){
					$this.select2('close');
				},550);
			} 
			else{
				$(this).attr('data-close-anvaliable','2');
			}
			//$(this).select2('close');
			
		});
	});
	
	$('.js-simplebar-chbwf').each(function(element){
		new SimpleBar($(this)[0], { autoHide: false }); 
	});

	$('.js-simplebar-chbwf .custom-checkbox__inp').on('change', function(){
		var item=$(this).closest(".chbwf-main__item");
		var bottom=$(this).closest('.chb-with-filters').find('.chbwf-bottom');

		if($(this).is(':checked')){
			var name=item.find(".custom-checkbox__text").text();
			if(!(bottom.find('.chbwf-bottom-checked[data-id="'+item.index()+'"]').length>0)){
				//проверим, нет ли снизу уже такого элемента. Раз нет, то добваим
				bottom.append('<div class="chbwf-bottom-checked" data-id="'+item.index()+'"><div class="chbwf-bottom-checked__name">'+name+'</div> <div class="chbwf-bottom-checked__remove"> </div> </div>');
			}
		}
		else{
			bottom.find('.chbwf-bottom-checked[data-id="'+item.index()+'"]').remove();
		}
	});

	if($('.js-simplebar-chbwf .custom-checkbox__inp').length>0){
		$('.js-simplebar-chbwf .custom-checkbox__inp').each(function(){
			if($(this).is(':checked')){
				$(this).trigger('change');
			}
		});
	}
	

	$('body').on('click','.chbwf-bottom-checked', function(){
		var item=$(this);
		var id=$(this).attr('data-id');
		var topItem=$(this).closest('.chb-with-filters').find('.chbwf-main__item').eq(id);
		topItem.find('.custom-checkbox__inp').prop("checked", false );
		item.remove();
	});
	
	$('.js-chbwf-inp').on('input keyup paste touchend', function(){
		var inp = $(this);
		var val = inp.val().toLowerCase();

		var textItems=inp.closest('.chb-with-filters').find('.custom-checkbox__text');
		if(val.length>0){
			textItems.closest('.chbwf-main__item').removeClass('chbwf-main__item--hidden');
		}
		
		textItems.each(function(index){
			var value=$(this).text().toLowerCase();
			
			if(value.includes(val)){			
				$(this).closest('.chbwf-main__item').removeClass('chbwf-main__item--hidden');
			}
			else{
				$(this).closest('.chbwf-main__item').addClass('chbwf-main__item--hidden')
			}
		});
	

	});
});