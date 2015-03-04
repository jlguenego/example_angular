(function() {
	var app = angular.module('mainApp', [ 'ngRoute', 'authentication', 'welcome' ]);

	app.controller('MainCtrl', [ "$rootScope", function($rootScope) {
		$rootScope.state = "not logged";
		$rootScope.errorMessage = undefined;
	}]);

	app.config(['$routeProvider', '$locationProvider', '$logProvider', function($routeProvider, $locationProvider, $logProvider) {
		$locationProvider
			.html5Mode(false)
			.hashPrefix("");

		$logProvider.debugEnabled(true);

		$routeProvider
			.when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'authentication.MainCtrl'
			})
			.when('/main', {
				templateUrl: 'partials/welcome.html',
				controller: 'welcome.MainCtrl'
			})
			.otherwise({
				redirectTo: '/main'
			});
	}]);
})();
