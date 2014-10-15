(function() {
	var app = angular.module('myApp', []);

	app.factory('myService', ['$resource', function($resource){
		var result = $resource('content.json');
		return result;
	}]);

	app.controller('MyController', [ '$scope', 'myService', function($scope, myService) {
		$scope.content = myService.get();
	}]);
})();
