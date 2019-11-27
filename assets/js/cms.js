(function ($) {
	"use strict";

	$(window).on('load', function () {
		if ($(window).innerWidth() < 1025) {
			$('.btn-toggle-fullwidth').find('.icon-arrows')
				.removeClass('icon-arrows-move-left')
				.addClass('icon-arrows-move-right');
		}

		// adjust right sidebar top position
		$('.right-sidebar').css('top', $('.navbar').innerHeight());

		// if page has content-menu, set top padding of main-content
		if ($('.has-content-menu').length > 0) {
			$('.navbar + .main-content').css('padding-top', $('.navbar').innerHeight());
		}

		// for shorter main content
		if ($('.main').height() < $('#sidebar-nav').height()) {
			$('.main').css('min-height', $('#sidebar-nav').height());
		}
	});

	$(function () {
		/*-----------------------------------/
		/*	USER INFO
		/*----------------------------------*/
		var body = {
		};
		var success = function (data, status, xhr) {
			if (status === 'success') {
				try {
					if (data["status"] != 200) {
						location.href = "index.html";
					}
				} catch (e) {
					console.log(e);
				}
			} else {
				console.log("status false");
			}
		};
		var error = function (xhr, status, e) {
			location.href = "index.html";
		};
		try {
			// fc("/users", 'GET', body, success, error);
		} catch (error) {
			console.log(error)
		}

		// logout
		$('#logout').click(function () {
			var success = function (data, status, xhr) {
				if (status === 'success') {
					try {
						if (data["status"] == 200) {
							sessionStorage.removeItem("aud");
							sessionStorage.removeItem("auth");
							sessionStorage.removeItem("group");
							location.href = "index.html";
						}
					} catch (e) {
						console.log(e);
					}
				} else {
					console.log("status false");
				}
			};
			try {
				fc("/logout", 'GET', "", success);
			} catch (e) {
				console.log(e)
			}
			return false;
		});

		/*-----------------------------------/
		/*	TOP NAVIGATION AND LAYOUT
		/*----------------------------------*/
		$('.btn-toggle-fullwidth').on('click', function () {
			if (!$('body').hasClass('layout-fullwidth')) {
				$('body').addClass('layout-fullwidth');

			} else {
				$('body').removeClass('layout-fullwidth');
				$('body').removeClass('layout-default'); // also remove default behaviour if set
			}

			$(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');

			if ($(window).innerWidth() < 1025) {
				if (!$('body').hasClass('offcanvas-active')) {
					$('body').addClass('offcanvas-active');
				} else {
					$('body').removeClass('offcanvas-active');
				}
			}
		});

		/*-----------------------------------/
		/*	SIDEBAR NAVIGATION
		/*----------------------------------*/

		$('.sidebar a[data-toggle="collapse"]').on('click', function () {
			if ($(this).hasClass('collapsed')) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});

		if ($('.sidebar-scroll').length > 0) {
			$('.sidebar-scroll').slimScroll({
				height: '95%',
				wheelStep: 2,
			});
		}

		// 	//feather icon
		feather.replace()

	});


})(jQuery);