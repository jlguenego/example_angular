(function() {
	'use strict';

	var img = 'http://businessasmission.com/wp-content/uploads/2015/04/above-the-clouds-845x321.jpeg';

	var app = angular.module('jlg-css', []);

	// just for the sunrise. Nothing to do with the SPA
	app.run(function($document, $timeout) {
		'ngInject';
		console.log('run');
		var bodyElt = angular.element($document[0].body);
		bodyElt.addClass('is-loading');

		angular.element('<img/>').attr('src', img).on('load', function() {
			console.log('load');
			angular.element(this).remove();
			bodyElt.removeClass('is-loading');
		});
	});

})();
