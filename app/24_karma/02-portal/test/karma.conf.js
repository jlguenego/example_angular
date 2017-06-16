module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '../../../../',

		files: [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'app/24_karma/02-portal/app/**/*.js',
			'app/24_karma/02-portal/test/unit/**/*.js',
			{ pattern: 'app/24_karma/02-portal/test/mock/**/*.json', watched: true, served: true, included: false }
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		// coverage reporter generates the coverage
		reporters: ['progress', 'coverage'],

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'app/24_karma/02-portal/app/authentication.js': ['coverage'],
			'app/24_karma/02-portal/app/welcome.js': ['coverage']
		},

		// optionally, configure the reporter
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}

	});
};
