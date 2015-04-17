(function() {
	'use strict';

	var app = angular.module('fakeHttp', []);

	var provide;

	var fakeHttpExample = [ {
		key: function(config) {
			return config.url.match(new RegExp('http://bot.whatismyipaddress..*/'));
		},
		value: function(config) {
			console.log('config = ', config);
			return {
				data: '91.35.249.115',
				headers: function() {
					return 'headers not implemented';
				}
			};
		}
	},
	{
		key: function(config) {
			return config.url.match(new RegExp('http://google.com'));
		},
		value: function(config) {
			console.log('config = ', config);
			return {
				data: '<html><body>fake google</body></html>',
				headers: function() {
					return 'headers not implemented';
				}
			};
		}
	} ];
	window.fakeHttp = window.fakeHttp || fakeHttpExample;



	app.config([ '$provide', function($provide) {
		provide = $provide;
	}]);

	app.run([ '$log', function ($log) {
		provide.decorator('$http', [ '$delegate', '$q', function($delegate, $q) {
			var $http = $delegate;

			var wrapper = function() {
				var config = arguments[0];
				$log.debug('custom http...');
				var a = window.fakeHttp.filter(function(x) {
					return x.key(config);
				});
				if (a.length > 0) {
					$log.debug('You ask http://bot.whatismyipaddress.com/');

					return $q.when(a[0].value(config));
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
