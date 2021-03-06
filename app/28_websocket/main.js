import 'font-awesome/css/font-awesome.css';
import './style.scss';

import 'angular';
import 'angular-resource';
import 'angular-animate';

const io = require('socket.io-client/dist/socket.io.js');

var socket = io();
console.log('socket', socket);

function arraySync(dstArray, srcArray) {
	for (const ticket of srcArray) {
		const id = ticket.id;
		const myTicket = dstArray.find(t => t.id === id);
		if (myTicket) {
			myTicket.name = ticket.name;
		} else {
			dstArray.push(ticket);
		}
	}
	for (let i = dstArray.length - 1; i >= 0; i--) {
		console.log('i', i);
		if (!srcArray.find((ticket) => {
				return ticket.id === dstArray[i].id &&
					ticket.name === dstArray[i].name;
			})) {
			dstArray.splice(i, 1);
		}
	}
	dstArray.sort((a, b) => {
		if (a.id === b.id) {
			return 0;
		}
		if (a.id > b.id) {
			return 1;
		}
		return -1;
	});
}

const app = angular.module('myApp', ['ngResource', 'ngAnimate']);

class DialogBox {
	constructor(selector) {
		this.elt = document.querySelector(selector);
		// this.elt = angular.element(document.querySelector(selector));

		this.setupCancel();
	}

	open() {
		this.elt.style.display = 'block';
		// this.elt.css('display', 'block');
		console.log('focus');
		this.elt.querySelector('input').focus();
	}

	close() {
		this.elt.style.display = 'none';
		// this.elt.css('display', 'none');
	}

	setupCancel() {
		const self = this;
		this.elt.addEventListener('click', function(e) {
			const width = self.elt.offsetWidth - 16000;
			const height = self.elt.offsetHeight - 16000;
			if (e.offsetX < 0 || e.offsetX > width || e.offsetY < 0 || e.offsetY > height) {
				self.close();
			}
		});
	}
}

class MyController {
	/* @ngInject */

	constructor($resource, $q) {
		this.$q = $q;
		this.ticketResource = $resource('ws/tickets/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		this.tickets = [];
		this.query();

		socket.on('ticketChannel', (data) => {
			console.log('Message received:', data);
			this.query();
		});

		this.createDialogBox = new DialogBox('#createDialogBox');
	}

	doClick(selector) {
		const elt = angular.element(document.querySelector(selector));
		elt.triggerHandler('click');
	}

	query() {
		console.log('appel query en cours...');
		return this.ticketResource.query().$promise.then((tickets) => {
			arraySync(this.tickets, tickets);
			// this.tickets = tickets;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	create() {
		console.log('appel create en cours...');
		return this.ticketResource.save(this.newTicket).$promise.then((response) => {
			this.newTicket = {};
		}).catch((error) => {
			console.error('error', error);
		});
	}

	createAndClose() {
		return this.create().then(() => {
			this.createDialogBox.close();
		});
	}

	retrieve(id) {
		console.log('appel retrieve en cours...');
		return this.ticketResource.get({
			id
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	update(ticket) {
		console.log('appel update en cours...');
		return this.ticketResource.update({
			id: ticket.id,
			name: ticket.newName
			// tslint:disable-next-line:no-shadowed-variable
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	delete(ticket) {
		console.log('appel delete en cours...');
		return this.ticketResource.delete({
			id: ticket.id
			// tslint:disable-next-line:no-shadowed-variable
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	empty(d) {
		const answer = window.confirm('Are you sure?');
		if (!answer) {
			return this.$q.resolve();
		}
		console.log('appel delete all en cours...');
		return this.ticketResource.delete().$promise.catch((error) => {
			console.error('error', error);
		});
	}



}

app.controller('MyController', MyController);

app.directive('jlgClickAndDisable', function() {
	return {
		scope: {
			jlgClickAndDisable: '&'
		},
		controller: function($scope, $element) {
			$element.bind('click', function() {
				console.log('disable the button');
				$element.prop('disabled', true);
				$scope.jlgClickAndDisable().finally(function() {
					$element.prop('disabled', false);
				})
			});
		}
	};
});
