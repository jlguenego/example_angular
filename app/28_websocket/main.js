import './style.scss';

import 'angular';
import 'angular-resource';

const io = require('socket.io-client/dist/socket.io.js');

var socket = io();
console.log('socket', socket);




const app = angular.module('myApp', ['ngResource']);

class DialogBox {
	constructor(selector) {
		this.elt = angular.element(document.querySelector(selector));
	}

	open() {
		this.elt.css('display', 'block');
	}

	close() {
		this.elt.css('display', 'none');
	}
}

class MyController {
	/* @ngInject */

	constructor($resource) {
		this.ticketResource = $resource('ws/tickets/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		this.query();

		socket.on('ticketChannel', (data) => {
			console.log('Message received:', data);
			this.query();
		});

		this.createDialogBox = new DialogBox('#createDialogBox');
	}

	query() {
		console.log('appel query en cours...');
		return this.ticketResource.query().$promise.then((tickets) => {
			this.tickets = tickets;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	create() {
		console.log('appel create en cours...');
		return this.ticketResource.save(this.newTicket).$promise.catch((error) => {
			console.error('error', error);
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
