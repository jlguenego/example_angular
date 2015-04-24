(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', function($scope) {
			$scope.lastUpdate = undefined;
			$scope.$watch('name', function() {
				$scope.lastUpdate = new Date();
			});
		}]);
})();
