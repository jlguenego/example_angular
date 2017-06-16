(function() {
	'use strict';

	var total = 20;

	var app = angular.module('mainApp', []);

	app.controller('MainCtrl', ['$scope', function($scope) {
		var particules = [];
		for (var i = 0; i < total; i++) {
			particules.push(new Particule({
				name: 'p' + i,
				masse: 0.5 + (0.05 * i),
				vitesse: 10 + (0.5 * i),
				angle: -5 - (2 * i),
				x: 200 * i,
				y: 100 * i + 2000,
				hue: i * 10
			}));
		}

		var movePromise = function() {

			return new Promise(function(fulfill, reject) {
				$scope.$apply();
				particules[0].move(fulfill);
				for (var i = 1; i < total; i++) {
					particules[i].move();
				}
			});
		};

		var sequence = Promise.resolve();

		for (var n = 0; n < 600; n++) {
			sequence = sequence.then(function() {
				return movePromise();
			});
		}

		sequence.then(function() {
			console.log('End');
		});
	}]);
})();
