
'use strict';

const express = require('express');
const serveIndex = require('serve-index');

var app = express();

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use('/app/14_html5/', function (req, res, next) {
	res.sendFile('./index.html', {root: __dirname});
});

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(8000, function () {
	console.log('server started on port 8000');
});
