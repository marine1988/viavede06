/* GENERAL VARIABLES */
var _Header = $('.header');
var _Modal = $('.modal');
var _NavMenuMobile = $('.nav-menu-mobile');
var _AsideBar = $('.main-wrapper .aside');


/* FUNCTION IS MOBILE */
function isMobile() {
	return navigator.userAgent.match(/Android|iPad|iPhone|iPod|IEMobile/i);
}

/* FUNCTION UPDATE VIEW */
function updateView() {
	window.location.href = window.location.href;
}

/* FUNCTION ADD MOBILE VERSION CLASS */
function deviceType() {
	var _windowWidth = window.innerWidth;

	if (_windowWidth >= 1024) {
		$('html').removeClass('mobile-version');
		$('html').addClass('desktop-version');
	} else {
		$('html').removeClass('desktop-version');
		$('html').addClass('mobile-version');
	}
}

/* FUNCTION ADD STICKY WRAPPER */
function stickyWrapper() {
	var _footer = $('.footer');
	var _stickyWrapper = $('.Sticky-Wrapper');
	var _footerHeight = _footer.outerHeight();

	if(!$('#styleWrapperAfter').length){
		_stickyWrapper.append('<style id="styleWrapperAfter">.desktop-version .Sticky-Wrapper:after{height: ' + _footerHeight + 'px;}</style>');
	}

	if ($('html').hasClass('desktop-version')) {
		_stickyWrapper.css('margin-bottom', -_footerHeight);
		_footer.css('height', _footerHeight);
	} else {
		_stickyWrapper.removeAttr('style');
		_footer.removeAttr('style');
	}
}

/* FUNCTION ADD STICKY MENU */
function stickyMenu() {
	var _menuHeight = _Header.height();

	//if ($('html').hasClass('desktop-version')) {
		$('.main').css('padding-top', _menuHeight);
		$('.main-wrapper .aside').css('padding-top', _menuHeight);
	/*} else {
		$('.main').css('padding-top', _menuHeight);
		$('.main-wrapper .aside').css('padding-top', _menuHeight);
	}*/
}

/* FUNCTION ADD HEIGHT TO SCROLL */
function measureHeight(elem) {
	setTimeout(function () {
		var _headerHeight = _Header.height();
		var _windowHeight = $(document).outerHeight();
		var _elem = $('' + elem + '');
		var _elemHeight = (_elem.first().outerHeight(true) + _headerHeight);

		if (_elemHeight >= _windowHeight) {
			_elem.outerHeight(_windowHeight - _headerHeight);
		} else {
			_elem.css('height', '');
		}
	}, 1);
}

/* FUNCTION ADD EVENT CLICK OF NAV MENU */
function navMenuEventClick() {
	/* OPEN CLOSE NAV MENU MOBILE */
	$('.nav-menu-mobile').on('click', function (e) {
		e.preventDefault();

		// Close Login
		if ((_Modal.is(':visible'))) {
			closeModal();
		}

		// Close My Profile
		if ($('.header-my-profile .my-account-button, .header-account-search .my-user-button').hasClass('active')) {
			$('.header-my-profile .my-account-button, .header-account-search .my-user-button').removeClass('active');
			$('.main-wrapper .aside').removeClass('active');
		}

		if ($(this).hasClass('active')) {
			$('.nav-menu li, .nav-menu li span').removeClass('active');
			$('.nav-menu').css('height', '');
			$('html').removeClass('no-scroll');
		} else {
			$('html').addClass('no-scroll');
		}

		$(this).toggleClass('active');

		// Give Height to Nav Menu
		measureHeight('.nav-menu');
	});

	/* OPEN CLOSE SUB NAV MENU MOBILE */
	$('.nav-menu .ic-arrow').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parent().removeClass('active');

			if ($(this).parent().hasClass('active')) {
				// Give Height to Nav Menu
				measureHeight('.nav-menu');

				$('.nav-menu').css('height', '');
			}
		} else {
			$(this).addClass('active');
			$(this).parent().addClass('active');

			if ($(this).parent().hasClass('active')) {
				// Give Height to Nav Menu
				measureHeight('.nav-menu');
			}

			$('.nav-menu').css('height', '');
		}
		
		/* Update mobile MY ACCOUNT size (allow scroll) */
		var tempSetInterval;
		clearTimeout(tempSetInterval);
		tempSetInterval = setTimeout(mobileMenuResize, 100);
		
	});
}

/* FUNCTION NO SCROLL */
function noScroll() {
	if (($('html').hasClass('desktop-version')) && (_Modal.is(':visible'))) { // Bug on IE9. The :visible is not working
		$('html').addClass('no-scroll');
	} else {
		$('html').removeClass('no-scroll');
	}

	if ((($('html').hasClass('mobile-version')) && (_Modal.is(':visible'))) || (($('html').hasClass('mobile-version')) && (_NavMenuMobile.hasClass('active'))) || (($('html').hasClass('mobile-version')) && (_AsideBar.hasClass('active')))) { // Bug on IE9. The :visible is not working
		$('html').addClass('no-scroll');

		if ((_Modal.is(':visible')) && (!_Modal.hasClass('login-modal'))) {
			$(window).scrollTop(0);
		}
	} else {
		$('html').removeClass('no-scroll');
	}
}

/* FUNCTION ADD NANO SCROLLER */
function startNanoScroller() {
	$('.nano').nanoScroller({alwaysVisible: true});
}

/* FUNCTION REMOVE NANO SCROLLER */
function stopNanoScroller() {
	$('.nano').nanoScroller({destroy: true});
}

/* FUNCTION OPEN MODAL */
function openModal(modalElement, modalClass, callbackFunction, hideClose) {
    //If modal login is already open, close it
    if (_Modal.hasClass('login-modal')) {
        closeModal();
        _Modal.removeClass('login-modal');
    }


    //On Mobile Scroll Page Top
    var _windowWidth = window.innerWidth;

    if (_windowWidth <= 767) {
        $("body").scrollTop(0);
    }

    // Remove scroll from body
	noScroll();

	// Hide menu Mobile if Open
	if ($('.nav-menu-mobile').hasClass('active')) {
		$('.nav-menu-mobile').removeClass('active');
	}

	_Modal.addClass(modalClass);
	_Modal.removeClass('hidden').removeAttr('hidden aria-hidden');

	modalElement.show('fast', function () {
		if (callbackFunction != null) {
			callbackFunction();
		}
	});

	if (hideClose) {
		_Modal.find(".button.close").hide();
	} else {
		_Modal.find(".button.close").show();
	}

    /* Resize modal login on call (auto/full height to allow scroll) */
	if (modalClass.indexOf('login-modal') != -1) {
	    mobileMyAccountResize();
	    var tempSetInterval;
	    clearTimeout(tempSetInterval);
	    tempSetInterval = setTimeout(mobileMyAccountResize, 300);

        /* Remove scroll on body */
	    $('html').addClass('no-scroll');

	}

}

/* FUNCTION CLOSE MODAL */
function closeModal() {
	_Modal.addClass('hidden').attr({'hidden': 'hidden', 'aria-hidden': 'true'});

	// Remove all modal-* class on modal close
	_Modal.removeClass(function (index, css) {
		return (css.match(/\modal-\S+/g) || []).join(' ');
	});

	// Hide all modal forms
	_Modal.find(".form").hide();

	_Modal.find(".button.close").show();

	noScroll();
}

/* FUNCTION Replace User Control */
function replaceUC(modalElement, modalClass, callbackFunction, hideClose) {
    //On Mobile Scroll Page Top
    var _windowWidth = window.innerWidth;

    if (_windowWidth <= 767) {
        $("body").scrollTop(0);
    }

	// Start Loading
	startLoading(_Modal);

	// Remove all modal-* class on modal close
	_Modal.removeClass(function (index, css) {
		return (css.match(/\modal-\S+/g) || []).join(' ');
	});

	// Hide all modal forms
	_Modal.find(".form").hide();

    // If exists, remove Login Modal class and dynamic height. The Login Modal has specific mobile styles that will affect other modals.
	$('.login-modal').css('height', '100%');
	_Modal.removeClass('login-modal');

    // Add new class
	_Modal.addClass(modalClass);

	modalElement.show('fast', function () {
		if (callbackFunction != null) {
			callbackFunction();
		}
	});

	if (hideClose) {
		_Modal.find(".button.close").hide();
	} else {
		_Modal.find(".button.close").show();
	}

	// Stop Loading after 1 second
	setTimeout(function () {
		stopLoading(_Modal);
	}, 500);
}

function startLoading(element) {
	element.find(".wrapper").scrollTop(0);
	element.find(".wrapper").css("overflow", "hidden");
	element.find(".loading").show();
}

function stopLoading(element) {
	element.find(".wrapper").css("overflow", "auto");
	element.find(".loading").hide();
}

function showControlLoading(element) {
	element.css("max-width", "90%");
	element.siblings(".form-loader").css("display", "inline-block");
}

function hideControlLoading(element) {
	element.css("max-width", "100%");
	element.siblings(".form-loader").css("display", "none");
}

function showButtonLoader(element) {
	element.hide();
	element.next(".button-loader").show();
}

function hideButtonLoader(element) {
	element.next(".button-loader").hide();
	element.show();
}

function animateLoading (){
	var frameWidth = 18;
	var frameHeight = 18;
	var spriteWidth = 18;
	var spriteHeight = 144;
	var spriteElement = document.getElementById("btn-loading");
	 
	var curPx = 0;
	var ti;
	 
	function animateSprite() {	 
		spriteElement.style.backgroundPosition = '0px ' + curPx + 'px';
		curPx = curPx + frameHeight;
		 
		if (curPx >= spriteHeight) {
			curPx = 0;
		}
		ti = setTimeout(animateSprite, 80);
	}
	
	animateSprite();
};


/* Init Tooltipster */
function initTooltipster(selector, isModal, customPosition) {
	if (!isModal) {
		selector.tooltipster({
			functionInit: function () {
				return $(this).parent().find(".tooltip-message").html();
			},
			functionReady: function () {
				$(this).parent().find(".tooltip-message").attr('aria-hidden', false);
			},
			functionAfter: function () {
				$(this).parent().find(".tooltip-message").attr('aria-hidden', true);
			},
			contentAsHTML: true,
			interactive: true,
			multiple: true,
			position: (customPosition != null ? customPosition : 'top')
		});
	} else {
		selector.tooltipster({
			functionInit: function () {
				return $(this).parent().find(".tooltip-message").html();
			},
			functionReady: function () {
				$(this).parent().find(".tooltip-message").attr('aria-hidden', false);
			},
			functionAfter: function () {
				$(this).parent().find(".tooltip-message").attr('aria-hidden', true);
			},
			contentAsHTML: true,
			interactive: true,
			multiple: true,
			position: (customPosition != null ? customPosition : 'top')
		}, 'option', 'altTarget', $(".modal .wrapper"));
	}
}

/* Update Tooltipster */
function updateTooltipster(selector) {
	selector.each(function (e) {
		var icon = $(this).parent().find(".tooltip-icon");
		var message = $(this).parent().find(".tooltip-message");

		icon.tooltipster('content', message);
	});
}

/* Update Single Tooltipster */
function updateSingleTooltipster(selector) {
	var icon = selector.parent().find(".tooltip-icon");
	var message = selector.parent().find(".tooltip-message");

	icon.tooltipster('content', message);
}

/* Update mobile MENU size (allow scroll) */
function mobileMenuResize() {
	var windowHeight = $(window).height();
	var headerHeight = $('.header').height();
	var element = $('.header-info-menu .nav-menu');

	if (element.height() > (windowHeight - headerHeight)) {
		element.css('height', windowHeight - headerHeight);
	} else {
		element.css('height', '');
	}
}

/* Update mobile MY ACCOUNT size (allow scroll) */
function mobileMyAccountResize() {
    if ($('html').hasClass('mobile-version')) {
        var windowHeight = $(window).height();
        var headerHeight = $('.header').height();
        var element = $('.main-wrapper .aside.active');
        var modal = $('.login-modal');

        if (element.is(':visible')) {
            if (element.height() > (windowHeight - headerHeight)) {
                element.css('height', windowHeight - headerHeight);
            } else {
                element.css('height', '');
            }
        }

        setTimeout(function () {
            if (modal.is(':visible')) {
                if (modal.find('.wrapper').height() > (windowHeight - headerHeight)) {
                    modal.css({
                        'height': windowHeight - headerHeight
                    });
                } else {
                    modal.css({
                        'height': ''
                    });
                }
            }
        }, 1);
    }
}

function myAccountMenu(elem) {
	// Close Menu Mobile
	if ($('.nav-menu-mobile').hasClass('active')) {
		$('.nav-menu-mobile').removeClass('active');
	}

	if (elem.hasClass('active')) {
		$('.main-wrapper .aside').css('height', '');
		$('html').removeClass('no-scroll');
	} else {
		$('html').addClass('no-scroll');

		$(window).scrollTop(0);
	}

	elem.toggleClass('active');
	$('.main-wrapper .aside').toggleClass('active');

	var _menuHeight = _Header.height();
	if (!$('form').hasClass('showControlBar')) {
		$('.main-wrapper .aside').css('padding-top', (_menuHeight));
	}

	// Give Height to Aside Bar
	measureHeight('.main-wrapper .aside');

    /* Update mobile MY ACCOUNT size (allow scroll) */
	var tempSetInterval3;
	clearTimeout(tempSetInterval3);
	tempSetInterval3 = setTimeout(mobileMyAccountResize, 100);
}

/* Function to set dynamic line-height (Homepage Video Highlight) */
function dynamicVideoHeight() {
    function runDynamicVideoHeight() {
        $('.banner-video .gm-banner-content').css('line-height', $('.banner-video .gm-banner-content').height() + 'px');
    }

    runDynamicVideoHeight();
    var timeOutDynamicVideoHeight;
    clearTimeout(timeOutDynamicVideoHeight);
    timeOutDynamicVideoHeight = setTimeout(runDynamicVideoHeight, 1000);
}

/* Functions to be called after resized window */
function resizedWindow() {
	mobileMenuResize();
	mobileMyAccountResize();
	dynamicVideoHeight();
}

/*-- Function slider go to on search vehicle classes ---*/
function sliderVehicleClassesGoTo(){
	var $carousel = $('.vehicle-class-type-wrapper ul');
	if ($carousel.length) {
		if ($(window).width() <= 767) {
			var divClass = $('.vehicle-class-type').attr('class').split(' ')[1];
			if( divClass == 'vehicle-class_1'){
				$carousel.slick('slickGoTo', 0);
			}
			else if( divClass == 'vehicle-class_2'){
				$carousel.slick('slickGoTo', 1);
			}
			else if( divClass == 'vehicle-class_3'){
				$carousel.slick('slickGoTo', 2);
			}
			else if( divClass == 'vehicle-class_4'){
				$carousel.slick('slickGoTo', 3);
			}
			else if( divClass == 'vehicle-class_5'){
				$carousel.slick('slickGoTo', 4);
			}
			else{
				$carousel.slick('slickGoTo', 0);
			}
		}
	}
};


/* === Function to add or remove accordion on TRACK & TRACE ====*/
function addAccordion(){
	var elementAccordion = $('.support-aside-track-trace');
    
    if((window.innerWidth <= '1023')){
    	$(elementAccordion).accordion({
	        header: "h2",
	        heightStyle: "content",
	        active: false,
	        collapsible: true
	    });
    }
    else if((window.innerWidth > '1023') && elementAccordion.hasClass('ui-accordion')) {
        $(elementAccordion).accordion('destroy');
    }
}