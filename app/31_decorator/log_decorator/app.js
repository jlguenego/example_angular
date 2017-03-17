(function() {
	'use strict';

	var app = angular.module('mainApp', []);

	app.config(['$provide', function($provide) {

		$provide.decorator('$log', ['$delegate', function($delegate) {
			// Save the original $log.debug()
			// var debugFn = $delegate.debug;

			$delegate.debug = console.log.bind(
				window.console,
				'%cDecorated Debug: %c ouah le css... ;) %c %s',
				'color: green',
				'color: yellow; background-color: blue',
				'color: blue');

			return $delegate;
		}]);
	}]);

	app.controller('MainCtrl', ['$scope', '$log', function($scope, $log) {
		$log.debug('Hello I am a log.');
		console.log(arguments);
		var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
		console.log(fruits.slice());
		console.log(Array.isArray(arguments));
		try {
			arguments.slice();
		} catch (e) {
			console.log(e.message);
		}

		// Demo of the purpose of the apply function

		function sum() {
			var args = Array.prototype.slice.call(arguments);
			var result = 0;
			for (var i = 0; i < args.length; i++) {
				result += args[i];
			}
			return result;
		}

		$log.debug(sum(1, 2, 4));
		var array = [1, 10];

		$log.debug(sum.apply(null, array));

	}]);
})();
