(function() {
	var app = angular.module('authentication', []);

	app.controller('authentication.MainCtrl', [ '$scope', '$injector', function($scope, $injector) {
		var $log = $injector.get("$log");
		var $rootScope = $injector.get("$rootScope");
		var $http = $injector.get("$http");
		var $location = $injector.get("$location");

		$scope.authenticate = function() {
			$log.debug("authenticate");
			$rootScope.state = "not logged";
			$rootScope.errorMessage = undefined;
			$http.get('data/login.json').success(function(data) {
				if (!(data.logins && data.logins instanceof Array)) {
					$log.debug(data.logins);
					$log.error("json not well formatted");
					$rootScope.errorMessage = "technical error";
					return;
				}
				$log.debug("login = ", $scope.login);
				$log.debug("logins = ", data.logins);
				if (data.logins.indexOf($scope.login) > -1) {
					$rootScope.state = "logged";
					$rootScope.login = $scope.login;
					$location.url("/");
				} else {
					$rootScope.errorMessage = "bad login/password";
				}
			}).error(function(data, status, headers, config) {
				$rootScope.errorMessage = "technical error";
			});
			$log.error("bad login");
		};
	}]);

})();
