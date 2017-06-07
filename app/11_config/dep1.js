(function() {
	'use strict';

	var app = angular.module('dep1', []);
	app.config(function() {
		console.log('configuration of dep1.');
	});

	app.run(function() {
		console.log('run of dep1.');
	});
})();
