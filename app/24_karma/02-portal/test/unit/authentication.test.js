'use strict';

describe('authentication', function() {
	beforeEach(module('authentication'));

	describe('AuthenticationCtrl', function() {
		var $http;
		var loginRequestHandler;
		var ctrl;

		beforeEach(inject(function($rootScope, $httpBackend, $controller) {
			$http = $httpBackend;
			loginRequestHandler = $http.when('GET', 'data/login.json');
			loginRequestHandler.respond({
				logins: [
					'juan'
				]
			});

			ctrl = $controller('AuthenticationCtrl', { $scope: $rootScope.$new() });
		}));

		afterEach(function() {
			$http.verifyNoOutstandingExpectation();
			$http.verifyNoOutstandingRequest();
		});


		it('should authenticate the user', function() {
			ctrl.login = 'juan';
			$http.expectGET('data/login.json');
			ctrl.authenticate();
			$http.flush();
			expect(ctrl.authentication.state).toEqual('logged');
		});

		it('should return "bad login"', function() {
			ctrl.login = 'kiki';
			$http.expectGET('data/login.json');
			ctrl.authenticate();
			$http.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('bad login/password');
		});

		it('should return "technical error" when 404', function() {
			ctrl.login = 'kiki';
			loginRequestHandler.respond(404, '');
			$http.expectGET('data/login.json');
			ctrl.authenticate();
			$http.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('technical error');
		});

		it('should return "technical error" when json is not good', function() {
			ctrl.login = 'kiki';
			loginRequestHandler.respond({
				logins: true
			});
			$http.expectGET('data/login.json');
			ctrl.authenticate();
			$http.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('technical error');
		});
	});
});
