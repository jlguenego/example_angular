(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', '$http', function($scope, $http) {
		$http.get('content.json').then(function(response) {
			$scope.content = response.data.content;
		}).catch(function(error) {
			$scope.content = '';
			console.log('Error', error);
		});
	}]);
})();
