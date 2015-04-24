(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', '$http', function($scope, $http) {
		$http.get('content.json').success(function(data) {
			$scope.content = data.content;
		});
	}]);
})();
