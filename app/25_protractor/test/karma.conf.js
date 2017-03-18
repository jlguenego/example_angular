module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '../../../',

		files: [
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'app/25_protractor/app/*.js',
		'app/25_protractor/test/unit/**/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		plugins: [
		'karma-chrome-launcher',
		'karma-firefox-launcher',
		'karma-jasmine'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};
