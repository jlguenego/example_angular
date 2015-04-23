(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.directive('myStars', function() {
		return {
			restrict: 'E',
			template: function(elem, attr) {
				var html = '';
				var rate = attr.rate || 3;
				var total = attr.total || 5;
				for (var i = 0; i < rate; i++) {
					html += '<img src="yellow_star.png" />';
				}
				for (var i = rate; i < total; i++) {
					html += '<img src="white_star.png" />';
				}
				return html;
			}
		};
	});

	app.controller('StarsController', ['$scope', function($scope) {
		this.getRange = function(n) {
			var result = [];
			for (var i = 1; i <= n; i++) {
				result.push(i);
			}
			return result;
		};

		this.rate = $scope.rate || 3;
		this.total = $scope.total || 5;

	}]);

	app.directive('myOtherStars', function() {
		return {
			restrict: 'E',
			templateUrl: 'template_stars.html',
			scope: {
				rate: '=rate',
				total: '=total'
			},
			controller: 'StarsController',
			controllerAs: 'ctrl',
			transclude: true
		};
	});
})();
