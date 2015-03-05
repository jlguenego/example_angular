(function() {
	'use strict';

	describe('welcome', function() {
		beforeEach(module('welcome'));

		describe('welcome.MainCtrl', function() {
			var $scope = undefined;
			var $controller = undefined;
			var $http = undefined;
			var serviceRequestHandler = undefined;
			var $controller = undefined;
			var $rootScope = undefined;
			var $location = undefined;
			var ctrl = undefined;



			beforeEach(inject(function($injector) {
				$http = $injector.get('$httpBackend');

    			$rootScope = $injector.get('$rootScope');
 				$controller = $injector.get('$controller');
 				$location = $injector.get('$location');
 				$scope = $rootScope.$new();
 				jasmine.getJSONFixtures().fixturesPath = 'base/24_karma2/test/mock';

			}));

			afterEach(function() {

			});



			it('should print the welcome message', function() {
				$rootScope.login = "juan";
				$rootScope.state = "logged";
				ctrl = $controller('welcome.MainCtrl', {'$scope' : $scope });

				expect($rootScope.message).toEqual("Welcome juan!");
			});

			it('should redirect to authentication', function() {
				$rootScope.state = "not logged";
				ctrl = $controller('welcome.MainCtrl', {'$scope' : $scope });

				expect($location.url()).toEqual("/login");
			});

			it('should show the service list', function() {
				$rootScope.login = "juan";
				$rootScope.state = "logged";

				serviceRequestHandler = $http.when('GET', 'data/juan.json');
				serviceRequestHandler.respond(getJSONFixture('juan.json'));

				$http.expectGET('data/juan.json');
				ctrl = $controller('welcome.MainCtrl', {'$scope' : $scope });
				$http.flush();
				expect($rootScope.serviceJson.services).toEqual([
					"mail",
					"cloud",
					"ftp",
					"ssh"
				]);
				$http.verifyNoOutstandingExpectation();
				$http.verifyNoOutstandingRequest();
			});


		});
	});
})();

