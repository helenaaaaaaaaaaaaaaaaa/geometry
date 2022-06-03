$(document).ready(function () {
	$('[name="SelectCity"]').change(function (e) {
		$(this).parent().find('input[type="radio"]:checked').val();
		$(this).parent().find('input[type = "text"]').val($(this).parent().find('input[type="radio"]:checked').val());
		//alert($(this).parent().find('input[type = "text"]').val());
		//$(this).find("input[type = text]").val()
	});
	$('form').submit(function (e) {
		document.answerMsgVariableParent = this;
		var form_data = new FormData(this);
		$.ajax({
			type: "POST",
			url: "sendEmailQ.php",
			data: form_data,
			contentType: false,
			processData: false,
			cache: false
		}).done(function (result) {
			$(document.answerMsgVariableParent).hide();
			$(document.answerMsgVariableParent).closest('div').find('.aswerMsg').show();
			$(document.answerMsgVariableParent).closest('div').find('.aswerMsg').html(result);

		});

		return false;
	});

	$('.oldsite-popup input, .oldsite-popup select').styler({
		filePlaceholder: '',
		fileBrowse: 'Прикрепить файл',
	});



	$('.tooltip').tooltipster({
		delay: 100,
		maxWidth: 220,
		trigger: 'click',
		interactive: true,
		functionBefore: function (instance) {

		},
		functionAfter: function (instance) {
			$(document).find('.tooltip.tooltipstered.active').removeClass('active');
		}
	}).click(function () {
		var $this = $(this);
		$this.addClass('active').tooltipster('show');
	});

	$('.js-open-modal').on('click', function () {
		$.fancybox.open({
			src: $(this).attr('data-src'),

			type: 'inline',
			opts: {
				//speed: 600,
				//transitionDuration: 700,
				autoFocus: false,
				backFocus: false,
				baseClass: 'fancybox-default-modal oldsite-popup-fancybox',
				touch: false,

				beforeShow: function (instance, current) {
					setTimeout(function () {
						$('input, select').trigger('refresh');
					}, 1)
				},
				afterClose: function () {

				}
			}

		});
	});
	var hash = window.location.hash;
	if(hash[0]==='#'){
		hash=hash.slice(1);
		var modal=$('.oldsite-popup[id="'+hash+'"]');
		if(modal.length>0){
			$.fancybox.open({
				src: '#'+hash,

				type: 'inline',
				opts: {
					//speed: 600,
					//transitionDuration: 700,
					autoFocus: false,
					backFocus: false,
					baseClass: 'fancybox-default-modal oldsite-popup-fancybox',
					touch: false,

					beforeShow: function (instance, current) {
						setTimeout(function () {
							$('input, select').trigger('refresh');
						}, 1)
					},
					afterClose: function () {

					}
				}

			});
		}
	}





	$('[class="inputBoxrr"]').keyup(function () {
		if (!$.isNumeric($('#Area').val().replace(/\s+/g, '')) || !$.isNumeric($('#debetInMounth').val().replace(/\s+/g, ''))) {
			$('#debetKvM').val('');
			return;
		}
		$('#debetKvM').val((($('#debetInMounth').val().replace(/\s+/g, '') / $('#Area').val().replace(/\s+/g, '')).toFixed(2)).toLocaleString('ru'))
	});
});

window.onload = function () {
	var city = ymaps.geolocation.city;
	var region = ymaps.geolocation.region;
	console.log(city);
	console.log(region);
	$('[name="SelectCity"][data-city-name="' + city + '"],[name="SelectCity"][data-region-name="' + city + '"],[name="SelectCity"][data-region-name="' + region + '"]').prop('checked', true);


	$('[name="SelectCity"]').each(function (e) {
		$(this).parent().find('input[type = "text"]').val($(this).parent().find('input[type="radio"]:checked').val());
		//alert($(this).parent().find('input[type = "text"]').val());
		//$(this).find("input[type = text]").val()
	});
}

function ClickInsuranceRisk(tt) {
	//alert('НАЖАТА');
	//console.log('sfsdf');
	var ee = tt;
	var v1 = $(tt).children('div');
	var v2 = $(tt).children('div').css('display');
	if ($(tt).children('div').css('display') == 'none') {
		var par = $(tt).parent().children('div');
		for (var i = 0; i < $(tt).parent().children('div').length; i++) {
			$(par[i]).children('div').css('display', 'none');
		}
		$(tt).children('div').css('display', 'flex');
	}
	else {
		$(tt).children('div').css('display', 'none');
	}
};

function divideNumberByPieces(e) {
	var i = $(e).val();
	i = i.replace(/\s+/g, '');
	if (isNumeric(i)) {
		$(e).val(Number(i).toLocaleString('ru'));
	}
}
function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function closeModalWindows(e) {
	$(e).closest('.fancybox-content').find('.fancybox-close-small').click();
}