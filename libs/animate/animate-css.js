//Animate CSS + WayPoints javaScript Plugin
//Example: $(".element").animated("zoomInUp");
//Author URL: http://webdesign-master.ru
(function($) {
	$.fn.animated = function(inEffect) {
		$(this).each(function() {
			var ths = $(this);
			ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
				if (dir) {
					//if (!ths.hasClass(inEffect)) {
						ths.addClass(inEffect).css("opacity", "1");
					//} else {
					//	ths.removeClass(inEffect).css("opacity", "0");
					//}
				};
			}, {
				offset: "90%"
			});

		});
	};
})(jQuery);