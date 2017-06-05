'use strict';

const express = require('express');
const router = express.Router();
module.exports = router;

// all webservices are slow to show when they are called and the async aspect.
router.use((req, res, next) => {
	console.log('req.url', req.url);
	setTimeout(() => {
		next();
	}, 1000);
});

let tickets = [
	{ name: 'coucou', id: 1 },
	{ name: 'hello', id: 2 }
];
let id = tickets.length + 1;

function list() {
	return tickets;
}

router.get('/tickets', (req, res, next) => {
	res.json(tickets);
});

router.delete('/tickets', (req, res, next) => {
	tickets = [];
	id = 1;
	res.json({});
});

// Creation
router.post('/tickets', (req, res, next) => {
	const ticket = req.body;
	ticket.id = id;
	id++;
	tickets.push(ticket);
	res.status(201);
	res.json(ticket);
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
});
