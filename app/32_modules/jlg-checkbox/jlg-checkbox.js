(function() {
	'use strict';

	var app = angular.module('jlgCheckbox', []);

	app.run(function() {
		FastClick.attach(document.body);
	});

	app.directive('jlgCheckbox', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');

		return {
			restrict: 'EAC',
			link: function(scope, element, attrs, ctrl) {
				console.log('scope', scope);
				console.log('attrs', attrs);
				var ngModel = attrs['ngModel'];
				console.log('ngModel', ngModel);
				var div = angular.element('<div ng-click="switch(\'' + ngModel + '\')" class="jlg-checkbox-div ' + ngModel + '"><span></span></div>');
				$compile(div)(scope);
				element.after(div);
				var duration = 100;
				var left = 2;
				var right = 18;

				var animate = function(element, from, to, done) {
					element.css({
						left: left
					});

					jQuery(element).velocity({
						left: to
					}, duration, done);

					return function(cancel) {
						if(cancel) {
							element.stop();
						}
					};
				};

				scope.switch = function(ngModel) {
					scope[ngModel] = !scope[ngModel];
					scope.set(ngModel);
				};

				scope.set = function(ngModel) {
					console.log('set');
					console.log('scope[' + ngModel + ']', scope[ngModel]);

					var span = angular.element('.jlg-checkbox-div.' + ngModel + ' span');
					if (scope[ngModel]) {
						animate(span, left, right, function() {
							span.addClass('glyphicon glyphicon-ok');
						});
					} else {
						span.removeClass('glyphicon glyphicon-ok');
						animate(span, right, left);
					}
				};

				scope.set(ngModel);
			}
		};
	}]);
})();
