(function() {
	'use strict';
	var app = angular.module('myApp', []);
	app.value('hash', {
		name: 'md5',
		compute: function(n) {
			return new Hashes.MD5().hex(n);
		}
	});

	app.controller('MyController', ['hash', '$scope', function(hash, $scope) {
		$scope.hash = hash;
	}]);
})();
