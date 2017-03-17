(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');

		$rootScope.callWebService = function() {
			$http.get('webservice.json').then(function(response) {
				$rootScope.webserviceMsg = response.data.msg;
			}).catch(function(error) {
				console.error('error', error);
			});

		};
	}]);
})();
