module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '../../../',

		files: [
		'node_modules/jquery/dist/jquery.js',
		'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-resource/angular-resource.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'app/24_karma2/app/*.js',
		'app/24_karma2/test/unit/**/*.js',
		{pattern: 'app/24_karma2/test/mock/**/*.json', watched: true, served: true, included: false}
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

	});
};
