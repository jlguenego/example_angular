module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '../../../',

		files: [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'app/24_karma2/app/*.js',
		'app/24_karma2/test/unit/**/*.js',
		{pattern: 'app/24_karma2/test/mock/**/*.json', watched: true, served: true, included: false}
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

	});
};
