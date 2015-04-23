(function() {
	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', function($scope) {
			$scope.last_update = undefined;
			$scope.$watch('name', function() {
				$scope.last_update = new Date();
			});
		}]);
})();
