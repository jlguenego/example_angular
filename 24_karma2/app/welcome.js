(function() {
	var app = angular.module('welcome', [ 'ngResource' ]);

	app.controller('welcome.MainCtrl', [ '$rootScope', '$location', '$resource', function($rootScope, $location, $resource) {
		if ($rootScope.state != "logged") {
			$location.url("/login");
		}
		$rootScope.message = "Welcome " + $rootScope.login + "!";
		$rootScope.serviceJson = $resource('data/' + $rootScope.login + '.json').get();
	}]);
})();
