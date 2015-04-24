(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.directive('myFirstDirective', function() {
		return {
			restrict: 'E',
			templateUrl: 'my_template.html',
			transclude: true
		};
	});
})();
