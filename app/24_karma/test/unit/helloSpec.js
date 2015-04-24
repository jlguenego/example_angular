(function() {
	'use strict';

	describe('hello world', function() {

		describe('myController', function() {
			var scope, ctrl;

			beforeEach(module('myApp'));
			beforeEach(inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				ctrl = $controller('myController', {$scope: scope});
			}));


			it('should return "Hello World!"', function() {
				expect(ctrl.message).toEqual('Hello World!');
			});
		});
	});
})();
