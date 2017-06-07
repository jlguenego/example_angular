(function() {
	'use strict';

	var myModule = angular.module('myModule', []);

	// implicit annotation (cannot support minification)
	myModule.service('hello', function($log, $window) {
		this.sayHello = function(name) {
			$log.info('Hello ' + name + '!');
			$window.alert('Hello ' + name + '!');
		};
	});

	// inline array annotation
	myModule.service('goodbye', ['$log', '$window', function($log, $window) {
		this.sayGoodbye = function(name) {
			$log.info('Goodbye ' + name + '!');
			$window.alert('Goodbye ' + name + '!');
		};
	}]);

	// $inject annotation
	var helloAgain = function($log, $window) {
		this.sayHelloAgain = function(name) {
			$log.info('Hello again ' + name + '!');
			$window.alert('Hello again ' + name + '!');
		};
	};
	helloAgain.$inject = ['$log', '$window'];

	myModule.service('helloAgain', helloAgain);

	// ngInject annotation (need ng-annotate plugin)
	myModule.service('goodbyeAgain', function($log, $window) {
		'ngInject';
		this.sayGoodbyeAgain = function(name) {
			$log.info('Goodbye again ' + name + '!');
			$window.alert('Goodbye again ' + name + '!');
		};
	});


	// module app
	var app = angular.module('myApp', ['myModule']);
	app.controller('MyController', [
		'$scope',
		'hello',
		'goodbye',
		'helloAgain',
		'goodbyeAgain',
		function($scope, hello, goodbye, helloAgain, goodbyeAgain) {
			$scope.sayHello = hello.sayHello;
			$scope.sayHelloAgain = helloAgain.sayHelloAgain;
			$scope.sayGoodbye = goodbye.sayGoodbye;
			$scope.sayGoodbyeAgain = goodbyeAgain.sayGoodbyeAgain;
		}
	]);
})();

// small reminder about dependency injections.

var myConsole = {
	log: function(str) {
		var node = document.createTextNode('log: ' + str);
		var para = document.createElement("p");
		para.appendChild(node);
		document.body.appendChild(para);
	}
};

function bonjour(console, str) {
	console.log('hello ' + str);
}

bonjour(myConsole, 'Maite');
bonjour(console, 'Jean-Louis');
