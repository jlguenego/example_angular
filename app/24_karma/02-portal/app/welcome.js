(function() {
	'use strict';

	var app = angular.module('welcome', ['ngResource', 'authentication']);

	app.controller('welcome.MainCtrl',
		function($rootScope, $location, $resource, $log, authentication) {
			if (authentication.state != 'logged') {
				$location.url('/login');
				return;
			}
			$log.debug('logged');
			$rootScope.message = 'Welcome ' + authentication.login + '!';
			$rootScope.serviceJson = $resource('data/' + authentication.login + '.json').get();
		}
	);
})();
