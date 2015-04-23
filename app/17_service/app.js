(function() {
	'use strict';
	var app = angular.module('myApp', []);
	app.value('hash', { name: 'md5', hash: function(n) { return new Hashes.MD5().hex(n); }
	});
	app.service('passwordService', ['hash', '$log', function PasswordService(hash, $log) {
		var self = this;
		this.hash = function(login, password) {
			var r = hash.hash(login + password);
			$log.debug('hash = ', r, self);
			return r;
		}
	}]);
	app.controller('MyController', ['passwordService', 'hash', '$scope', function(passwordService, hash, $scope) {
		$scope.hash = hash;
		$scope.$watch('password + login', function() {
			$scope.passwordHash = passwordService.hash($scope.login, $scope.password);
		});

	}]);
})();
