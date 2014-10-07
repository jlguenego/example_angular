(function() {
	var app = angular.module('myApp', []);

	app.controller('MyFirstController', [ '$scope', function($scope) {
		this.decrement_count = function() {
			$scope.count.value--;
		};
	}]);

	app.controller('MySecondController', [ '$scope', function($scope) {
		this.increment_count = function() {
			$scope.count.value++;
		};

	}]);
})();