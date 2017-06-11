(function() {
	'use strict';

	var app = angular.module('main', []);

	app.controller('MyController', function($scope, $element, $http) {
		'ngInject';
		var ctrl = this;
		var contentElt = $element.find('content');

		ctrl.start = function() {
			$http.get('content.json').then(function(response) {
				ctrl.content = response.data.content;
			}).catch(function(error) {
				ctrl.content = undefined;
				console.log('Error', error);
			});
		}
		ctrl.reset = function() {
			ctrl.content = undefined;
		}

		$scope.$watch('$ctrl.content', function() {
			if (ctrl.content) {
				contentElt.addClass('filled');
			} else {
				contentElt.removeClass('filled');
			}

		});

	});
})();
