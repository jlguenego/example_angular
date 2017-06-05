(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
		var ctrl = this;
		$scope.lastUpdate = new Date();
		$scope.$watch('name', function() {
			ctrl.update();
		});

		// This code uses the promises. Go to example 23 to see more about promises.
		ctrl.update = function() {
			var until = new Date();
			$element.find('clock').addClass('updating');

			function increment(until) {
				$timeout(function() {
					$scope.lastUpdate = new Date($scope.lastUpdate.getTime() + 1000);
				}, 100).then(function() {
					if ($scope.lastUpdate < until) {
						return increment(until);
					}
					$element.find('clock').removeClass('updating');
				});
			}
			increment(until);
		};



	}]);
})();
