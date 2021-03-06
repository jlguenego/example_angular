'use strict';

const express = require('express');
const router = express.Router();

let io;

let tickets = [
	{ name: 'coucou', id: 1 },
	{ name: 'hello', id: 2 }
];

let id = tickets.length + 1;

module.exports = function(myIo) {
	io = myIo;
	return router;
};



// all webservices are slow to show when they are called and the async aspect.
router.use((req, res, next) => {
	console.log('req.url', req.url);
	next();
});



router.get('/tickets', (req, res, next) => {
	res.json(tickets);
});

router.delete('/tickets', (req, res, next) => {
	tickets = [];
	id = 1;
	res.json({});
	io.emit('ticketChannel', 'refresh');
});

// Creation
router.post('/tickets', (req, res, next) => {
	const ticket = req.body;
	ticket.id = id;
	id++;
	tickets.push(ticket);
	res.status(201);
	res.json(ticket);
	io.emit('ticketChannel', 'refresh');
});

router.get('/tickets/:id', (req, res, next) => {
	const ticket = tickets.find((n) => {
		return n.id === Number(req.params.id);
	});
	if (ticket === undefined) {
		res.sendStatus(404);
	}
	console.log('ticket', ticket);
	res.json(ticket);
});

router.put('/tickets/:id', (req, res, next) => {
	console.log('update req.body', req.body);
	const ticket = tickets.find((n) => {
		return n.id === Number(req.params.id);
	});
	if (!ticket) {
		res.sendStatus(404);
		return;
	}
	ticket.name = req.body.name;
	console.log('ticket', ticket);
	res.json(ticket);
	io.emit('ticketChannel', 'refresh');
});

router.delete('/tickets/:id', (req, res, next) => {
	const ticket = tickets.find((n) => {
		return n.id === Number(req.params.id);
	});
	if (!ticket) {
		res.sendStatus(404);
		return;
	}
	const index = tickets.findIndex((n) => {
		return n.id === Number(req.params.id);
	});
	tickets.splice(index, 1);
	res.json(ticket);
	io.emit('ticketChannel', 'refresh');
});
