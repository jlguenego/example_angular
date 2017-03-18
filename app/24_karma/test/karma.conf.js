module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '../../../',

		files: [
		'node_modules/angular/angular.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'app/24_karma/app/*.js',
		'app/24_karma/test/unit/**/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

	});
};
