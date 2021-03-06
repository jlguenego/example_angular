import './style.scss';

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
		console.log('appel query en cours...');
		return this.ticketResource.query().$promise.then((tickets) => {
			this.tickets = tickets;
		}).catch((error) => {
			console.error('error', error);
		});
	}

	create() {
		console.log('appel create en cours...');
		return this.ticketResource.save(this.newTicket).$promise.then(() => {
			this.query();
		}).catch((error) => {
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
			this.query();
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
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
	}

	empty(d) {
		console.log('appel delete all en cours...');
		return this.ticketResource.delete().$promise.then(() => {
			this.query();
		}).catch((error) => {
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
