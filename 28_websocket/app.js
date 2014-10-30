var app = angular.module('myApp', []);

app.controller('MyController', ['$scope', function($scope) {
	$scope.userMessage = '';
	$scope.messages = [];
	var socket = io();

	$scope.sendMessage = function() {
		socket.emit('chat_message', $scope.userMessage);
		$scope.userMessage = '';
	};

	socket.on('chat_message', function(data) {
		console.log('Message recieved:', data);
		$scope.messages.push(data);
		$scope.$apply();
	});
}]);