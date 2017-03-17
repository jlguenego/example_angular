(function() {
	'use strict';

	var app = angular.module('mainApp', ['ui.validate', 'jlg-daterangepicker']);

	app.controller('MainCtrl', ['$scope', function($scope) {
		$scope.obj = {};
		$scope.doSomething = function() {
			alert('Wonderful!');
			console.log('something');
		};

		$scope.sum = function(c, a, b) {
			console.log('a = ', a);
			console.log('b = ', b);
			console.log('c = ', c);
			var result = Number(c) == Number(a) + Number(b);
			console.log('result = ', result);
			return result;
		};

		$scope.isError = function(field) {
			return field.$invalid && field.$touched && field.$dirty;
		};

		$scope.options = {updateOn: 'default blur', debounce: {default: 500, blur: 0}};

		$scope.bootstrap = function(field) {
			return {
				'has-error': $scope.isError(field),
				'has-success': !$scope.isError(field)
			};
		};
		$scope.bootstrapGlyphicon = function(field) {
			return {
				'glyphicon-remove': $scope.isError(field),
				'glyphicon-ok': field.$valid
			};
		};

		window.x = $scope;
	}]);

	var INTEGER_REGEXP = /^\-?\d+$/;
	app.directive('integer', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				console.log('ctrl = ', ctrl);
				ctrl.$validators.integer = function(modelValue, viewValue) {
					console.log('validating integer');
					if (ctrl.$isEmpty(modelValue)) {
						// consider empty models to be valid
						return true;
					}

					if (INTEGER_REGEXP.test(viewValue)) {
						// it is valid
						console.log('integer valid ', viewValue);
						return true;
					}

					// it is invalid
					console.log('integer invalid ', viewValue);
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

					if (firstnames.map(function(n) {
 return n.toLowerCase();
}).indexOf(viewValue.toLowerCase()) > -1) {
						// it is valid
						return true;
					}

					// it is invalid
					return false;
				};
			}
		};
	});

	app.directive('integerInputOnly', function() {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function(scope, element, attrs, ctrl) {
				var previousValue = '';
				ctrl.$parsers.push(function(value) {
					if ((value === '') || (value === '-') || INTEGER_REGEXP.test(value)) {
						previousValue = value;
						return value;
					}
					ctrl.$setViewValue(previousValue, 'integerInputOnly');
					ctrl.$render();
					return previousValue;
				});
			}
		};
	});
})();
