(function() {
	'use strict';

	var app = angular.module('ng');

	app.value('grayscale', { value: 0 });
	app.value('blur', { value: 0 });
	app.value('shadow', { value: 0 });

	// create an injector and directly load the module list.
	var $injector = angular.injector(['ng']);
	console.log('$injector', $injector);

	$injector.invoke(function() {
		var ctrl = new(function PseudoController() {})();
		var $log = $injector.get('$log');
		var $rootScope = $injector.get('$rootScope');
		console.log('$rootScope', $rootScope);
		$rootScope.$ctrl = ctrl;

		ctrl.myService = 'blur';
		ctrl.increment = function() {
			if (!$injector.has(ctrl.myService)) {
				console.error('error');
				$log.error('service does not exist', ctrl.myService);
				return;
			}
			var service = $injector.get(ctrl.myService);
			service.value++;
			$log.info('value', service.value);
		};
		ctrl.decrement = function() {
			if (!$injector.has(ctrl.myService)) {
				console.error('error');
				$log.error('service does not exist', ctrl.myService);
				return;
			}
			var service = $injector.get(ctrl.myService);
			service.value--;
			if (service.value < 0) {
				service.value = 0;
			}
			$log.info('value', service.value);
		};

		ctrl.getValue = function() {
			if (!$injector.has(ctrl.myService)) {
				console.error('error');
				$log.error('service does not exist', ctrl.myService);
				return 'not defined';
			}
			var service = $injector.get(ctrl.myService);
			$log.info('service', service);
			return service.value;

		};

		ctrl.grayscale = $injector.get('grayscale');
		ctrl.blur = $injector.get('blur');
		ctrl.shadow = $injector.get('shadow');

		$rootScope.$watch('$ctrl', function() {
			var blur = (Number(ctrl.blur.value) / 1);
			console.log('blur', blur);
			ctrl.style = {
				filter: 'blur(' + blur + 'px) grayscale(' + (ctrl.grayscale.value * 10) + '%)',

			}
			if (ctrl.shadow.value) {
				ctrl.style['text-shadow'] = ctrl.shadow.value + 'px ' + ctrl.shadow.value + 'px 3px hsl(0, 0%, 50%)'
			}
		}, true);

		// compile but 3 seconds after...
		var $timeout = $injector.get('$timeout');

		$timeout(function() {
			var $compile = $injector.get('$compile');
			var $rootElement = angular.element(document.getElementsByTagName('body')[0]);
			$compile($rootElement)($rootScope);
		}, 3000);


	});





})();
