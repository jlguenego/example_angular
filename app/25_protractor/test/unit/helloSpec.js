(function() {
	'use strict';

	describe('hello world', function() {

		describe('myController', function() {
			var scope;

			beforeEach(module('myApp'));
			beforeEach(inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				$controller('myController', {$scope: scope});
			}));

			it('should return "Hello World!"', function() {
				expect(scope.message).toEqual('Hello World!');
			});
		});
	});
})();
