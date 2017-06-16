(function() {
	'use strict';

	var Fx = 0;
	var Fy = -9.81;
	var dt = 10;
	var k = 0.005;

	var Particule = function(obj) {
		this.masse = obj.masse;
		this.vx = obj.vitesse * Math.cos(obj.angle * 2 * Math.PI / 360);
		this.vy = obj.vitesse * Math.sin(obj.angle * 2 * Math.PI / 360);
		this.x = obj.x;
		this.y = obj.y;
		$('#particules').append('<div id="' + obj.name + 'x" class="box"></div>');
		this.element = $('#' + obj.name + 'x');
		this.element.css('background-color', 'hsl(' + obj.hue + ', 50%, 50%)');
	};

	Particule.prototype.move = function(next) {
		var self = this;
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

	window.Particule = Particule;

})();
