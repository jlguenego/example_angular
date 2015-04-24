module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jscs: {
			files: ['Gruntfile.js', 'app/**/*.js'],
			options: {
				config: true,
				requireCurlyBraces: ['if']
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'app/**/*.js'],
			options: {
				jshintrc: true
			}
		}
	});

	//	// Load the plugin that provides the 'uglify' task.
	//	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['jscs', 'jshint']);

};
