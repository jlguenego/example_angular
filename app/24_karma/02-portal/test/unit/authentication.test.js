'use strict';

describe('authentication', function() {
	beforeEach(module('authentication'));

	describe('AuthenticationCtrl', function() {
		var $http;
		var request;
		var ctrl;
		var $location;
		var $httpBackend;
		var logout;

		beforeEach(inject(function($rootScope, $controller, $injector) {
			$httpBackend = $injector.get('$httpBackend');
			$http = $injector.get('$http');
			$location = $injector.get('$location');
			logout = $injector.get('logout');

			request = $httpBackend.when('GET', 'data/login.json');
			request.respond({
				logins: [
					'juan'
				]
			});

			ctrl = $controller('AuthenticationCtrl', { $scope: $rootScope.$new() });
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});


		it('should authenticate the user', function() {
			ctrl.login = 'juan';
			// $http.expectGET('data/login.json');
			ctrl.authenticate();
			$httpBackend.flush();
			expect(ctrl.authentication.state).toEqual('logged');
		});

		it('should return "bad login"', function() {
			ctrl.login = 'kiki';
			// $http.expectGET('data/login.json');
			ctrl.authenticate();
			$httpBackend.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('bad login/password');
		});

		it('should return "technical error" when 404', function() {
			ctrl.login = 'juan';
			request.respond(404, '');
			// $http.expectGET('data/login.json');
			ctrl.authenticate();
			$httpBackend.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('technical error');
		});

		it('should return "technical error" when json is not good', function() {
			ctrl.login = 'juan';
			request.respond({
				logins: true
			});
			// $http.expectGET('data/login.json');
			ctrl.authenticate();
			$httpBackend.flush();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual('technical error');
		});

		it('should logout', function() {
			logout.run();
			expect(ctrl.authentication.state).toEqual('not logged');
			expect(ctrl.authentication.reason).toEqual(undefined);
			expect($location.url()).toEqual('/logout');

		});

		// it('should logout when authenticated is false', function() {
		// 	request = $httpBackend.when('GET', 'data/jlg.json');
		// 	request.respond({
		// 		authenticated: "false",
		// 	});
		// 	$http.get('data/jlg.json').then(function() {}).catch(function() {});
		// 	$httpBackend.flush();
		// 	expect(ctrl.authentication.state).toEqual('not logged');
		// });
	});
});
