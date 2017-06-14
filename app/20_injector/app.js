(function() {
	'use strict';

	var app = angular.module('ng');

	var info = app.info();
	info.hello = 'world';

	app.value('grayscale', { value: 0 });
	app.value('blur', { value: 0 });
	app.value('shadow', { value: 0 });

	// create an injector and directly load the module list.
	// we do not use ng-app neitheir angular.bootstrap... !!! ;)
	var $injector = angular.injector(['ng']);
	console.log('$injector', $injector);

	function PseudoCtrl(helloLocal, $injector, $log) {
		var ctrl = this;

		console.log('helloLocal', helloLocal);

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

		var $rootScope = $injector.get('$rootScope');
		console.log('$rootScope', $rootScope);
		$rootScope.$ctrl = ctrl;

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
	}

	$injector.invoke(function($compile, $timeout) {
		'ngInject';
		var pseudoCtrl = $injector.instantiate(PseudoCtrl, { helloLocal: 'hey I am a local injection' });
		console.log('pseudoCtrl', pseudoCtrl);
		var injections = $injector.annotate(PseudoCtrl);
		console.log('injections', injections);

		console.log('list of used modules: ', $injector.modules);

		for (var p in $injector.modules) {
			var info = $injector.modules[p].info();
			console.log('info', info);
		}

		// compile but 3 seconds after just for fun...
		$timeout(function() {
			var $rootScope = $injector.get('$rootScope');
			var $rootElement = angular.element(document.getElementsByTagName('body')[0]);
			$compile($rootElement)($rootScope);
		}, 3000);

	});

})();
