(function() {
	'use strict';
	var app = angular.module('jlg-css', []);

	// just for the sunrise. Nothing to do with the SPA
	app.run(function($location, jlgCss) {
		'ngInject';
		var img = 'http://jlg-consulting.com/orsys/FAN/resources/above-the-clouds-845x321.jpeg';
		console.log('$location.path', $location.path());
		if ($location.path() === '' || $location.path() === '/' || $location.path() === '/hello') {
			console.log('onload');
			jlgCss.onload(img);
		}

	});

	app.service('jlgCss', function JlgCss($document) {
		'ngInject';
		this.onload = function(url) {
			var bodyElt = angular.element($document[0].body);
			bodyElt.addClass('is-loading');

			angular.element('<img/>').attr('src', url).on('load', function() {
				console.log('load');
				angular.element(this).remove();
				bodyElt.removeClass('is-loading');
			});
		};
	});


})();
