module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
//		uglify: {
//			options: {
//				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//			},
//			build: {
//				src: 'src/<%= pkg.name %>.js',
//				dest: 'build/<%= pkg.name %>.min.js'
//			}
//		}

		jscs: {
			src: "app/**/*.js",
			options: {
				config: true,
				requireCurlyBraces: [ "if" ]
			}
		}
	});

//	// Load the plugin that provides the "uglify" task.
//	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks("grunt-jscs");

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};
