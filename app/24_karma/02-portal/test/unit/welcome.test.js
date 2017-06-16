'use strict';

describe('welcome', function() {
	beforeEach(module('welcome'));

	describe('welcome.MainCtrl', function() {
		var $scope;
		var $controller;
		var $http;
		var $location;
		var authentication;

		beforeEach(inject(function($httpBackend, $rootScope, $injector) {
			$controller = $injector.get('$controller');
			$location = $injector.get('$location');
			authentication = $injector.get('authentication');
			$http = $httpBackend;

			$scope = $rootScope.$new();
			jasmine.getJSONFixtures().fixturesPath = 'base/app/24_karma/02-portal/test/mock';
		}));

		afterEach(function() {
			$http.verifyNoOutstandingExpectation();
			$http.verifyNoOutstandingRequest();
		});

		it('should print the welcome message', function() {
			authentication.login = 'juan';
			authentication.state = 'logged';
			var request = $http.when('GET', 'data/juan.json');
			request.respond(getJSONFixture('juan.json'));
			var ctrl = $controller('WelcomeCtrl', { $scope: $scope });
			$http.flush();
			expect(ctrl.message).toEqual('Welcome juan!');
			expect(ctrl.user.services).toEqual([
				'mail',
				'cloud',
				'ftp',
				'ssh'
			]);
		});

		it('should redirect to authentication', function() {
			authentication.state = 'not logged';
			$controller('WelcomeCtrl', { $scope: $scope });
			expect($location.url()).toEqual('/login');
		});

		it('should print no services', function() {
			authentication.login = 'kiki';
			authentication.state = 'logged';
			var request = $http.when('GET', 'data/kiki.json');
			request.respond(404, '');
			var ctrl = $controller('WelcomeCtrl', { $scope: $scope });
			$http.flush();
			expect(ctrl.message).toEqual('Welcome kiki!');
		});
	});
});
