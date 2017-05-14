jQuery(document).ready(function(){
  "use strict";
   
/*=================================================
1 - isotope
=================================================*/

		// Isotope Portfolio
		var $container = jQuery('.portfolio');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			layoutMode: 'fitRows'
		});
		jQuery('.port-filter li a').on('click',function(){
			jQuery('.port-filter li').removeClass('active');
			jQuery(this).parent().addClass('active');
	 
			var selector = jQuery(this).attr('data-filter');
			$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			layoutMode: 'fitRows'
		});
			return false;
		});
		jQuery(window).load(function() {
      "use strict";
			$container.isotope('reLayout');
		});


});