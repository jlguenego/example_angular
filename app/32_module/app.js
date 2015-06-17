(function() {
	'use strict';

	var app = angular.module('myApp', ['ngAnimate']);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');

		$rootScope.isDesktop = !('ontouchstart' in window);
		$rootScope.isMobile = ('ontouchstart' in window);
		$rootScope.isLandscape = function() {
			return window.innerWidth > window.innerHeight;
		};

	}]);

	app.directive('jlgMenu', ['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');
		var $animate = $injector.get('$animate');



		return {
			restrict: 'EAC',
			link: function(scope, element, attrs, ctrl) {
				console.log('link', arguments);
				var width = element.width();
				console.log('width', width);
				var duration = 400;
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
					}, duration, done);

					return function(cancel) {
						if(cancel) {
							element.stop();
						}
					};
				};
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
								animate(element.children().eq(self.lastPages.length - 2), 0, -width);
							}
							var elt = element.children().eq(self.lastPages.length - 1);
							$compile(elt)(scope);
							animate(elt, width, 0);
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

						animate(e, 0, width, function() {
							console.log('coucou');
							e.remove();
						});

						animate(elt, -width, 0);
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
