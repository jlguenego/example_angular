(function() {
	var app = angular.module('jlgLocalization', [ 'ngLocale', 'ngResource' ]);

	app.service('jlgI18NService', ['$locale', '$resource', '$rootScope',
		function JLGI18NService($locale, $resource, $rootScope) {
			var self = this;

			var i18nRes = $resource('i18n/:locale.json');
			var localeRes = $resource('i18n/locale/locale_:locale.json');

			this.refresh = function() {
				this.translation = i18nRes.get({locale: $locale.id});

				var newLocale = localeRes.get({locale: $locale.id}, function(newLocale) {
					for (var property in newLocale) {
						if ($locale.hasOwnProperty(property)) {
							$locale[property] = newLocale[property];
						}
					}
				});
			};

			this.refresh();
		}
	]);

	app.filter('i18n', ['jlgI18NService', function(jlgI18NService) {
		return function(text) {
			var result = text;
			var args = Array.prototype.slice.call(arguments, 1);
			var translation = jlgI18NService.translation;

			if (translation.hasOwnProperty(text)) {
				result = translation[text];
			}

			var getKeys = function() {
				var res = [];
				for (var i = 0; i < Math.pow(2, args.length); i++) {
					var a = [];
					for (var j = 0; j < args.length; j++) {
						var isNotProvided = i&Math.pow(2, j);
						if (isNotProvided) {
							a.push('@');
						} else {
							a.push(args[j]);
						}
					}
					res.push(a.join('_'));
				}
				return res;
			}

			var selectedKey = Array.apply(null, Array(args.length))
								.map(function() { return '@' })
								.join('_');

			// Pluralization
			if (typeof result == 'object') {
				var keys = getKeys();
				var found = false;
				for (var i = 0; i < keys.length; i++) {
					if (result.hasOwnProperty(keys[i])) {
						selectedKey = keys[i];
						result = result[selectedKey];
						found = true;
						break;
					}
				}
				if (!found) {
					result = text;
				}
			}

			// Interpolation
			var a = selectedKey.split('_');
			for (var i = 0; i < args.length; i++) {
				if (a[i] == '@') {
					result = result.replace(/\[\[.*?\]\]/, args[i]);
				}
			}

			return result;
		}
	}]);
})();