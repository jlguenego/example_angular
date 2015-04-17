(function() {
	'use strict';

	var app = angular.module('fakeHttp', []);

	var provide;

	app.config([ '$provide', function($provide) {
		provide = $provide;
	}]);

	app.run([ '$log', function ($log) {
		provide.decorator('$http', [ '$delegate', '$q', function($delegate, $q) {
			var $http = $delegate;

			var wrapper = function() {
				$log.debug('custom http...');
				if (arguments[0].url == 'http://bot.whatismyipaddress.com/') {
					$log.debug('You ask http://bot.whatismyipaddress.com/');

					return $q.when({
						data: '91.35.249.115',
						headers: function() {
							return 'headers not implemented';
						}
					});
				}
				return $http.apply($http, arguments);
			};

			// $http has convenience methods such as $http.get() that we have
			// to pass through as well.
			Object.keys($http).filter(function(key) {
				return (typeof $http[key] === 'function');
			}).forEach(function (key) {
				wrapper[key] = function () {

					// Apply global changes to arguments, or perform other
					// nefarious acts.

					return $http[key].apply($http, arguments);
				};
			});

			return wrapper;
		}]);
	}]);

})();
