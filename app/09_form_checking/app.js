(function() {
	'use strict';

	var app = angular.module('mainApp', []);

	app.controller('MainCtrl', function() {
			this.object = {};
			this.list = [];

			this.add = function() {
				this.list.push(this.object);
				this.object = {};
			};
		});
})();
