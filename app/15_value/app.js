(function() {
	'use strict';
	var app = angular.module('myApp', []);
	app.value('hash', {
		name: 'MD5',
		compute: function(n) {
			return new Hashes[this.name]().hex(n);
		},
		algos: [{
			name: 'MD5',
			value: 'MD5'
		},
		{
			name: 'SHA1',
			value: 'SHA1'
		},
		{
			name: 'SHA256',
			value: 'SHA256'
		},
		{
			name: 'SHA512',
			value: 'SHA512'
		},
		{
			name: 'RIPEMD-160',
			value: 'RMD160'
		}]
	});

	app.controller('MyController', ['hash', '$scope', function(hash, $scope) {
		$scope.hash = hash;
	}]);
})();
