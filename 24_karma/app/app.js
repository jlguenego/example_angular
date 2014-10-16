(function() {
	var app = angular.module('myApp', []);

	app.factory('helloService', function() {
		var result = {};
		result.sayHello = function() { return "Hello World!" };
		return result;
	});

	app.controller('myController', [ 'helloService', function(helloService) {
		this.message = helloService.sayHello();
	}]);
})();
