(function() {
	var app = angular.module('myApp', []);
	app.value('$myInfo', {
		version: '1.2.4',
		author: 'JLG'
	});

	app.factory('$myAppDetails', [ '$myInfo', function($myInfo) {
		var result = {};
		result.loadedTime = new Date();
		result.getVersion = function() { return $myInfo.version; };
		return result;
	}]);

	app.controller('MyController', [ '$myAppDetails', function($myAppDetails) {
		this.version = $myAppDetails.getVersion();
		this.loadedTime = $myAppDetails.loadedTime;
	}]);
})();
