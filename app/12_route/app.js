(function() {
	'use strict';

	var img = 'http://businessasmission.com/wp-content/uploads/2015/04/above-the-clouds-845x321.jpeg';

	var app = angular.module('myApp', ['ngRoute']);
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

	// just for the sunrise. Nothing to do with the SPA
	app.run(function($document, $timeout) {
		'ngInject';
		angular.element('<img/>').attr('src', img).on('load', function() {
			angular.element(this).remove();
			angular.element($document[0].body).removeClass('is-loading');
		});
	});

	app.controller('MessageController', ['$routeParams', function($routeParams) {
		this.message = $routeParams.msg;
	}]);
})();
