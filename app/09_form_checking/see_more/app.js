(function() {
	'use strict';

	var app = angular.module('mainApp', ['ui.validate']);

	app.controller('MainCtrl', ['$scope', function($scope) {
		$scope.obj = {};
		$scope.doSomething = function() {
			console.log('something');
		};
		$scope.$watch('myForm', function() {
			console.log($scope.myForm);
		}, true);

		$scope.sum = function(c, a, b) {
			console.log('a = ', a);
			console.log('b = ', b);
			console.log('c = ', c);
			var result = Number(c) == Number(a) + Number(b);
			console.log('result = ', result);
			return result;
		};

	}]);

	var INTEGER_REGEXP = /^\-?\d+$/;
	app.directive('integer', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				console.log('ctrl = ', ctrl);
				ctrl.$validators.integer = function(modelValue, viewValue) {
					if (ctrl.$isEmpty(modelValue)) {
						// consider empty models to be valid
						return true;
					}

					if (INTEGER_REGEXP.test(viewValue)) {
						// it is valid
						return true;
					}

					// it is invalid
					return false;
				};
			}
		};
	});

	app.directive('firstname', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				var firstnames = ['Juan', 'Yannis', 'Jean-Louis'];

				ctrl.$validators.firstname = function(modelValue, viewValue) {

					if (ctrl.$isEmpty(modelValue)) {
						return true;
					}

					if (firstnames.map(function(n) { return n.toLowerCase(); }).indexOf(viewValue.toLowerCase()) > -1) {
						// it is valid
						return true;
					}

					// it is invalid
					return false;
				};
			}
		};
	});

})();
