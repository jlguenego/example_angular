(function() {
	var app = angular.module('welcome', []);

	app.controller('welcome.MainCtrl', [ '$rootScope', '$location', function($rootScope, $location) {
		if ($rootScope.state != "logged") {
			$location.url("/login");
		}
		$rootScope.message = "Welcome " + $rootScope.login + "!";
	}]);
})();
