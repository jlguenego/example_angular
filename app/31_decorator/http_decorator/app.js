(function() {
	'use strict';

	var app = angular.module('mainApp', ['fakeHttp']);

	app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.click = function(url) {
			$http({
				method: 'GET',
				url: url
			}).then(function(response) {
				console.log(response);
				console.log(response.headers());
				$scope.content = response.data;
			});
		};

	}]);
})();
