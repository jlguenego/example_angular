(function() {
	'use strict';

	describe('welcome', function() {
		beforeEach(module('welcome'));

		describe('welcome.MainCtrl', function() {
			var $scope = undefined;
			var $controller = undefined;
			var $http = undefined;
			var loginRequestHandler = undefined;
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
			}));

			afterEach(function() {
				$http.verifyNoOutstandingExpectation();
				$http.verifyNoOutstandingRequest();
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


		});
	});
})();

