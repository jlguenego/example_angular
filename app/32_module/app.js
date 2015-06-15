(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		$rootScope.coucou = 3;
	}]);

	app.directive('myMenu', ['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');

		return {
			restrict: 'EAC',
			link: function(scope, element, attrs, ctrl) {
				console.log('link', arguments);
				scope.menu = {
					lastPages: [],
					open: function(target) {
						var self = this;
						console.log('target', target);
						this.lastPages.push(target);
						$templateRequest(this.lastPages[this.lastPages.length - 1], true).then(function(response) {
							console.log('response', response);
							var div = angular.element('<div></div>');
							div.append(response);
							element.append(div);
							$compile(element.children().eq(self.lastPages.length - 1))(scope);
						}).catch(function(error) {
							console.log('error', error);
						});
					},
					back: function() {
						console.log('back', this.lastPages);
						if (this.lastPages.length <= 1) {
							return;
						}
						this.lastPages.pop();
						element.children().eq(this.lastPages.length).remove();
					}
				};
				console.log('arguments', arguments);
				console.log('attrs', attrs);
				scope.menu.open(attrs.init);
			}
		};
	}]);
})();
