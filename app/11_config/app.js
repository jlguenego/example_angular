(function() {
	'use strict';

	var app = angular.module('myApp', ['dep1', 'dep2']);
	app.config(function() {
		console.log('configuration of myApp part 1.');
	});

	app.config(function() {
		console.log('configuration of myApp part 2.');
	});

	app.run(function() {
		console.log('run of myApp part 1.');
	});

	app.run(function() {
		console.log('run of myApp part 2.');
	});

	app.controller('MyController', function MyController() {
		this.welcomeMsg = 'Hello Maïté!';
	});
})();
