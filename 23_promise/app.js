(function() {
	"use strict";


	var Fx = 0;
	var Fy = -9.81;
	var dt = 10;
	var k = 0.005;

	var Particule = function(element, masse, vitesse, angle, x, y) {
		var self = this;
		this.masse = masse;
		this.vx = vitesse * Math.cos(angle * 2 * Math.PI / 360);
		this.vy = vitesse * Math.sin(angle * 2 * Math.PI / 360);
		this.x = x;
		this.y = y;
		this.element = element;
		this.move = function(next) {
			this.vx += (Fx / this.masse) * (dt / 1000) - (this.vx * k);
			this.vy += (Fy / this.masse) * (dt / 1000) - (this.vy * k);
			this.x += this.vx * (dt);
			this.y += this.vy * (dt);
			if (this.y <= 0) {
				this.vy = Math.abs(this.vy);
				this.y = 0;
			}
			var x =  this.x / 20;
			var y =  -(this.y / 20) + 200;
			this.element.animate({
				left: x,
				top: y
			}, dt, function() {
				self.element.removeClass("hidden");
				if (next) {
					next();
				}
			});
		}
	};

	var app = angular.module('mainApp', []);


	app.controller('MainCtrl', [ '$scope', function($scope) {
		var p1 = new Particule($('#p1'), 0.05, 10, -20, 0, 4000);
		var p2 = new Particule($('#p2'), 0.1, 10, 10, 4000, 3000);

		var move = function() {

			return new Promise(function(fulfill, reject) {
				$scope.$apply();
				p1.move(fulfill);
				p2.move();
			});
		};

		var end = function() {
			console.log('End');
		};

		var sequence = Promise.resolve();

		for (var n = 0; n < 600; n++) {
			sequence = sequence.then(function() {
				return move();
			});
		}

		sequence.then(end);

		$scope.particule = p1;
	}]);
})();
