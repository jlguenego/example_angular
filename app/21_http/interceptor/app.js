(function() {
	'use strict';

	var app = angular.module('mainApp', ['angularSpinner']);

	app.controller('MainCtrl', ['$scope', '$injector', function($scope, $injector) {
		var $http = $injector.get('$http');
		var $log = $injector.get('$log');
		$log.debug('start controller');

		$scope.click = function(file) {

			$http.get(file).then(function(response) {
				$scope.content = response.data;
			}).catch(function(error) {
				console.log('Error! ', error);
				$scope.content = 'error';
			});
		};

		$scope.reset = function() {
			$scope.content = '';
		};

	}]);

	app.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
		usSpinnerConfigProvider.setDefaults({
			lines: 13,

			// The number of lines to draw
			length: 20,

			// The length of each line
			width: 10,

			// The line thickness
			radius: 30,

			// The radius of the inner circle
			corners: 1,

			// Corner roundness (0..1)
			rotate: 0,

			// The rotation offset
			direction: 1,

			// 1: clockwise, -1: counterclockwise
			color: '#000',

			// #rgb or #rrggbb or array of colors
			speed: 1,

			// Rounds per second
			trail: 60,

			// Afterglow percentage
			shadow: false,

			// Whether to render a shadow
			hwaccel: false,

			// Whether to use hardware acceleration
			className: 'spinner',

			// The CSS class to assign to the spinner
			zIndex: 2e9,

			// The z-index (defaults to 2000000000)
			top: '50%',

			// Top position relative to parent
			left: '50%'

			// Left position relative to parent
		});
	}]);

	app.config(['$httpProvider', '$provide', function($httpProvider, $provide) {
		$httpProvider.defaults.transformRequest.push(function(data, headersGetter) {
			console.log('transformRequest data ', data);
			console.log('transformRequest headersGetter ', headersGetter);
			return data;
		});
		console.log('transformRequest ', $httpProvider.defaults.transformRequest);

		$httpProvider.defaults.transformResponse.unshift(function(data, headersGetter) {
			console.log('transformResponse data ', data);
			console.log('transformResponse headersGetter ', headersGetter);
			return data;
		});
		console.log('transformResponse ', $httpProvider.defaults.transformResponse);

		$httpProvider.defaults.cache = true;

		// register the interceptor as a service
		$provide.factory('myHttpInterceptor', ['$injector', function($injector) {
			var $log = $injector.get('$log');
			var usSpinnerService = $injector.get('usSpinnerService');
			var $q = $injector.get('$q');
			var $timeout = $injector.get('$timeout');

			return {
				// optional method
				request: function(config) {
					// do something on success
					console.log('running interceptor request ', config);
					console.log('arguments ', arguments);
					usSpinnerService.spin('spinner-1');
					return $timeout(function() {
 return config;
}, 2000);
				},

				// optional method
				requestError: function(rejection) {
					usSpinnerService.stop('spinner-1');
					console.log('running interceptor requestError ', rejection);
					return $q.reject(rejection);
				},


				// optional method
				response: function(response) {
					$log.debug('running interceptor response ', response);
					usSpinnerService.stop('spinner-1');
					if (response.data.content == 'Error') {
						$log.error('content has error ');
						return $q.reject(response);
					}

					// do something on success
					return response;
				},

				// optional method
				responseError: function(rejection) {
					usSpinnerService.stop('spinner-1');
					console.log('running interceptor responseError ', rejection);

					// do something on error
					//					if (canRecover(rejection)) {
					//						return responseOrNewPromise
					//					}
					return $q.reject(rejection);
				}
			};
		}]);

		$httpProvider.interceptors.push('myHttpInterceptor');

		console.log('interceptors', $httpProvider.interceptors);
	}]);
})();
