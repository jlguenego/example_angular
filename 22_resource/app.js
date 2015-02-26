(function() {
	var app = angular.module('myApp', ['ngResource']);

	app.controller('MyController', [ '$scope', '$resource', function($scope, $resource) {
		$scope.data = undefined;
		$scope.start_ajax = function() {
			$scope.data = $resource('content.json').get();
			console.log('appel en cours...');
		};
		$scope.get_promise = function() {
			console.log($scope.data);
		};
	}]);
})();
