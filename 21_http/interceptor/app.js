(function() {
	var app = angular.module('mainApp', []);

	app.controller('MainCtrl', [ '$scope', '$injector', function($scope, $injector) {
		var $http = $injector.get('$http');
		var $log = $injector.get('$log');
		$log.debug('start controller');
		var config = {
			headers: {
				'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
				'Accept': 'application/json;odata=verbose'
			}
		};

		$http.get('content.json', config).success(function(data, status, headers, config) {
			$log.debug('success');
			$log.debug(arguments);
			$scope.content = data.content;
		}).error(function(data, status, headers, config) {
			$log.debug('error');
			$log.debug(arguments);
			$scope.content = data.content;
		});

		$http.get('content2.json', config).success(function(data, status, headers, config) {
			$log.debug('success');
			$log.debug(arguments);
			$scope.content = data.content;
		}).error(function(data, status, headers, config) {
			$log.debug('error');
			$log.debug(arguments);
			$scope.content = data.content;
		});
	}]);


	app.config([ '$httpProvider', '$provide', function($httpProvider, $provide) {
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
		$provide.factory('myHttpInterceptor', [ '$q', '$injector', function($q, $injector) {
			var $log = $injector.get('$log');
			return {
				// optional method
				'request': function(config) {
					// do something on success
					console.log('running interceptor request ', config);
					return config;
				},

				// optional method
				'requestError': function(rejection) {
					console.log('running interceptor requestError ', rejection);
					// do something on error
					if (canRecover(rejection)) {
						return responseOrNewPromise
					}
					return $q.reject(rejection);
				},



				// optional method
				'response': function(response) {
					$log.debug('running interceptor response ', response);
					if (response.data.content == 'Error') {
						$log.error('content has error ');
						return $q.reject(response);
					}

					// do something on success
					return response;
				},

				// optional method
				'responseError': function(rejection) {
					console.log('running interceptor responseError ', rejection);
					// do something on error
					if (canRecover(rejection)) {
						return responseOrNewPromise
					}
					return $q.reject(rejection);
				}
			};
		}]);

		$httpProvider.interceptors.push('myHttpInterceptor');

		console.log('interceptors', $httpProvider.interceptors);
	}]);
})();
