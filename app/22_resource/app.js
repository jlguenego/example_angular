(function() {
	'use strict';

	var app = angular.module('myApp', ['ngResource']);

	app.controller('MyController', ['$scope', '$resource', function($scope, $resource) {
		$scope.data = undefined;
		$scope.startAjax = function() {
			$scope.data = $resource('content.json').get();
			console.log('appel en cours...');
		};
		$scope.getPromise = function() {
			console.log($scope.data);
		};
	}]);
})();
