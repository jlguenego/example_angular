var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

var root = __dirname, port = 9000;

app.get('*.*', function(req, res) {
	var file = path.normalize(root + '/' + req.url)
	res.sendFile(file);
});

app.get('/', function(req, res) {
	var indexFile = path.normalize(root + '/index.html')
	res.sendFile(indexFile);
});

io.on('connection', function(socket){
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