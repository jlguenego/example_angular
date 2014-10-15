(function() {
	var app = angular.module('myApp', []);
	app.value('$myInfo', {
		version: '1.2.4',
		author: 'JLG'
	});

	function Person(myinfo) {
		this.sayHello = function() {
			return 'Hello I am ' + this.name;
		};
		this.name = myinfo.author;
	}

	app.service('$myPerson', [ '$myInfo', Person ]);

	app.controller('MyController', [ '$myPerson', function($myPerson) {
		this.hello = $myPerson.sayHello();
	}]);
})();
