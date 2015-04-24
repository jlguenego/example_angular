(function() {
	'use strict';

	var http = require('http');
	var finalhandler = require('finalhandler');
	var serveStatic = require('serve-static');
	var serveIndex = require('serve-index');
	var path = require('path');

	var rootDir = path.normalize(__dirname);

	var serve = serveStatic(rootDir, {
		index: ['index.html', 'index.htm']
	});



	// Serve directory indexes for public/ftp folder (with icons)
	var index = serveIndex(rootDir, {
		icons: true
	});

	// Create server
	var server = http.createServer(function(req, res) {
		var done = finalhandler(req, res);

		setTimeout(function() {
			serve(req, res, function onNext(err) {
				if (err) {
					return done(err);
				}
				index(req, res, done);
			});
		}, 2000);
	});

	// Listen
	server.listen(8000);

	console.log('Server started on port 8000');
})();
