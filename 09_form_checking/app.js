(function() {
	var app = angular.module('myApp', []);

		app.controller('MyController', function() {
			this.object = {};
			this.list = [];

			this.add = function() {
				this.list.push(this.object);
				this.object = {};
			};
		});
})();