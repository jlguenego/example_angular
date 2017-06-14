'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const ws = require('./rest.js');

const app = express();

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

app.listen(8000, () => {
	console.log('server started on port 8000');
});

