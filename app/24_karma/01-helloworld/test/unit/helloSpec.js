'use strict';

describe('myApp', function() {
	beforeEach(module('myApp'));

	describe('MyController', function() {
		var scope, ctrl;

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('MyController', { $scope: scope });
		}));

		it('should return "Hello World!"', function() {
			expect(ctrl.message).toEqual('Hello World!');
		});
	});
});
