(function() {
	'use strict';

	var app = angular.module('mainApp', []);

	app.controller('MainCtrl', function() {
		this.object = {};
		this.comments = [];
		var comments = JSON.parse(localStorage.getItem('09_form_checking'));
		if (comments && comments.constructor === Array) {
			this.comments = comments;
		}
		this.add = function() {
			this.comments.push(this.object);
			this.object = {};
			localStorage.setItem('09_form_checking', JSON.stringify(this.comments));
		};

		this.deleteAll = function() {
			this.comments = [];
			localStorage.removeItem('09_form_checking');
		};
	});
})();
