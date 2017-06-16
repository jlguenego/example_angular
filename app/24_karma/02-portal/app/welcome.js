(function() {
	'use strict';

	var app = angular.module('welcome', ['ngResource']);

	app.controller('welcome.MainCtrl', ['$rootScope', '$location', '$resource', '$log',
		function($rootScope, $location, $resource, $log) {
			if ($rootScope.state != 'logged') {
				$location.url('/login');
				return;
			}
			$log.debug('logged');
			$rootScope.message = 'Welcome ' + $rootScope.login + '!';
			$rootScope.serviceJson = $resource('data/' + $rootScope.login + '.json').get();
		}
	]);
})();
