(function($) {

    "use strict";

    /* ---------------------------------------------

    Navigation menu

    --------------------------------------------- */

    // dropdown for mobile

    // $('.all-side').on('mouseenter', function(e) {
    //     var x = e.pageX - $(this).offset().left;
    //     var y = e.pageY - $(this).offset().top;
    //     $(this).find('span.hover-animation').css({top: y, left: x})
    // });

  
    $(document).ready(function() {
        $("#page").append("<div class='courser-animaion'></div>");
    });

    


    $(window).load(function() {

    })


    // accordion script starts
    var fdAddonsAccordion = function($scope, $) {
            var accordionTitle = $scope.find('.wtz-addons-accordion-title');

            var accmin = $scope.find('.wtz-addons-accordion-single-item');

            accmin.each(function() {
                if ($(this).hasClass('yes')) {
                    $(this).addClass('wraper-active');
                }
            });

            accordionTitle.each(function() {
                if ($(this).hasClass('active-default')) {
                    $(this).addClass('active');
                    $(this).next('.wtz-addons-accordion-content').slideDown(300);
                }
            });

            // Remove multiple click event for nested accordion
            accordionTitle.unbind('click');

            //$accordionWrapper.children('.wtz-addons-accordion-content').first().show();
            accordionTitle.click(function(e) {
                e.preventDefault();

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).next().slideUp(400);
                    $(this).parent().removeClass('wraper-active');

                } else {
                    $(this).parent().parent().find('.wtz-addons-accordion-title').removeClass('active');

                    accmin.removeClass('wraper-active');

                    $(this).parent('.yes').removeClass('wraper-active');

                    $(this).parent().parent().find('.wtz-addons-accordion-content').slideUp(300);

                    $(this).parent().addClass('wraper-active');

                    $(this).toggleClass('active');
                    $(this).next().slideToggle(400);

                }
            });
        }
        // accordion script ends


    var WebthemezilaGlobal = function($scope, $) {



        if ($scope.hasClass('wtz-addons-sticky-yes')) {
            var current_widget = $scope;
            current_widget.wrap('<div class="sticky-wrapper"></div>');
            var headerHeight = $(current_widget).parent('.sticky-wrapper').height(),
                stickyWrapper = $(current_widget).parent('.sticky-wrapper');
            stickyWrapper.css('height', headerHeight + "px")
            window.onscroll = function() {
                scrollFunction()
            };

            function scrollFunction() {

                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    if ($scope.hasClass('wtz-addons-sticky-yes')) {
                        stickyWrapper.addClass("is-sticky");
                        console.log(stickyWrapper);
                    }
                } else {
                    if ($scope.hasClass('wtz-addons-sticky-yes')) {
                        stickyWrapper.removeClass("is-sticky");
                    }
                }
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    if ($scope.hasClass('wtz-addons-sticky-yes')) {
                        $scope.addClass("reveal-sticky");
                    }
                } else {
                    if ($scope.hasClass('wtz-addons-sticky-yes')) {
                        $scope.removeClass("reveal-sticky");
                    }
                }

            }

        }
    }

    var WebthemezilaductCategories = function() {
        if ($.fn.isotope) {
            var $gridMas = $('.product-categories-wrap.masonry');

            $gridMas.isotope({
                itemSelector: '.wtz-addons-product-cat-wrap',
                percentPosition: true,
                layoutMode: 'packery',
            })

            $gridMas.imagesLoaded().progress(function() {
                $gridMas.isotope()
            });
        }
    }

    var WTZ_Addons_Blog = function($scope) {
        var wrapper = $scope.find('.masonry')
        if ($.fn.isotope) {

            wrapper.isotope({
                itemSelector: '.fastland-blog-wraper>.masonry>div',
                percentPosition: true,
                layoutMode: 'packery',
            })

        }
    }

    var ShadeJobLoop = function() {
        if ($.fn.owlCarousel) {
            $('.wtz-addons-job-carousel').owlCarousel({
                margin: 30,
                responsiveClass: true,
                navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    768: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 4,
                        nav: true,
                        loop: false
                    }
                }
            })
        }
    }





    //portfolio gallery js start
    var WTZ_Addons_Portfolio_Gallery_Js = function() {

        if ($.fn.isotope) {

            $(window).load(function() {
                var $gridMas = $('.wtz-addons-pf-gallery-wrap.layout-mode-masonry');

                $gridMas.isotope({
                    itemSelector: '.wtz-addons-pf-gallery-wrap .wtz-addons-portfolio-item-wrap',
                    percentPosition: true,
                    layoutMode: 'packery',
                }).resize();

                $gridMas.imagesLoaded().progress(function() {
                    $gridMas.isotope()
                });
            })
        }

    }

    //portfolio js start
    var WTZ_Addons_Portfolio_Js = function() {
        if ($.fn.isotope) {

            var $gridMas = $('.wtz-addons-portfolio-wrap.layout-mode-masonry');
            var $grid = $('.wtz-addons-portfolio-wrap.layout-mode-normal');

            $grid.isotope({
                itemSelector: '.wtz-addons-portfolio-item-wrap',
                percentPosition: true,
                layoutMode: 'fitRows',
            }).resize()

            $grid.imagesLoaded().progress(function() {
                $grid.isotope('layout')
            }).resize();

            $gridMas.isotope({
                itemSelector: '.wtz-addons-portfolio-item-wrap',
                percentPosition: true,
                layoutMode: 'packery',
            })

            $gridMas.imagesLoaded().progress(function() {
                $gridMas.isotope('layout')
            });

            $grid.isotope().resize();
            $gridMas.isotope().resize();

            $(".pf-isotope-nav li").on('click', function() {
                $(".pf-isotope-nav li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $gridMas.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: "linear",
                        queue: false,
                    }
                });

                var selector = $(this).attr("data-filter");
                $grid.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: "linear",
                        queue: false,
                    }
                });


            });

        }

        // comment load more button click event
        $('.wtz-addons-pf-loadmore-btn').on('click', function() {
            var button = $(this);

            // decrease the current comment page value
            var dpaged = button.data('paged'),
                total_pages = button.data('total-page'),
                nonce = button.data('referrar'),
                ajaxurl = button.data('url');

            dpaged++;
            // console.log(foio_portfolio_js_datas);
            $.ajax({
                url: ajaxurl, // AJAX handler, declared before
                dataType: 'html',
                data: {
                    'action': 'wtz_addons_loadmore_callback', // wp_ajax_cloadmore
                    // 'post_id': foio_portfolio_js_datas.parent_post_id, // the current post
                    'paged': dpaged, // current comment page
                    'folio_nonce': nonce,
                    'portfolio_settings': button.data('portfolio-settings'),
                },
                type: 'POST',
                beforeSend: function(xhr) {
                    button.text('Loading...'); // preloader here
                },
                success: function(data) {
                    if (data) {
                        $('.wtz-addons-portfolio-wrap').append(data);
                        $('.wtz-addons-portfolio-wrap').isotope('reloadItems').isotope()
                        button.text('More projects');
                        button.data('paged', dpaged);
                        // if the last page, remove the button
                        if (total_pages == dpaged)
                            button.remove();
                    } else {
                        button.remove();
                    }
                }
            });
            return false;
        });

    }


    var WTZ_Addons_Testimonail = function($scope, $) {
        //adding popup video 
        if ($.fn.magnificPopup) {
            $('.wtz-addons-popup-youtube').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
            });
        }


        var postwrapper = $scope.find(".wtz-addons--testimonial");

        if (postwrapper.length === 0)
            return;

        var settings = postwrapper.data('settings');

        /*--------------------------------------------------------------
        wtz-addons slider js
        --------------------------------------------------------------*/
        var postwrapper = $('.wtz-addons--testimonial'),
            rtl = $('body').hasClass('rtl') ? true : false;

        postwrapper.owlCarousel({
            rtl: rtl,
            loop: settings['loop'],
            autoplay: settings['autoplay'],
            nav: settings['nav'],
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplaytimeout: settings['autoplaytimeout'],
            items: 1,
            navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" style="transform: rotate(180deg);"><path d="M1.16669 14H26.25" stroke="#fff" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0834 5.83334L26.25 14L18.0834 22.1667" stroke="#fff" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M1.16669 14H26.25" stroke="#fff" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0834 5.83334L26.25 14L18.0834 22.1667" stroke="#fff" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
            ],
        });

    }

    var WTZ_Addons_Back_To_Top = function($scope, $) {
        //adding popup video 

        $('.wtz-addons-popup-youtube').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
        });



        /*--------------------------------------------------------------
        wtz-addons slider js
        --------------------------------------------------------------*/
        var postwrapper = $('.wtz-addons--testimonial');

        jQuery(".wtz-addons-back-to-top-wraper").click(function() {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 1000);
        });

        function stickyHeader($class) {
            jQuery(window).on('scroll', function() {
                var headerHeight = 600;
                if (jQuery(window).scrollTop() >= headerHeight) {
                    jQuery('.wtz-addons-back-to-top-wraper .wtz-addons-icon').addClass('sticky-active');
                } else {
                    jQuery('.wtz-addons-back-to-top-wraper .wtz-addons-icon').removeClass('sticky-active');
                }
            });
        }

        stickyHeader('.wtz-addons-back-to-top-wraper');

    }



    function makeTimer() {

        var wtz_addonsDate = $(".wtz-addons-countdown#date").data("date");
        var endTime = new Date(wtz_addonsDate);
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#days").html(days);
        $("#hours").html(hours);
        $("#minutes").html(minutes);
        $("#seconds").html(seconds);

    }

    var WTZ_Addons_CountDown = function() {
        setInterval(function() {
            makeTimer();
        }, 1000);
    }

    // progress bar script starts

    function animatedProgressbar(id, type, value, strokeColor, trailColor, strokeWidth, strokeTrailWidth) {
        var triggerClass = '.wtz-addons-progress-bar-' + id;
        if ('function' === typeof ldBar) {
            if ('line' === type) {
                new ldBar(triggerClass, {
                    'type': 'stroke',
                    'path': 'M0 10L100 10',
                    'aspect-ratio': 'none',
                    'stroke': strokeColor,
                    'stroke-trail': trailColor,
                    'stroke-width': strokeWidth,
                    'stroke-trail-width': strokeTrailWidth
                }).set(value);
            }
            if ('line-bubble' === type) {
                new ldBar(triggerClass, {
                    'type': 'stroke',
                    'path': 'M0 10L100 10',
                    'aspect-ratio': 'none',
                    'stroke': strokeColor,
                    'stroke-trail': trailColor,
                    'stroke-width': strokeWidth,
                    'stroke-trail-width': strokeTrailWidth
                }).set(value);
                $($('.wtz-addons-progress-bar-' + id).find('.ldBar-label')).animate({
                    left: value + '%'
                }, 1000, 'swing');
            }
            if ('circle' === type) {
                new ldBar(triggerClass, {
                    'type': 'stroke',
                    'path': 'M50 10A40 40 0 0 1 50 90A40 40 0 0 1 50 10',
                    'stroke-dir': 'normal',
                    'stroke': strokeColor,
                    'stroke-trail': trailColor,
                    'stroke-width': strokeWidth,
                    'stroke-trail-width': strokeTrailWidth
                }).set(value);
            }
            if ('fan' === type) {
                new ldBar(triggerClass, {
                    'type': 'stroke',
                    'path': 'M10 90A40 40 0 0 1 90 90',
                    'stroke': strokeColor,
                    'stroke-trail': trailColor,
                    'stroke-width': strokeWidth,
                    'stroke-trail-width': strokeTrailWidth
                }).set(value);
            }
        }
    }

    var WTZ_Addons_ProgressBar = function($scope, $) {
            var progressBarWrapper = $scope.find('[data-progress-bar]').eq(0);
            if ($.isFunction($.fn.waypoint)) {
                progressBarWrapper.waypoint(function() {
                    var element = $(this.element),
                        id = element.data('id'),
                        type = element.data('type'),
                        value = element.data('progress-bar-value'),
                        strokeWidth = element.data('progress-bar-stroke-width'),
                        strokeTrailWidth = element.data('progress-bar-stroke-trail-width'),
                        color = element.data('stroke-color'),
                        trailColor = element.data('stroke-trail-color');
                    animatedProgressbar(id, type, value, color, trailColor, strokeWidth, strokeTrailWidth);
                    this.destroy();
                }, {
                    offset: 'bottom-in-view'
                });
            }
        }
        // progress bar script ends

    // Pricing Table
    var WTZ_Addons_Pricing_Table = function() {

            $("[data-pricing-trigger]").on("click", function(e) {
                $(e.target).toggleClass("active");
                var target = $(e.target).attr("data-target");
                if ($(target).attr("data-value-active") == "monthly") {
                    $(target).attr("data-value-active", "yearly");
                } else {
                    $(target).attr("data-value-active", "monthly");
                }
            })

            // Classic tab switcher
            $("[data-pricing-tab-trigger]").on("click", function(e) {
                $('[data-pricing-tab-trigger]').removeClass("active");
                $(this).addClass("active");
                var target = $(e.target).attr("data-target");
                if ($(target).attr("data-value-active") == "monthly") {
                    $(target).attr("data-value-active", "yearly");
                } else {
                    $(target).attr("data-value-active", "monthly");
                }
            })

        }
        // Pricing Table
        /*
        *
        This code use Tab Widget
        *
        */
    var WTZ_Addons_Tab = function($scope, $) {
        $scope.find('ul.tabs li').on('click', function() {
            var tab_id = $(this).attr('data-tab');
            $scope.find('ul.tabs li').removeClass('current');
            $scope.find('.wtz-addons-tab-content-single').removeClass('current');
            $(this).addClass('current');
            $scope.find("#" + tab_id).addClass('current');
        })
        if ($.fn.magnificPopup) {
            $('.wtz-addons-elm-edit').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade wtz-addons-elm-edit-popup',
                callbacks: {
                    open: function() {
                        // Will fire when this exact popup is opened
                        // this - is Magnific Popup object
                    },
                    close: function() {
                            location.reload();

                        }
                        // e.t.c.
                }
            });
            console.log('helw')
        }
    };


    /*  Brand Logo Slider */
    var WTZ_Addons_Brand_Logo = function($scope, $) {

        var icarousel = $scope.find(".brand-logo-slider");
        var id = $scope.data('id');

        if (icarousel.length === 0)
            return;

        var datas = icarousel.data('brand');

        var rtl = $('body').hasClass('rtl') ? true : false;
        var apps = $('.brand-logo-slider');

        if (apps.is_exist()) {
            apps.slick({
                rtl: rtl,
                loop: true,
                centerMode: true,
                centerPadding: '0',
                lazyLoad: 'ondemand',
                slidesToShow: datas['per_coulmn'],
                slidesToScroll: 1,
                dots: datas['dots'],
                arrows: datas['nav'],
                appendArrows: '.brand-logo-slider-arrow',
                prevArrow: $('.prev-' + id),
                nextArrow: $('.next-' + id),
                autoplay: datas['autoplay'],
                autoplaySpeed: datas['autoplaytimeout'],
                infinite: datas['loop'],
                easing: 'linear',
                speed: 800,
                appendDots: ".brand-logos-dots",
                responsive: [{
                        breakpoint: 1600,
                        settings: {
                            slidesToShow: datas['per_coulmn'],
                        },
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: datas['per_coulmn_tablet'],

                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: datas['per_coulmn_mobile'],
                            centerMode: true,
                            centerPadding: '0',
                        },
                    },
                ],
            })
        }
    }


    // Blog Slider
    var Blog_slider_Js = function($scope) {

        var wrapper = $scope.find(".blog-slider");

        var id = $scope.data('id');

        // console.log(id);

        if (wrapper.length === 0)
            return;

        var settings = wrapper.data('settings');


        wrapper.slick({
            infinite: true,
            speed: 900,
            slidesToShow: settings['per_coulmn'],
            slidesToScroll: 1,
            autoplay: settings['autoplay'],
            autoplaySpeed: settings['autoplaytimeout'],
            arrows: true,
            draggable: settings['mousedrag'],
            dots: settings['dots'],
            centerPadding: '0',
            lazyLoad: 'ondemand',
            centerMode: settings['show_center_mode'],
            dotsClass: "blog-slider-dot-list",
            swipe: false,
            vertical: settings['show_vertical'],
            prevArrow: $('.prev-' + id),
            nextArrow: $('.next-' + id),
            responsive: [{
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: settings['per_coulmn'],
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: settings['per_coulmn_tablet'],
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: settings['per_coulmn_mobile'],
                        slidesToScroll: 1,
                        arrows: false,
                        vertical: false,
                    },
                },
            ],
        });

    }

    // BUTTON HOVER
    var Fd_button_Js = function() {

        $('.all-side').on('mouseenter', function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            $(this).find('span.hover-animation').css({top: y, left: x})
        });
        
        $('.all-side').on('mouseout', function(e) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            $(this).find('span.hover-animation').css({top: y, left: x})
        });
    }



    $(window).on("elementor/frontend/init", function() {

        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-product-categories.default", WebthemezilaductCategories);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-tab.default", WTZ_Addons_Tab);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-job-loop.default", ShadeJobLoop);
        // elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-blog.default", WTZ_Addons_Blog);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-testimonial.default", WTZ_Addons_Testimonail);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-back-to-top.default", WTZ_Addons_Back_To_Top);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-portfolio.default", WTZ_Addons_Portfolio_Js);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-portfolio-gallery.default", WTZ_Addons_Portfolio_Gallery_Js);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-countdown.default", WTZ_Addons_CountDown);
        elementorFrontend.hooks.addAction('frontend/element_ready/wtz-addons-progress-bar.default', WTZ_Addons_ProgressBar);
        elementorFrontend.hooks.addAction('frontend/element_ready/wtz-addons-price-table.default', WTZ_Addons_Pricing_Table);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-accordion.default", fdAddonsAccordion);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-blog.default", Blog_slider_Js);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-brand-logo.default", WTZ_Addons_Brand_Logo);
        elementorFrontend.hooks.addAction("frontend/element_ready/wtz-addons-btn.default", Fd_button_Js);
        elementorFrontend.hooks.addAction("frontend/element_ready/global", WebthemezilaGlobal);

    });

})(jQuery);

