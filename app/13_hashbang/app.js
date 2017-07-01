(function() {
	'use strict';

	var app = angular.module('myApp', ['ngRoute', 'jlg-css']);
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider
			.hashPrefix('!');

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

	app.controller('MessageController', function($routeParams, jlgCss) {
		'ngInject';
		this.message = $routeParams.msg;
		var img = 'http://jlg-consulting.com/orsys/FAN/resources/mt-fuji-2232246.jpg'
		jlgCss.onload(img);
	});
})();
