(function() {
	var app = angular.module('myApp', ['ngResource']);

	app.factory('myService', ['$resource', function($resource){
		var result = $resource('content.json');
		return result;
	}]);

	app.controller('MyController', [ '$scope', 'myService', function($scope, myService) {
		$scope.data = myService.get();
	}]);
})();
