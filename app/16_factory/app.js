(function() {
	'use strict';
	var app = angular.module('myApp', []);

	app.value('hash', {
		name: 'md5',
		compute: function(n) {
 return new Hashes.MD5().hex(n);
}
	});

	app.factory('passwordService', ['hash', '$log', function(hash, $log) {
		var result = {};
		result.hash = function(login, password) {
			var r = hash.compute(login + password);
			$log.debug('hash = ', r);
			return r;
		};
		return result;
	}]);

	app.controller('MyController', ['passwordService', 'hash', '$scope', function(passwordService, hash, $scope) {
		$scope.hash = hash;
		$scope.$watch('password + login', function() {
			$scope.passwordHash = passwordService.hash($scope.login, $scope.password);
		});

	}]);
})();
