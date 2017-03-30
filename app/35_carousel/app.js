(function() {
	'use strict';

	var app = angular.module('main', ['my-carousel']);

	app.controller('BodyCtrl', function BodyCtrl() {
		var ctrl = this;
		ctrl.click = function() {
			window.alert('Bravo pour le click !');
		};
	});

})();
