(function() {
	'use strict';

	var app = angular.module('main', ['ngRoute', 'authentication', 'welcome']);

	app.config(function($routeProvider, $logProvider) {
		'ngInject';
		$logProvider.debugEnabled(true);

		$routeProvider
			.when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'AuthenticationCtrl', 
				controllerAs: '$ctrl'
			})
			.when('/main', {
				templateUrl: 'partials/welcome.html',
				controller: 'welcome.MainCtrl',
				controllerAs: '$ctrl'
			})
			.when('/logout', {
				templateUrl: 'partials/logout.html'
			})
			.otherwise({
				redirectTo: '/main'
			});
	});
})();
