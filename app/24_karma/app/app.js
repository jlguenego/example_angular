(function() {
	var app = angular.module('myApp', []);

	app.controller('myController', [function() {
		this.message = "Hello World!";
	}]);
})();
