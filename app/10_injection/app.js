(function() {
	'use strict';

	var myModule = angular.module('myModule', []);

	myModule.service('hello', ['$window', function($window) {
		return {
			welcome: function(name) {
				$window.alert('Hello ' + name + '!');
			}
		};
	}]);

	var app = angular.module('myApp', ['myModule']);
	app.controller('MyController', ['$scope', 'hello', function($scope, hello) {
		$scope.sayHello = function(name) {
			hello.welcome(name);
			console.log(name);
		};
	}]);
})();
