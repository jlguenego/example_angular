(function() {
	'use strict';
	var app = angular.module('authentication', []);

	app.controller('AuthenticationCtrl', function($scope, $log, $rootScope, $http, $location, authentication, logout) {
		'ngInject';

		var ctrl = this;
		ctrl.authentication = authentication;
		ctrl.authenticate = function() {
			$log.debug('authenticate');
			authentication.state = 'not logged';
			authentication.reason = undefined;
			$http.get('data/login.json').then(function(response) {
				var data = response.data;
				if (!(data.logins && data.logins instanceof Array)) {
					$log.debug(data.logins);
					$log.error('json not well formatted');
					authentication.reason = 'technical error';
					return;
				}
				$log.debug('login = ', ctrl.login);
				$log.debug('logins = ', data.logins);
				if (data.logins.indexOf(ctrl.login) > -1) {
					authentication.state = 'logged';
					authentication.login = ctrl.login;
					$location.url('/');
				} else {
					authentication.reason = 'bad login/password';
				}
			}).catch(function(error) {
				authentication.reason = 'technical error';
			});
		};
		$rootScope.logout = logout.run;
	});

	app.service('authentication', function Authentication() {
		this.state = 'not logged';
		this.reason = undefined;
		this.login = undefined;
	});

	app.factory('logout', function($location, $log, authentication) {
		'ngInject';
		return {
			run: function() {
				$log.debug('About to logout');
				authentication.state = 'not logged';
				authentication.reason = undefined;
				$location.url('/logout');
				$log.debug('logout done.');
			}
		};
	});

	app.config(['$httpProvider', '$provide', function($httpProvider, $provide) {

		$httpProvider.defaults.cache = false;

		// register the interceptor as a service
		$provide.factory('authentication.interceptor', ['$q', '$injector', function($q, $injector) {
			var $log = $injector.get('$log');
			return {
				// optional method
				response: function(response) {
					$log.debug('running interceptor response ', response);
					if (response.data.authenticated === 'false') {
						$log.error('User not authenticated ');
						var logout = $injector.get('logout');
						logout.run();
						return $q.reject(response);
					}

					// do something on success
					return response;
				}
			};
		}]);

		$httpProvider.interceptors.push('authentication.interceptor');

		console.log('interceptors', $httpProvider.interceptors);
	}]);

})();
