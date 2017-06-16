(function() {
	'use strict';

	var app = angular.module('main', ['ngRoute', 'authentication', 'welcome']);

	app.config(function($routeProvider, $logProvider) {
		'ngInject';
		$logProvider.debugEnabled(true);

		$routeProvider
			.when('/login', {
				templateUrl: 'tmpl/login.html',
				controller: 'AuthenticationCtrl', 
				controllerAs: '$ctrl'
			})
			.when('/main', {
				templateUrl: 'tmpl/welcome.html',
				controller: 'WelcomeCtrl',
				controllerAs: '$ctrl'
			})
			.when('/logout', {
				templateUrl: 'tmpl/logout.html'
			})
			.otherwise({
				redirectTo: '/main'
			});
	});
})();
