(function() {
	'use strict';

	describe('authentication', function() {
		beforeEach(module('authentication'));

		describe('authentication.MainCtrl', function() {
			var $scope;
			var $controller;
			var $http;
			var loginRequestHandler;
			var $rootScope;

			beforeEach(inject(function($injector) {
				$http = $injector.get('$httpBackend');
				loginRequestHandler = $http.when('GET', 'data/login.json');
				loginRequestHandler.respond({
					logins: [
						'juan'
					]
				});

				$rootScope = $injector.get('$rootScope');
				$controller = $injector.get('$controller');
				$scope = $rootScope.$new();
				$controller('authentication.MainCtrl', {$scope: $scope});
			}));

			afterEach(function() {
				$http.verifyNoOutstandingExpectation();
				$http.verifyNoOutstandingRequest();
			});


			it('should authenticate the user', function() {
				$scope.login = 'juan';
				$http.expectGET('data/login.json');
				$scope.authenticate();
				$http.flush();
				expect($rootScope.state).toEqual('logged');
			});

			it('should return "bad login"', function() {
				$scope.login = 'kiki';
				$http.expectGET('data/login.json');
				$scope.authenticate();
				$http.flush();
				expect($rootScope.state).toEqual('not logged');
				expect($rootScope.errorMessage).toEqual('bad login/password');
			});

			it('should return "technical error" when 404', function() {
				$scope.login = 'kiki';
				loginRequestHandler.respond(404, '');
				$http.expectGET('data/login.json');
				$scope.authenticate();
				$http.flush();
				expect($rootScope.state).toEqual('not logged');
				expect($rootScope.errorMessage).toEqual('technical error');
			});

			it('should return "technical error" when json is not good', function() {
				$scope.login = 'kiki';
				loginRequestHandler.respond({
					logins: true
				});
				$http.expectGET('data/login.json');
				$scope.authenticate();
				$http.flush();
				expect($rootScope.state).toEqual('not logged');
				expect($rootScope.errorMessage).toEqual('technical error');
			});
		});
	});
})();

