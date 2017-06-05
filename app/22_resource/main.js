import 'angular';
import 'angular-resource';

const app = angular.module('myApp', ['ngResource']);

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
	}

	query() {
		this.ticketResource.query().$promise.then((tickets) => {
			this.tickets = tickets;
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel query en cours...');
	}

	create() {
		this.ticketResource.save(this.newTicket).$promise.then(() => {
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel create en cours...');
	}

	retrieve(id) {
		this.ticketResource.get({
			id
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel retrieve en cours...');
	}

	update(ticket) {
		this.ticketResource.update({
			id: ticket.id,
			name: ticket.newName
			// tslint:disable-next-line:no-shadowed-variable
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel update en cours...');
	}

	delete(ticket) {
		this.ticketResource.delete({
			id: ticket.id
			// tslint:disable-next-line:no-shadowed-variable
		}).$promise.then((ticket) => {
			console.log('ticket', ticket);
			this.ticket = ticket;
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel delete en cours...');
	}

	empty(d) {
		this.ticketResource.delete().$promise.then(() => {
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
		console.log('appel delete all en cours...');
	}

}

app.controller('MyController', MyController);
