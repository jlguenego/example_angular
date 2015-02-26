(function() {
	var app = angular.module('myApp', []);
	app.value('myInfo', {
		version: '1.2.4',
		author: 'JLG'
	});

	app.controller('MyController', [ 'myInfo', function(myInfo) {
		this.version = myInfo.version;
	}]);
})();
