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
				var div = angular.element('<div ng-click="switch()" class="jlg-checkbox-div"><span></span></div>');
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

				scope.switch = function() {
					console.log('switch');
					console.log('scope[ngModel]', scope[ngModel]);
					scope[ngModel] = !scope[ngModel];
					var from = scope[ngModel] ? left : right;
					var to = scope[ngModel] ? right : left;
					var span = angular.element('.jlg-checkbox-div span');
					if (scope[ngModel]) {
						animate(span, from, to, function() {
							span.addClass('glyphicon glyphicon-ok');
						});
					} else {
						span.removeClass('glyphicon glyphicon-ok');
						animate(span, from, to);
					}
				};
			}
		};
	}]);
})();
