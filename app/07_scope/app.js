(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyFirstController', ['$scope', function($scope) {
		this.decrementCount = function() {
			$scope.count.value--;
		};
	}]);

	app.controller('MySecondController', ['$scope', function($scope) {
		this.incrementCount = function() {
			$scope.count.value++;
		};

	}]);
})();
