(function() {
	'use strict';

	var app = angular.module('myApp', ['ngAnimate']);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		$rootScope.coucou = 3;
	}]);

	app.directive('myMenu', ['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');
		var $animate = $injector.get('$animate');

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
							var div = angular.element('<div class="menu"></div>');
							div.append(response);
							element.append(div);
							if (self.lastPages.length >= 2) {
								$animate.removeClass(element.children().eq(self.lastPages.length - 2), 'active');
							}
							var elt = element.children().eq(self.lastPages.length - 1);
							$compile(elt)(scope);
							$animate.addClass(elt, 'active');
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

						$animate.removeClass(e, 'active').then(function() {
							console.log('coucou');
							e.remove();
						});

						$animate.addClass(elt, 'active');
						this.lastPages.pop();
					}
				};
				console.log('arguments', arguments);
				console.log('attrs', attrs);
				scope.menu.open(attrs.init);
			}
		};
	}]);

	app.animation('.menu', function() {

		var animateLeft = function(element, className, done) {
			console.log('animateLeft', arguments);
			if(className != 'active') {
				return;
			}
			element.css({
				position: 'absolute',
				top: 0,
				left: 500,
				display: 'block'
			});

			jQuery(element).animate({
				left: 0
			}, 2000, done);

			return function(cancel) {
				if(cancel) {
					element.stop();
				}
			};
		}

		var animateRight = function(element, className, done) {
			console.log('animateRight', arguments);
			if(className != 'active') {
				return;
			}
			element.css({
				position: 'absolute',
				left: 0,
				top: 0
			});

			jQuery(element).animate({
				left: -500
			}, 2000, done);

			return function(cancel) {
				if(cancel) {
					element.stop();
				}
			};
		}

		return {
			addClass: animateLeft,
			removeClass: animateRight
		};

	});

})();
