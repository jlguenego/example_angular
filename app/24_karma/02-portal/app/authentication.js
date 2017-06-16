(function() {
	'use strict';
	var app = angular.module('authentication', []);

	app.controller('AuthenticationCtrl', function($scope, $log, $rootScope, $http, $location, logout) {
		'ngInject';

		var ctrl = this;
		ctrl.authenticate = function() {
			$log.debug('authenticate');
			$rootScope.state = 'not logged';
			$rootScope.errorMessage = undefined;
			$http.get('data/login.json').then(function(response) {
				var data = response.data;
				if (!(data.logins && data.logins instanceof Array)) {
					$log.debug(data.logins);
					$log.error('json not well formatted');
					$rootScope.errorMessage = 'technical error';
					return;
				}
				$log.debug('login = ', $scope.login);
				$log.debug('logins = ', data.logins);
				if (data.logins.indexOf($scope.login) > -1) {
					$rootScope.state = 'logged';
					$rootScope.login = $scope.login;
					$location.url('/');
				} else {
					$rootScope.errorMessage = 'bad login/password';
				}
			}).catch(function(error) {
				$rootScope.errorMessage = 'technical error';
			});
			$log.error('bad login');
		};
		$rootScope.logout = logout.run;
	});

	app.factory('logout', ['$rootScope', '$location', '$log', function($rootScope, $location, $log) {
		return {
			run: function() {
				$log.debug('About to logout');
				$rootScope.state = 'not logged';
				$rootScope.errorMessage = undefined;
				$location.url('/logout');
				$log.debug('logout done.');
			}
		};
	}]);

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
