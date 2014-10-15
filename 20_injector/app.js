(function() {
	var app = angular.module('myApp', []);
	app.value('s1', { value: 0 });
	app.value('s2', { value: 0 });

	app.controller('MyController', [ '$scope', '$injector', function($scope, $injector) {
		$scope.myService = 's1';
		$scope.increment = function(serviceName) {
			var service = $injector.get($scope.myService);
			service.value++;
		};

		$scope.value = function() {
			var service = $injector.get($scope.myService);
			return service.value;
		};
	}]);
})();
