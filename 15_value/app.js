(function() {
	var app = angular.module('myApp', []);
	app.value('hash', {
		name: 'md5',
		hash: function(n) {
			return new Hashes.MD5().hex(n);
		}
	});

	app.controller('MyController', [ 'hash', '$scope', function(hash, $scope) {
		$scope.hash = hash;
	}]);
})();
