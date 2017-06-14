'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const ws = require('./rest.js');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

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

// accept the POST, PUT request body as a json object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// webpack developement short loop.
webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/28_websocket/wpk/', webpackDevMiddleware(compiler, {}));

app.use('/app/28_websocket/ws', ws);

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use((req, res, next) => {
	console.log('404: Page not Found', req.url);
	next();
});


// WARNING !!! here we use the http instead of app !!!
http.listen(8000, () => {
	console.log('server started on port 8000');
});
