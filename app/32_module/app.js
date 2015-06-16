(function() {
	'use strict';

	var app = angular.module('myApp', ['ngAnimate']);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		$rootScope.coucou = 3;
	}]);

	app.directive('jlgMenu', ['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');
		var $animate = $injector.get('$animate');

		var animate = function(element, from, to, done) {
			console.log('animateLeft', arguments);
			element.css({
				position: 'absolute',
				top: 0,
				left: from,
				display: 'block'
			});

			jQuery(element).animate({
				left: to
			}, 400, done);

			return function(cancel) {
				if(cancel) {
					element.stop();
				}
			};
		};

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
						var level = '_level_' + this.lastPages.length;
						$templateRequest(this.lastPages[this.lastPages.length - 1], true).then(function(response) {
							console.log('response', response);
							var div = angular.element('<div class="_menu ' + level + '"></div>');
							div.append(response);
							element.append(div);
							if (self.lastPages.length >= 2) {
								animate(element.children().eq(self.lastPages.length - 2), 0, -500);
							}
							var elt = element.children().eq(self.lastPages.length - 1);
							$compile(elt)(scope);
							animate(elt, 500, 0);
						}).catch(function(error) {
							console.log('error', error);
						});
					},
					back: function() {
						console.log('back', this.lastPages);
						var self = this;
						if (this.lastPages.length <= 1) {
							return;
						}

						var e = element.children().eq(this.lastPages.length - 1);
						var elt = element.children().eq(this.lastPages.length - 2);

						animate(e, 0, 500, function() {
							console.log('coucou');
							e.remove();
						});

						animate(elt, -500, 0);
						this.lastPages.pop();
					}
				};
				console.log('arguments', arguments);
				console.log('attrs', attrs);
				scope.menu.open(attrs.init);
			}
		};
	}]);

})();
