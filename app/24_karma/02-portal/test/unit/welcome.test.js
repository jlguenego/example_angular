'use strict';

describe('welcome', function() {
	beforeEach(module('welcome'));

	describe('welcome.MainCtrl', function() {
		var $scope;
		var $controller;
		var $http;
		var serviceRequestHandler;
		var $location;
		var authentication;

		beforeEach(inject(function($httpBackend, $rootScope,  $injector) {
			$controller = $injector.get('$controller');
			$location = $injector.get('$location');
			authentication = $injector.get('authentication');
			$http = $httpBackend;
			$http = $httpBackend;

			$scope = $rootScope.$new();
			jasmine.getJSONFixtures().fixturesPath = 'base/app/24_karma/02-portal/test/mock';
		}));

		afterEach(function() {});

		it('should print the welcome message', function() {
			authentication.login = 'juan';
			authentication.state = 'logged';
			var ctrl = $controller('welcome.MainCtrl', { $scope: $scope });

			expect(ctrl.message).toEqual('Welcome juan!');
		});

		it('should redirect to authentication', function() {
			authentication.state = 'not logged';
			$controller('welcome.MainCtrl', { $scope: $scope });

			expect($location.url()).toEqual('/login');
		});

		it('should show the service list', function() {
			authentication.login = 'juan';
			authentication.state = 'logged';

			serviceRequestHandler = $http.when('GET', 'data/juan.json');
			serviceRequestHandler.respond(getJSONFixture('juan.json'));

			$http.expectGET('data/juan.json');
			var ctrl = $controller('welcome.MainCtrl', { $scope: $scope });
			$http.flush();
			expect(ctrl.user.services).toEqual([
				'mail',
				'cloud',
				'ftp',
				'ssh'
			]);
		});
	});
});
