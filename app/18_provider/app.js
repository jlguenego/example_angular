(function() {
	'use strict';
	var app = angular.module('myApp', []);
	app.value('hash', {name: 'md5', compute: function(n) {
 return new Hashes.MD5().hex(n);
}
	});
	app.provider('passwordService', function() {
		var salt = 'default';
		this.salt = function(s) {
			salt = s;
		};
		this.$get = ['hash', '$log', function(hash, $log) {
			return {
				hash: function(login, password) {
					var r = hash.compute(login + password + salt);
					$log.debug('hash = ', r);
					return r;
				}
			};
		}];
	});
	app.config(['passwordServiceProvider', function(passwordServiceProvider) {
		passwordServiceProvider.salt('hmmm..., it is salted...');
	}]);
	app.controller('MyController', ['passwordService', 'hash', '$scope', function(passwordService, hash, $scope) {
		$scope.hash = hash;
		$scope.$watch('password + login', function() {
			$scope.passwordHash = passwordService.hash($scope.login, $scope.password);
		});

	}]);
})();
