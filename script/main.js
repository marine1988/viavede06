/* DOM READY */
$(function () {
	var _menuHeight = _Header.height();

	/* ACTIVATE JS CLASS */
	$('html').addClass('js');

	/* ADD MOBILE VERSION CLASS */
	deviceType();

	/* REMOVE HOVER STATE FOR iOS DEVICES */
	var _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
	if (_iOSDevice) {
		$('body').addClass('no-touch');
	} else {
		$('body').addClass('touch');
	}

	/* CUSTOM LANG SELECT */
	if($('.lang-selectbox').length)
	{
		$('.lang-selectbox').select2({
			minimumResultsForSearch: Infinity,
			dropdownParent: '.form-lang-selectbox'
		}).on('change', function () {
			var valueLang = $(this).attr('value');

			window.location.replace(valueLang);
		});
	}

	/* ADD STICKY MENU */
	if (!$('form').hasClass('showControlBar') || !$('#ControlBar_ControlPanel')) {
		stickyMenu();

		$(window).scroll(function () {
			if ($(this).scrollTop() > _menuHeight) {
				_Header.addClass('sticky');
			} else {
				_Header.removeClass('sticky');
			}

			stickyMenu();
		});
	}

	/* VERIFICATION IF ASIDE BAR IS EMPTY */
	if (($('.main-detail-article .detail-article').length) && (!$('.main-detail-article .detail-article').next('.aside-article').length)) {
		$('.main-detail-article').addClass('no-aside-article');
	}

	/* VERIFICATION OF NAV MENU */
	if ($('.nav-menu-mobile').length) {
		/* ADD EVENT CLICK OF NAV MENU */
		navMenuEventClick();
	}

	/* MY ACCONT BUTTON */
	if ($('.header-account-search .my-account-button > a, .header-account-search .my-account-button .logout a, .header-my-profile .my-account-button, .header-my-account .my-user-button, .header-account-search .my-user-button').length) {
		/* CHECK FOR ALERTS */
		if ($('.main-wrapper .aside li .icon').length) {
			$('.header-my-profile .my-account-button, .header-account-search .my-user-button').addClass('has-alert');
		}

		/* OPEN MODAL Login */
		$('.header-account-search .my-account-button > a, .header-account-search .my-account-button .logout a').on('click', function (e) {
			e.preventDefault();

			if (_Modal.hasClass('hidden')) {
				$('#form-login').show();
				$('#form-recover').hide();
				openModal($('.form-login'), 'standard-modal login-modal', initLoginUI, false);

				noScroll();
			} else {
				closeModal();
			}

		    /* Update mobile MY ACCOUNT size (allow scroll) */
			var tempSetInterval;
			clearTimeout(tempSetInterval);
			tempSetInterval = setTimeout(mobileMyAccountResize, 100);
		    //Extra setTimeout to avoid bugs (resize faster than DOM render)
			var tempSetIntervalExtra;
			clearTimeout(tempSetIntervalExtra);
			tempSetIntervalExtra = setTimeout(mobileMyAccountResize, 500);
		});

		/* OPEN MODAL Register */
		$('.header-account-search .my-account-button .register a').on('click', function (e) {
			e.preventDefault();

			if (_Modal.hasClass('hidden')) {
				$('#form-register-vv').show();
				$('#registerVVStatusError').hide();
				openModal($('.form-register-vv'), 'standard-modal register-modal', initRegisterVVUI, false);

				noScroll();
			} else {
				closeModal();
			}

		    /* Update mobile MY ACCOUNT size (allow scroll) */
			var tempSetInterval2;
			clearTimeout(tempSetInterval2);
			tempSetInterval2 = setTimeout(mobileMyAccountResize, 100);
		});

		/* OPEN CLOSE My Account */
		$('.header-my-profile .my-account-button').on('click', function (e) {
			var _windowWidth = window.innerWidth;

			if (_windowWidth <= 1023) {
				e.preventDefault();

				myAccountMenu($(this));
			}
		});

		$('.header-account-search.header-my-limbo .my-user-button').on('click', function (e) {
			//e.preventDefault();
			var _windowWidth = window.innerWidth;

			if (_windowWidth <= 767) {

				myAccountMenu($(this));
			}
		});

		if (($('.header-account-search').length > 0) && (!$('.header-account-search').hasClass("header-my-limbo"))) {
		    /*$('.header-account-search .my-user-button').on('click', function (e) {
		        window.location.href = $('.header-account-search .my-user-button > a').attr('href');
		    });*/
		    $('.header-account-search .my-user-button').on('click', function (e) {
			    var _windowWidth = window.innerWidth;

				if (_windowWidth <= 1023) {
					e.preventDefault();

					myAccountMenu($(this));
				}
			});
		}
	}

	/* CLOSE MODAL */
	$('.modal .button.close').on('click', function () {

	    // If exists, remove Login Modal class and dynamic height. The Login Modal has specific mobile styles that will affect other modals.
	    $('.login-modal').css('height', '100%');
	    $('.modal').removeClass('login-modal');

		closeModal();
	});

	/* CLOSE MODAL ON ESCAPE KEYDOWN */
	$(document).on('keydown', function (e) {
		if ((e.keyCode == 27) && (_Modal.is(':visible'))) {
			closeModal();
		}
	});

	/* SUMMARY ERROR CLOSE */
	$('.val-summary .close').click(function () {
		$('.val-summary').hide();
	});

	/* DATEPICKER LANGUAGE INIT */
	var _currentCulture = $("#HDFCurrentLanguage").val();
	$.datepicker.setDefaults($.datepicker.regional[_currentCulture]);

    /* DETAIL OFFER OPTIONS */
    $(".btn-pagination.next").click(function () {
	    var nextElement = $(this).parents('.opt-item').find('select > option:selected').next('option');
	    var select = $(this).parents('.opt-item').find('select > option:selected');

	    if (nextElement.length > 0) {
	        select.removeAttr('selected').next('option').attr('selected', 'selected');
	    }
	    select.change();
    });

    $(".btn-pagination.prev").click(function () {
	    var prevElement = $(this).parents('.opt-item').find('select > option:selected').prev('option');
	    var select = $(this).parents('.opt-item').find('select > option:selected');
	    if (prevElement.length > 0) {
	        select.removeAttr('selected').prev('option').attr('selected', 'selected');
	    }
	    select.change();
    });

	if($("#btn-loading").length){
    	animateLoading();
    }

    /* CHANGE ON VEHICLE CLASSES SELECT BOX */
	if ($('.vehicle-classes select').length) {
    	$('.vehicle-classes select').on('selectric-change', function(element){
    		$('#vehicle-class-container').removeClass('vehicle-class_1 vehicle-class_2 vehicle-class_3 vehicle-class_4 vehicle-class_5');
    	});
	}

	//btn - pagination next prev
	//btnNext
	//btnPrev
    /* END DETAIL OFFER OPTIONS */

    /*----- SUPPORT PAGE------*/
    $('.theme-select').click(function(event){

    	if(!$(this).find('.nav-menu-sub-theme').hasClass('is-open')){
    		$('body').find('.nav-menu-sub-theme').removeClass('is-open');
    		$(this).find('.nav-menu-sub-theme').toggleClass('is-open');
    		event.stopPropagation();
    	}
    	else{
	    	$(this).find('.nav-menu-sub-theme').toggleClass('is-open');
	    	event.stopPropagation();
	    }
    });

    $(document).click(function() {
    	if($(this).closest('theme-select').length === 0){
    		$('.nav-menu-sub-theme').removeClass('is-open');
    	}
    });

    if($('.list-situacoes li').length && (window.innerWidth >= '1024')){
    	var maxHeight = -1;
    	$('.list-situacoes li a').each(function(){
    		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    	});
    	$('.list-situacoes li a').each(function() {
		    $(this).height(maxHeight);
		});
    }
    else if($('.list-situacoes li').length && (window.innerWidth < '1024')){
		$('.list-situacoes li a').each(function() {
		    $(this).css('height', '');
		});
    }


    if($('.support-aside-track-trace').length){
    	addAccordion();
    }

	if($('.offers-content .lists').length && (window.innerWidth >= '768')){
    	var maxHeight = -1;
    	$('.lists a').each(function(){
    		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    	});
    	$('.lists a').each(function() {
		    $(this).height(maxHeight);
		});
    }
    else if($('.related-offers .lists').length && (window.innerWidth < '1024')){
		$('.lists a').each(function() {
		    $(this).css('height', '');
		});
    }

});
/* END */

/* LOAD EVENT */
$(window).load(function () {
	/* ADD STICKY WRAPPER */
    stickyWrapper();

    /* Homepage Video Highlight - dynamic line-height */
    dynamicVideoHeight();

    var $carousel = $('.vehicle-class-type-wrapper ul');
	if ($carousel.length) {
		if ($(window).width() <= 767) {
			if (!$carousel.hasClass('slick-initialized')){
				$carousel.slick({
				slide: 'li',
				dots: false,
				infinite: true,
				speed: 500,
				cssEase: 'linear'
				});
			}
		} else {
		  	if($carousel.hasClass('slick-initialized')) {
		  		$carousel.slick('unslick');
		  	}
		}
	}

	var $carouselYellow = $('.yellow-light-slide');
	if ($carouselYellow.length) {
		if (!$carouselYellow.hasClass('slick-initialized')){
			$carouselYellow.slick({
				slide: 'div',
				dots: false,
				adaptiveHeight: false,
				arrows: false,
				infinite: false,
				speed: 500,
				draggable: true,
				swipe: true
			});
		}
	}

	$carouselYellow.on('swipe', function(event, slick, direction){
	  $carouselYellow.slick('slickGoTo', 2);
	  setTimeout(function(){
		$carouselYellow.slick('slickSetOption', 'swipe', false);
	}, 500);

	});

	$('.yellow-light-setp1').click(function(){
		$carouselYellow.slick('slickGoTo', 2);
		setTimeout(function(){
			$carouselYellow.slick('slickSetOption', 'swipe', false);
		}, 500);
		
	});

});
/* END */

/* RESIZE EVENT */
var runFunction; /* Var for pos-resized functions */
$(window).on('resize', function () {
	/* ADD MOBILE VERSION CLASS */
	deviceType();

	/* ADD STICKY WRAPPER */
	stickyWrapper();

	/* ADD STICKY MENU */
	if (!$('form').hasClass('showControlBar')) {
		stickyMenu();
	}

	/* ADD OR REMOVE NO-SCROLL */
	noScroll();

	/* GIVE HEIGHT */
	measureHeight('.nav-menu');
	measureHeight('.main-wrapper .aside');

	/* Funcionamento de Aside "Track & Trace" (Landing page - Centro de Apoio) em mobile */
	if ((window.innerWidth >= '768') && (window.innerWidth <= '1279')) {
		if (!$('.aside-track-trace').hasClass('active')) {
			$('.aside-track-trace').css('height', '101');
		}
	} else {
		$('.aside-track-trace').removeClass('active');
		$('.aside-track-trace').css('height', '');
	}

	if($('.list-situacoes li').length && (window.innerWidth >= '1024')){
    	var maxHeight = -1;
    	$('.list-situacoes li a').each(function(){
    		$(this).css('height', '');
    		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    	});
    	$('.list-situacoes li a').each(function() {
    		$(this).css('height', '');
		    $(this).height(maxHeight);
		});
    }
    else if($('.list-situacoes li').length && (window.innerWidth < '1024')){
		$('.list-situacoes li a').each(function() {
		    $(this).css('height', '');
		});
    }

    if($('.support-aside-track-trace').length){
    	addAccordion();
    }

	if($('.offers-content .lists').length && (window.innerWidth >= '768')){
    	var maxHeight = -1;
    	$('.lists a').each(function(){
    		$(this).css('height', '');
    		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    	});
    	$('.lists a').each(function() {
		    $(this).height(maxHeight);
		});
    }
    else if($('.related-offers .lists').length && (window.innerWidth >= '1024')){
    	var maxHeight = -1;
    	$('.lists a').each(function(){
    		$(this).css('height', '');
    		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    	});
    	$('.lists a').each(function() {
		    $(this).height(maxHeight);
		});
    }
    else if($('.related-offers .lists').length && (window.innerWidth < '1024')){
		$('.lists a').each(function() {
		    $(this).css('height', '');
		});
    }

    /* Functions to run after resize --> functions.js */
	clearTimeout(runFunction);
	runFunction = setTimeout(resizedWindow, 100);

	var $carousel = $('.vehicle-class-type-wrapper ul');
	if ($carousel.length) {
		if ($(window).width() <= 767) {
			if (!$carousel.hasClass('slick-initialized')){
				$carousel.slick({
				slide: 'li',
				dots: false,
				infinite: true,
				speed: 500,
				cssEase: 'linear'
				});
			}
		} else {
		  	if($carousel.hasClass('slick-initialized')) {
		  		$carousel.slick('unslick');
		  	}
		}
	}
});
/* END */
