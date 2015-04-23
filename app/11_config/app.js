(function() {
	var app = angular.module('myApp', []);
	app.config(function() {
		console.log('configuration of my app.');
	});
	app.controller('MyController', ['$window', function($window) {
		this.sayHello = function(name) {
			$window.alert('Hello ' + name);
		}
	}]);
})();
