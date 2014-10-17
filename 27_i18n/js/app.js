(function() {
	var app = angular.module('myApp', [ 'jlgLocalization' ]);

	app.controller('MyController', ['$scope', '$locale', 'jlgI18NService',
		function($scope, $locale, jlgI18NService) {
			$scope.date = new Date();

			this.locale = $locale;

			this.changeLocale = function(newLocaleId) {
				$locale.id = newLocaleId;
				jlgI18NService.refresh();
			};
		}
	]);
})();