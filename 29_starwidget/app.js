(function() {
	var app = angular.module('myApp', []);

	function my_stars(element, attributes) {
		return 'coucou bidule';
	};

	app.directive('myStars', function() {
		return {
			restrict: 'E',
			template: function() { console.log('hello'); return 'partials/truc.html' },
			transclude: true
		};
	});
})();