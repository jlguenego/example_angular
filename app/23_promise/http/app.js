(function() {
	'use strict';

	var app = angular.module('mainApp', ['angularSpinner']);

	app.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
		usSpinnerConfigProvider.setDefaults({
			lines: 13,

			// The number of lines to draw
			length: 20,

			// The length of each line
			width: 10,

			// The line thickness
			radius: 30,

			// The radius of the inner circle
			corners: 1,

			// Corner roundness (0..1)
			rotate: 0,

			// The rotation offset
			direction: 1,

			// 1: clockwise, -1: counterclockwise
			color: '#000',

			// #rgb or #rrggbb or array of colors
			speed: 1,

			// Rounds per second
			trail: 60,

			// Afterglow percentage
			shadow: false,

			// Whether to render a shadow
			hwaccel: false,

			// Whether to use hardware acceleration
			className: 'spinner',

			// The CSS class to assign to the spinner
			zIndex: 2e9,

			// The z-index (defaults to 2000000000)
			top: '50%',

			// Top position relative to parent
			left: '50%'

			// Left position relative to parent
		});
	}]);


	app.controller('MainCtrl', ['$scope', '$injector', function($scope, $injector) {

		var $q = $injector.get('$q');
		var usSpinnerService = $injector.get('usSpinnerService');
		var $http = $injector.get('$http');
		var $timeout = $injector.get('$timeout');

		$scope.action = 'Start';

		$scope.click = function() {

			$q.when('start').then(function() {
				usSpinnerService.spin('spinner-1');
				return $http.get('content.json');
			}).then(function(response) {
				$scope.content = response.data;
				return $timeout(function() {}, 2000);
			}).then(function() {
				return $http.get('content.json');
			}).then(function(response) {
				$scope.content = response.data;
				usSpinnerService.stop('spinner-1');
				return true;
			}).catch(function(error) {
				console.log('Error! ', error);
			});
		};

	}]);
})();
