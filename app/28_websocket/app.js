(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MyController', ['$scope', '$anchorScroll', '$location', function($scope, $anchorScroll, $location) {
		$scope.userMessage = '';
		$scope.messages = [];
		var socket = io();

		$scope.sendMessage = function() {
			socket.emit('chat_message', $scope.userMessage);
			$scope.userMessage = '';
		};

		socket.on('chat_message', function(data) {
			console.log('Message received:', data);
			$scope.messages.push(data);
			$scope.$apply();
			$location.hash('tampon');
			$anchorScroll();
		});
	}]);
})();
