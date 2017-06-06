(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', '$element', '$timeout', '$q', function($scope, $element, $timeout, $q) {
		var ctrl = this;
		$scope.lastUpdate = new Date();
		$scope.$watch('name', function() {
			ctrl.update();
		});

		// This code uses the promises. Go to example 23 to see more about promises.
		ctrl.update = function() {
			var until = new Date();
			$element.find('clock').addClass('updating');

			function increment() {
				$q.when('start').then(function() {
					if ($scope.lastUpdate < until) {
						return $timeout(function() {
							$scope.lastUpdate = new Date($scope.lastUpdate.getTime() + 1000);
						}, 100).then(function() {
							increment();
						});
					}
					$element.find('clock').removeClass('updating');
				})
			}
			increment();
		};



	}]);
})();
