(function() {
	'use strict';

	var express = require('express');
	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);

	var root = __dirname + '/../..';
	var port = 8000;

	var serveIndex = require('serve-index');

	app.use(express.static(root + '/'));
	app.use('/', serveIndex(root + '/'));

	io.on('connection', function(socket) {
		console.log('User connected');
		socket.emit('chat_message', '[Server] Welcome');
		socket.broadcast.emit('chat_message', '[Server] New user connected!');

		socket.on('chat_message', function(data) {
			console.log('Message:', data);
			io.emit('chat_message', data);
		});

		socket.on('disconnect', function() {
			console.log('User disconnected');
			socket.broadcast.emit('chat_message', '[Server] User disconnection');
		});
	});

	http.listen(port, function() {
		console.log('Listening websocket on port ' + port);
	});
})();
