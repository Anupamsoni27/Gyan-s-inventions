 (function($) {

     /* --------------------------------------------
      Page height mange
      --------------------------------------------- */

     function page_height_mange() {
         var minheight = $(window).height();
         var headerhight = $('header').outerHeight(true);
         var hightoutput = minheight - headerhight;
         var half_height = minheight / 2;
         var thirdhaflhight = (hightoutput / 4) * 3.4;

         var thirdhaflcutedhight = (hightoutput / 4) * 0.56;

         $(".full_height").css({
             'min-height': minheight,
             'height': minheight
         });

         $(".full_height").css({
             'min-height': minheight,
             'height': minheight
         });
         $(".half_height_min").css({
             'min-height': minheight / 2,
         });

         $(".thirdhalf_height, .thirdhalf_height .item, .thirdhalf_height  .work-item").css({
             'height': thirdhaflhight
         });

         $(".halfheight_screen, .halfheight_screen  .item").css({
             'height': half_height
         });

         $(".full-screen .work-item, .full-screen .item").css({
             'min-height': minheight,
             'height': minheight
         });

         $(".full-screen-minus-header .work-item, .full-screen-minus-header .item").css({
             'min-height': hightoutput,
             'height': hightoutput
         });
     }

     /* --------------------------------------------
      Nav Menu
      --------------------------------------------- */

     function et_nav_menu() {

         $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
         $('.menu > ul ul li:has( > ul)').addClass('menu-dropdown-arrow-icon');
         //Checks if li has sub (ul) and adds class for toggle icon - just an UI

         $(".main-nav").before("<div class=\"menu-nav-btn-holder\"> <a href=\"#\" id=\"main-menu-btn\" class=\"menu-nav-btn\"><span>Menu</span></a></div>");

         //Adds menu-nav-btn class (for mobile toggle menu) before the normal menu
         //Mobile menu is hidden if width is more then 943px, but normal menu is displayed
         //Normal menu is hidden if width is below 943px, and jquery adds mobile menu
         //Done this way so it can be used with wordpress without any trouble


         if ($("header").hasClass("sideheader")) {
             if ($(window).width() > 943) {
                 $(".menu > ul > li").on('click', function() {
                     $(this).children("ul").slideToggle(300);
                     $(this).closest(".menu-dropdown-icon").toggleClass('menu-dropdown-icon-open');
                 });
             }
         }

         //If width is more than 943px dropdowns are displayed on hover

         $(".menu > ul > li").on('click', function(e) {
             if ($(window).width() <= 943) {
                 $(this).children("ul").slideToggle(300);
                 $(this).closest(".menu-dropdown-icon").toggleClass('menu-dropdown-icon-open');
                 e.preventDefault();
             }
         });


         //If width is less than 943px dropdowns are displayed on Click
         $("#main-menu-btn").on('click', function(e) {
             if ($(window).width() <= 943) {
                 $(".menu > ul").toggleClass('show-on-mobile');
                 $(".menu > ul").slideToggle(300);
             }
             $("#main-menu-btn").toggleClass('menu-open');
             e.preventDefault();
             return false;
         });

         //If width is less than 943px dropdowns are displayed on Click
         $(".menu > ul > li a").on('click', function(e) {
             if ($(window).width() <= 943) {
                 var $trigger = $("#main-menu-btn");
                 if ($trigger !== event.target && !$trigger.has(event.target).length) {
                     $(".menu > ul").removeClass('show-on-mobile');
                     $(".menu > ul").slideUp(300);
                     $("#main-menu-btn").removeClass('menu-open');
                 }
             }
         });

         // Menu for side header that displayed on Click
         $(".sideheader #main-menu-btn").on('click', function(e) {
             if ($(window).width() > 943) {
                 $('.menu-content').fadeToggle(200);
                 $(".sideheader .menu-content-wrap").toggleClass('open-menu-wrap');
                 e.preventDefault();
             }
             return false;
         });

         // Adding active class to Menu nav link
         // Disable - V1.0.2
         // $(function() {
         //     var url = window.location.pathname,
         //         urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
         //     // now grab every link from the navigation
         //     $('.menu-nav a').each(function() {
         //         // and test its normalized href against the url pathname regexp
         //         if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
         //             $(this).parent().addClass('current');
         //         }
         //     });
         // });

         // Menu search bar that displayed on Click
         $("#search-label").on('click', function() {
             $(".search-bar").slideToggle("slow");
             return false;
         });





         // class helper functions from bonzo https://github.com/ded/bonzo

         function classReg(className) {
             return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
         }

         // classList support for class management
         // altho to be fair, the api sucks because it won't accept multiple classes at once
         var hasClass, addClass, removeClass;

         if ('classList' in document.documentElement) {
             hasClass = function(elem, c) {
                 return elem.classList.contains(c);
             };
             addClass = function(elem, c) {
                 elem.classList.add(c);
             };
             removeClass = function(elem, c) {
                 elem.classList.remove(c);
             };
         } else {
             hasClass = function(elem, c) {
                 return classReg(c).test(elem.className);
             };
             addClass = function(elem, c) {
                 if (!hasClass(elem, c)) {
                     elem.className = elem.className + ' ' + c;
                 }
             };
             removeClass = function(elem, c) {
                 elem.className = elem.className.replace(classReg(c), ' ');
             };
         }

         function toggleClass(elem, c) {
             var fn = hasClass(elem, c) ? removeClass : addClass;
             fn(elem, c);
         }

         window.classie = {
             // full names
             hasClass: hasClass,
             addClass: addClass,
             removeClass: removeClass,
             toggleClass: toggleClass,
             // short names
             has: hasClass,
             add: addClass,
             remove: removeClass,
             toggle: toggleClass
         };

         var side_menu_btn_click = document.getElementsByClassName('side_menu_btn_click');
         var overlay_cover = document.getElementById('overlay_cover');

         if ($('#side_menu-left').length) {
             var menuLeft = document.getElementById('side_menu-left');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(menuLeft, 'side_menu-open');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 disableOther('side_menu_btn_click');
             });
         }

         if ($('#side_menu-right').length) {
             var menuRight = document.getElementById('side_menu-right');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(menuRight, 'side_menu-open');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 disableOther('side_menu_btn_click');

             });
         }

         if ($('#side_menu-top').length) {
             var menuTop = document.getElementById('side_menu-top');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(menuTop, 'side_menu-open');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 disableOther('side_menu_btn_click');
             });
         }

         if ($('#side_menu-bottom').length) {
             var menuBottom = document.getElementById('side_menu-bottom');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(menuBottom, 'side_menu-open');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 disableOther('side_menu_btn_click');
             });
         }



         if ($('#side_menu-push-right').length) {
             var menuRight = document.getElementById('side_menu-push-right');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(body, 'side_menu-push-toleft');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 classie.toggle(menuRight, 'side_menu-open');
                 disableOther('side_menu_btn_click');
             });

         }
         if ($('#side_menu-push-left').length) {
             var menuLeft = document.getElementById('side_menu-push-left');
             $(side_menu_btn_click).on('click', function() {
                 classie.toggle(this, 'active');
                 classie.toggle(body, 'side_menu-push-toright');
                 classie.toggle(overlay_cover, 'overlay_cover_opened');
                 classie.toggle(menuLeft, 'side_menu-open');
                 disableOther('side_menu_btn_click');
             });
         }

         var body = document.body;


         function disableOther(button) {
             if (button !== 'side_menu_btn_click') {
                 classie.toggle(side_menu_btn_click, 'disabled');
             }
         }



     }


     /* --------------------------------------------
      Sticky header
      --------------------------------------------- */

     function sticky_header() {

         if (!$("header").hasClass("sideheader")) {
             if ($("header").hasClass("sticky_header")) {
                 var stickyNavTop = $('.sticky_header').offset().top;

                 if ($("header").hasClass("absolute_header")) {

                 } else if ($("header").hasClass("center_header")) {
                     var menu = document.querySelector('.sticky_header');

                     var menuPosition = menu.getBoundingClientRect();
                     var placeholder = document.createElement('div');
                     placeholder.style.width = menuPosition.width + 'px';
                     placeholder.style.height = menuPosition.height + 'px';
                     menu.parentNode.insertBefore(placeholder, menu);

                 } else {
                     var menu = document.querySelector('.sticky_header');
                     var menuPosition = menu.getBoundingClientRect();
                     var bodymarginforheader = menuPosition.height + 'px';
                     $('body').css("margin-top", bodymarginforheader);
                 }

                 var stickyNav = function() {
                     var scrollTop = $(window).scrollTop();

                     if ($("header").hasClass("center_header")) {

                         var fromtop = 0;
                         if ($('.top_header').length) {
                             var fromtop = $(".top_header").outerHeight();
                         }
                         $(".sticky_header").css({
                             top: fromtop + 'px'
                         });

                         if (scrollTop > stickyNavTop + 700) {

                             $(".sticky_header").css({
                                 top: '0px'
                             });
                             $('.sticky_header').addClass('sticky_header_runing');
                         } else {
                             $('.sticky_header').removeClass('sticky_header_runing');

                         }
                     } else {

                         if (scrollTop > stickyNavTop) {
                             $('.sticky_header').addClass('sticky_header_runing');
                         } else {
                             $('.sticky_header').removeClass('sticky_header_runing');
                         }
                     }

                 };



                 stickyNav();
                 $(window).scroll(function() {
                     stickyNav();
                 });
             }
         }

     }

     /* --------------------------------------------
      owl carousel calling function
      --------------------------------------------- */

     function owl_main_carousel() {
         if ($('#main-carousel').length) {
             var owl = $("#main-carousel");
             owl.owlCarousel({
                 nav: true, // Show next and prev buttons
                 smartSpeed: 1000,
                 dotsSpeed: 1000,
                 dragEndSpeed: true,
                 dragEndSpeed: 1000,
                 singleItem: true,
                 pagination: false,
                 items: 1,
             });
         }
     }

     function owl_padding_boxed_carousel() {
         if ($('#padding-boxed-carousel').length) {
             var owl = $("#padding-boxed-carousel");
             owl.owlCarousel({
                 animateOut: 'slideOutUp',
                 animateIn: 'slideInUp',
                 nav: false, // Show next and prev buttons
                 smartSpeed: 1000,
                 dots: true,
                 items: 1,
             });
         }
     }

     function owl_second_carousel() {
         if ($('#second_carousel').length) {
             var owl = $("#second_carousel");
             owl.owlCarousel({
                 nav: false, // Show next and prev buttons
                 smartSpeed: 1000,
                 dotsSpeed: 1000,
                 items: 1,
             });
         }
     }

     function owl_loop_carousel() {
         if ($('#loop_carousel').length) {
             $('#loop_carousel').owlCarousel({
                 items: 5,
                 itemsDesktop: [1000, 5],
                 itemsDesktopSmall: [900, 3],
                 itemsTablet: [600, 2],
                 dots: false,
                 nav: false,
                 itemsMobile: false

             });

         }
     }


     function owl_blog_carousel() {
         if ($('#blog_carousel').length) {
             $('#blog_carousel').owlCarousel({
                 center: true,
                 nav: true,
                 items: 1,
                 loop: true,
                 margin: 10,
                 responsive: {
                     770: {
                         items: 1.3
                     }
                 }

             });

         }
     }

     /* --------------------------------------------
       Isotope  calling function
      --------------------------------------------- */

     function Isotope_masonry_layout() {
         if ($('.masonry_layout').length) {
             // init Isotope
             var $grid = $('.masonry_layout').isotope({
                 percentPosition: true,
                 hiddenStyle: {
                     opacity: 0,
                     transform: 'scale(0.001)'
                 },
                 visibleStyle: {
                     opacity: 1,
                     transform: 'scale(1)'
                 },
                 transitionDuration: '0.6s',
                 masonry: {

                 }
             });
             // Isotope filter
             $('.work_filter li span').on('click', function() {
                 var filterValue = $(this).attr('data-filter');
                 jQuery('.work_filter li').removeClass('active');
                 jQuery(this).parent().addClass('active');
                 $grid.isotope({
                     filter: filterValue
                 });
             });

             // layout Isotope after each image loads
             $grid.imagesLoaded().progress(function() {
                 $grid.isotope('layout');
             });
         }

         if ($('.masonry_product_layout').length) {
             // init Isotope
             var $product_grid = $('.masonry_product_layout').isotope({
                 percentPosition: true,
                 hiddenStyle: {
                     opacity: 0,
                     transform: 'scale(0.001)'
                 },
                 visibleStyle: {
                     opacity: 1,
                     transform: 'scale(1)'
                 },
                 transitionDuration: '0.6s',
                 masonry: {
                     columnWidth: 1,
                 }
             });
             // layout Isotope after each image loads
             $product_grid.imagesLoaded().progress(function() {
                 $product_grid.isotope('layout');
             });
         }
     }
     /* --------------------------------------------
      Number Counter 
      --------------------------------------------- */

     function countToNumber() {
         if ($('.timer').length) {
             $('.timer').countTo();
         }
     }

     /* --------------------------------------------
       Countdown
     --------------------------------------------- */
     function et_countdown() {
         if ($('#getting-started').length) {
             $('#getting-started').countdown('2017/01/01', function(event) {
                 $(this).html(event.strftime('<span class="countdown_value"> %m <span class="countdown_lable"> Months  </span></span> <span class="countdown_value"> %d <span class="countdown_lable"> Days </span> </span> <span class="countdown_value"> %H <span class="countdown_lable"> Hours </span></span> <span class="countdown_value"> %M <span class="countdown_lable"> Minutes </span></span> <span class="countdown_value"> %S <span class="countdown_lable"> Seconds </span></span>'));
             });
         }
     }

     /* --------------------------------------------
      Finding first word in hover effect box
      --------------------------------------------- */
     function firstWord() {
         $('.hover_effect figure h2').each(function() {
             var word = $(this).html();
             var index = word.indexOf(' ');
             if (index == -1) {
                 index = word.length;
             }
             $(this).html('<span>' + word.substring(0, index) + '</span>' + word.substring(index, word.length));
         });

     }

     function popup_gallery_int() {
         $('.popup_gallery').magnificPopup({
             delegate: 'img',
             type: 'image',
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             fixedContentPos: false,
             gallery: {
                 enabled: true
             },
             zoom: {
                 enabled: true,
                 duration: 300, // don't foget to change the duration also in CSS

             },

             callbacks: {
                 elementParse: function(qw) {
                     qw.src = qw.el.attr('src');
                 }
             }

         });

         // For video popup (PLAY VIDEO TRIGGER)
         if ($('.video-play-trigger, #video-play-trigger, .video_play_trigger a').length) {
             $('.video-play-trigger, #video-play-trigger, .video_play_trigger a').magnificPopup({
                 disableOn: 700,
                 type: 'iframe',
                 mainClass: 'mfp-with-fade',
                 removalDelay: 160,
                 preloader: false,
                 fixedContentPos: false
             });
         };

         $('.popup-modal').magnificPopup({
             type: 'inline',
             preloader: false,
             focus: '#username',
             modal: true,
             removalDelay: 300,
             mainClass: 'mfp-fade',
         });
         $(document).on('click', '.popup-modal-dismiss', function(e) {
             e.preventDefault();
             $.magnificPopup.close();
         });
     }

     /* --------------------------------------------
       Element Animate effect
     --------------------------------------------- */

     function et_animate_item() {
         AOS.init({
             offset: 160,
             duration: 600,
             easing: 'ease-in-sine',
             delay: 100,
         });
     }

     /* --------------------------------------------
       Google Maps
     --------------------------------------------- */
     function init_map() {
         var myOptions = {
             zoom: 11,
             center: new google.maps.LatLng(40.805478, -73.96522499999998),
             mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
         marker = new google.maps.Marker({
             map: map,
             position: new google.maps.LatLng(40.805478, -73.96522499999998)
         });
         infowindow = new google.maps.InfoWindow({
             content: "<b>The Circle</b><br/>2880 Broadway<br/> New York"
         });
         google.maps.event.addListener(marker, "click", function() {
             infowindow.open(map, marker);
         });
     }

     if ($("#gmap_canvas").length > 0) {

         google.maps.event.addDomListener(window, 'load', init_map);
     }


     /* ---------------------------------------------
      Scripts initialization
      --------------------------------------------- */

     $(window).load(function() {
         "use strict"; // Start of use strict
         Isotope_masonry_layout();
     });

     $(document).ready(function() {
         "use strict"; // Start of use strict  

         $(".fit").fitVids();
         owl_main_carousel();
         owl_second_carousel();
         owl_loop_carousel();
         owl_blog_carousel();
         owl_padding_boxed_carousel();
         popup_gallery_int();
         countToNumber();
         et_countdown();
         firstWord();
         et_nav_menu();
         et_animate_item();
         sticky_header();

     });





     /* ---------------------------------------------
      On resize calling function
      --------------------------------------------- */
     $(window).on('resize', function() {
         "use strict"; // Start of use strict
         page_height_mange();

     }).trigger('resize');

     /* ---------------------------------------------
     Dynamic Page Replacing or loading
     --------------------------------------------- */
     if ($.fn.smoothState) {
         $(function() {
             'use strict';

             function addBlacklistClass() {
                 $('a').each(function() {
                     if (this.href.indexOf('/wp-admin/') !== -1 ||
                         this.href.indexOf('/wp-login.php') !== -1) {
                         $(this).addClass('wp-link');
                     }
                 });
             }

             addBlacklistClass();
             var options = {
                     anchors: 'a',
                     blacklist: '.no-smoothState, .send_button, .ajax_add_to_cart, .add_to_cart_button, .woocommerce a, .woocommerce .input[type="submit"], .woocommerce .cart .button, .woocommerce .cart input.button, .woocommerce input[type="submit"], .wp-link',
                     prefetch: true,
                     cacheLength: 2,
                     scroll: true,

                     onStart: {
                         duration: 250, // Duration of our animation
                         render: function($container) {
                             // Add your CSS animation reversing class
                             $container.addClass('is-exiting');
                             // Restart your animation
                             smoothState.restartCSSAnimations();
                         }
                     },
                     onReady: {
                         duration: 0,
                         render: function($container, $newContent) {
                             // Remove your CSS animation reversing class
                             $container.removeClass('is-exiting');
                             // Inject the new content
                             $container.html($newContent);

                             var url = smoothState.href // <-- get the current url
                             var doc = smoothState.cache[url].doc // <-- full html response
                             var $html = $.htmlDoc(doc)

                             var body_Id = $html.find('body').attr('id');
                             var body_Classes = $html.find('body').attr('class');
                             var body_CSS = $html.find('body').attr('style');

                             // Update body ID, classes and style
                             $('body').removeClass().addClass(body_Classes);
                             $('body').attr('id', body_Id);
                             $('body').attr('style', body_CSS);
                             // update style for VC
                             var style_tag_id = $html.find('[data-type="vc_shortcodes-custom-css"]').html();
                             if ($('head style[data-type="vc_shortcodes-custom-css"]').length > 0) {
                                 $('[data-type="vc_shortcodes-custom-css"]').html(style_tag_id);
                             } else {
                                 $("head").append($("<style data-type='vc_shortcodes-custom-css'>" + style_tag_id + "</style>"));
                             }


                         }
                     },
                     onAfter: function($container, $newContent) {
                         // Trigger document.ready and window.load
                         $(".fit").fitVids();
                         owl_main_carousel();
                         owl_padding_boxed_carousel();
                         owl_second_carousel();
                         owl_loop_carousel();
                         owl_blog_carousel();
                         Isotope_masonry_layout();
                         popup_gallery_int();
                         countToNumber();
                         et_countdown();
                         firstWord();
                         et_nav_menu();
                         et_animate_item();
                         page_height_mange();
                         sticky_header();

                     }

                 },
                 smoothState = $('#main-content').smoothState(options).data('smoothState');
         });
     }

 })(jQuery)
