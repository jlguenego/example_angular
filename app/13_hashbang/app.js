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
		var img = 'http://motivationsparkles.com/wp-content/uploads/2017/05/Why-are-we-so-alone.jpg'
		jlgCss.onload(img);
	});
})();
