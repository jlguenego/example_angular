(function() {
	'use strict';


	var Fx = 0;
	var Fy = -9.81;
	var dt = 10;
	var k = 0.005;
	var total = 20;

	var Particule = function(obj) {
		var self = this;
		this.masse = obj.masse;
		this.vx = obj.vitesse * Math.cos(obj.angle * 2 * Math.PI / 360);
		this.vy = obj.vitesse * Math.sin(obj.angle * 2 * Math.PI / 360);
		this.x = obj.x;
		this.y = obj.y;
		$('#particules').append('<div id="' + obj.name + 'x" class="box"></div>');
		this.element = $('#' + obj.name + 'x');
		this.element.css('background-color', 'hsl(' + obj.hue + ', 50%, 50%)');
		this.move = function(next) {
			this.vx += (Fx / this.masse) * (dt / 1000) - (this.vx * k);
			this.vy += (Fy / this.masse) * (dt / 1000) - (this.vy * k);
			this.x += this.vx * (dt);
			this.y += this.vy * (dt);
			if (this.y <= 0) {
				this.vy = Math.abs(this.vy);
				this.y = 0;
			}
			var x = this.x / 20;
			var y = -(this.y / 20) + 400;
			this.element.animate({
				left: x,
				top: y
			}, dt, function() {
				self.element.removeClass('hidden');
				if (next) {
					next();
				}
			});
		};
	};

	var app = angular.module('mainApp', []);


	app.controller('MainCtrl', ['$scope', function($scope) {
		var particules = [];
		for (var i = 0; i < total; i++) {
			particules.push(new Particule({
				name: 'p' + i,
				masse: 0.05 + (0.05 * i),
				vitesse: 10 + (0.5 * i),
				angle: -5 - (2 * i),
				x: 200 * i,
				y: 200 * i,
				hue: i * 10
			}));
		}

		var move = function() {

			return new Promise(function(fulfill, reject) {
				$scope.$apply();
				particules[0].move(fulfill);
				for (var i = 1; i < total; i++) {
					particules[i].move();
				}
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

		$scope.particule = particules[0];
	}]);
})();
