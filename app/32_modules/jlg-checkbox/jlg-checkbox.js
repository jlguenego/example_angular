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
				var ngModel = attrs.ngModel;
				var div = angular.element('<div ng-click="switch(\'' + ngModel + '\')" id="jlg-checkbox-' +
					ngModel + '" class="jlg-checkbox-div"><span></span></div>');
				$compile(div)(scope);
				element.after(div);
				var duration = 0;
				var left = 2;
				var right = 12;

				var animate = function(element, from, to, done) {
					element.css({
						left: left
					});

					jQuery(element).velocity({
						left: to
					}, duration, done);

					return function(cancel) {
						if (cancel) {
							element.stop();
						}
					};
				};

				scope.switch = function(ngModel) {
					var bool = scope.$eval(ngModel);
					if (bool) {
						scope.$eval(ngModel + ' = false');
					} else {
						scope.$eval(ngModel + ' = true');
					}
					scope.set(ngModel);
				};

				scope.set = function(ngModel) {

					var n = ngModel.replace(/[.]/g, '\\.');
					var span = angular.element('#jlg-checkbox-' + n + ' span');
					if (scope.$eval(ngModel)) {
						animate(span, left, right, function() {
							span.addClass('glyphicon glyphicon-ok');
						});
					} else {
						span.removeClass('glyphicon glyphicon-ok');
						animate(span, right, left);
					}
				};

				scope.$watch(ngModel, function() {
					scope.set(ngModel);
				});

				scope.set(ngModel);
			}
		};
	}]);
})();
