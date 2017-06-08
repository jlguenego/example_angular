(function() {
	'use strict';

	var app = angular.module('myApp', ['ngRoute', 'jlg-css']);
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider
			.hashPrefix('');

		$routeProvider
			.when('/', {
				templateUrl: 'cover.html'
			})
			.when('/hello', {
				templateUrl: 'hello.html'
			})
			.when('/:msg', {
				templateUrl: 'message.html',
				controller: 'MessageController',
				controllerAs: '$ctrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

	app.controller('MessageController', ['$routeParams', function($routeParams) {
		this.message = $routeParams.msg;
	}]);
})();
