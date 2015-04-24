(function($, undefined) {

	'use strict';

	$.widget('ui.stars', {
		version: '0.0.1',
		options: {
			rate: 3,
			total: 5
		},

		_create: function() {
			var html = '';

			for (var i = 0; i < this.options.rate; i++) {
				html += '<img src="yellow_star.png" />';
			}
			for (var i = this.options.rate; i < this.options.total; i++) {
				html += '<img src="white_star.png" />';
			}
			this.element.html(html);
			return this;
		},

		_destroy: function() {
		}
	});

})(jQuery);
