(function() {
	'use strict';

	var app = angular.module('myApp', ['ngRoute']);
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(false)
			.hashPrefix('');

		$routeProvider
			.when('/', {
				templateUrl: 'cover.html'
			})
			.when('/hello', {
				templateUrl: 'hello.html'
			})
			.when('/:message', {
				templateUrl: 'message.html',
				controller: 'MessageController',
				controllerAs: 'ctrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
	app.controller('MessageController', ['$routeParams', function($routeParams) {
		this.message = $routeParams.message;
	}]);
})();
