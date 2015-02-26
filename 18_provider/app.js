(function() {
	var app = angular.module('myApp', []);
	app.value('myInfo', {
		version: '1.2.4',
		author: 'JLG'
	});

	function Person(myinfo) {
		this.sayHello = function() {
			return 'Hello I am ' + this.name;
		};
		this.name = myinfo.author;
	}

	app.provider('myPerson', function() {
		console.log('provider call');
		var author = undefined;
		this.setAuthor = function(name) {
			author = name;
		};
		this.$get = [ 'myInfo', function(myInfo) {
			var result = new Person(myInfo);
			if (author) {
				result.name = author;
			}
			return result;
		}];
	});

	app.config(["myPersonProvider", function(myPersonProvider) {
		myPersonProvider.setAuthor('Jean-Louis');
	}]);

	app.controller('MyController', [ 'myPerson', function(myPerson) {
		this.hello = myPerson.sayHello();
	}]);
})();
