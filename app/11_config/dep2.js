(function() {
	'use strict';

	var app = angular.module('dep2', []);
	app.config(function() {
		console.log('configuration of dep2.');
	});

	app.run(function() {
		console.log('run of dep2.');
	});
})();
