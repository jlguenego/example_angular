module.exports = function(config) {
	config.set({

		basePath: '../../',

		files: [
		'bower_components/jquery/jquery.js',
		'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'24_karma2/app/*.js',
		'24_karma2/test/unit/**/*.js',
		{ pattern: '24_karma2/test/mock/**/*.json', watched: true, served: true, included: false }
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
