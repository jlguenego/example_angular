(function() {
	var app = angular.module('myApp', []);

	function my_stars(element, attributes) {
		return 'coucou bidule';
	};

	app.directive('myStars', function() {
		return {
			restrict: 'E',
			scope: {
				rate: '=rate',
				total: '=total'
			},
			template: function(elem, attr) {
				var html = '';
				var rate = attr.rate || 3;
				var total = attr.total || 5;
				for (var i = 0; i < rate; i++) {
					html += '<img src="yellow_star.png" />';
				}
				for (var i = rate; i < total; i++) {
					html += '<img src="white_star.png" />';
				}
				return html;
			},
			transclude: true
		};
	});
})();