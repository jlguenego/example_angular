(function() {
	'use strict';
	var app = angular.module('myApp', []);

	app.value('hash', {
		name: 'MD5',
		compute: function(n) {
			return new Hashes[this.name]().hex(n);
		},
		algos: [{ name: 'MD5', value: 'MD5' },
			{ name: 'SHA1', value: 'SHA1' },
			{ name: 'SHA256', value: 'SHA256' },
			{ name: 'SHA512', value: 'SHA512' },
			{ name: 'RIPEMD-160', value: 'RMD160' }
		]
	});

	app.provider('passwordHash', function PasswordHashProvider() {
		var salt = 'default';
		this.salt = function(s) {
			salt = s;
		};
		this.$get = ['hash', '$log', function(hash, $log) {
			var PasswordHash = function() {
				this.hash = function(login, password) {
					var r = hash.compute(salt + login + salt + password + salt);
					$log.debug('hash = ', r);
					return r;
				};
			};

			return new PasswordHash();
		}];
	});

	app.config(['passwordHashProvider', function(passwordHashProvider) {
		passwordHashProvider.salt('hmmm..., it is salted...');
	}]);

	app.controller('MyController', ['passwordHash', 'hash', '$scope', function(passwordHash, hash, $scope) {
		console.log('passwordHash', passwordHash);
		var ctrl = this;
		ctrl.hash = hash;

		$scope.$watch('$ctrl', function() {
			ctrl.passwordHash = passwordHash.hash(ctrl.login, ctrl.password);
		}, true);

	}]);
})();
