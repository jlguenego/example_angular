(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.value('grayscale', { value: 0 });
	app.value('blur', { value: 0 });

	app.controller('MyController', function MyController($scope, $injector) {
		'ngInject';
		var ctrl = this;
		var $log = $injector.get('$log');
		ctrl.myService = 'blur';
		ctrl.increment = function() {
			var service = $injector.get(ctrl.myService);
			service.value++;
			$log.info('value', service.value);
		};
		ctrl.decrement = function() {
			var service = $injector.get(ctrl.myService);
			service.value--;
			$log.info('value', service.value);
		};

		ctrl.getValue = function() {
			var service = $injector.get(ctrl.myService);
			$log.info('service', service);
			return service.value;

		};

		ctrl.grayscale = $injector.get('grayscale');
		ctrl.blur = $injector.get('blur');

		$scope.$watch('$ctrl', function() {
			ctrl.style = {
				filter: 'blur(' + ctrl.blur.value + 'px) grayscale(' + (ctrl.grayscale.value * 10) + '%)'
			}
		}, true);


	});
})();
