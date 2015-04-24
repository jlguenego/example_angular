(function() {
	'use strict';

	var app = angular.module('myApp', ['jlg.localization']);

	app.controller('MyController', ['$scope', '$locale', 'jlg.localization.i18nService',
		function($scope, $locale, i18nService) {
			$scope.date = new Date();

			$scope.locale = $locale;

			$scope.changeLocale = function(newLocaleId) {
				$locale.id = newLocaleId;
				i18nService.refresh();
			};
		}
	]);
})();
