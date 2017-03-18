(function() {
	'use strict';
	var app = angular.module('myApp', []);
	app.constant('salt', 'sel de Guerande');
	app.value('hash', {
		name: 'md5',
		hash: function(n) {
			return new Hashes.MD5().hex(n);
		}
	});
	app.provider('passwordService', ['salt', function(salt) {
		var mySalt = salt;
		this.salt = function(s) {
			if (s) {
				mySalt = s;
			}
			return mySalt;
		};
		this.$get = ['hash', '$log', function(hash, $log) {
			return {
				hash: function(login, password) {
					var r = hash.hash(login + password + mySalt);
					$log.debug('hash = ', r);
					return r;
				}
			};
		}];
	}]);
	app.config(['passwordServiceProvider', function(passwordServiceProvider) {
		console.log('salt ', passwordServiceProvider.salt());
	}]);
	app.controller('MyController', ['passwordService', 'hash', '$scope', 'salt',
		function(passwordService, hash, $scope, salt) {
			$scope.hash = hash;
			$scope.$watch('password + login', function() {
				$scope.passwordHash = passwordService.hash($scope.login, $scope.password);
			});
			$scope.salt = salt;

		}
	]);
})();
