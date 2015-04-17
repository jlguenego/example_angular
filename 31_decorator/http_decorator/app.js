(function() {
	'use strict';

	var app = angular.module('mainApp', [ 'fakeHttp' ]);

	app.controller('MainCtrl', [ '$scope', '$http', function($scope, $http) {
		$scope.click = function() {
			$http({
				method: 'GET',
				url: 'http://bot.whatismyipaddress.com/'
			}).then(function(response) {
				console.log(response);
				console.log(response.headers());
				$scope.content = response.data;
			});
		}

	}]);
})();
