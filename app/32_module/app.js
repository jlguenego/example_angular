(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');

		$rootScope.isDesktop = !('ontouchstart' in window);
		$rootScope.isMobile = ('ontouchstart' in window);
		$rootScope.isLandscape = function() {
			return window.innerWidth > window.innerHeight;
		};
		$rootScope.showConfig = false;

		$rootScope.toggleConfig = function() {
			$rootScope.showConfig = !$rootScope.showConfig;
		};

	}]);

	app.directive('jlgMenu', ['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');


		return {
			restrict: 'EAC',
			link: function(scope, element, attrs, ctrl) {
				console.log('link', arguments);


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

				var Menu = function() {

					var width = 420;
					var height = window.innerHeight;
					console.log('height', height);
					var refresh = function(event) {
						console.log('resize');
						height = window.innerHeight;

						if ($rootScope.isMobile) {
							width = window.innerWidth;
						}
						element.width(width);
						element.height(height);
					};

					window.onresize = refresh;

					this.makePanel = function(response) {
						console.log('response', response);
						console.log('this', this);
						var panel = angular.element('<div class="panel panel-primary"></div>');
						var head = angular.element('<div class="panel-heading"></div>');



						if (this.lastPages.length >= 2) {
							var backTitle = this.lastPages[this.lastPages.length - 2].title;
							var back = angular.element('<h3 class="jlg-back panel-title pull-left" ng-click="menu.back()"><span class="glyphicon glyphicon-chevron-left"></span>' + backTitle + '</h3>');
							head.append(back);
						}
						var close = angular.element('<h3 class="jlg-back panel-title pull-right glyphicon glyphicon-remove" ng-click="toggleConfig()"></h3>');
						head.append(close);
						var title = angular.element('<h3 class="panel-title text-center">' + this.lastPages[this.lastPages.length - 1].title + '</h3>');
						head.append(title);

						var body = angular.element('<div class="panel-body">' + response + '</div>');
						panel.append(head);
						panel.append(body);
						return panel;
					};


					this.lastPages = [];
					this.open = function(target, title) {
						title = title || target;
						var self = this;
						console.log('target', target);
						this.lastPages.push({
							tmpl: target,
							title: title
						});
						var level = '_level_' + this.lastPages.length;
						$templateRequest(this.lastPages[this.lastPages.length - 1].tmpl, true).then(function(response) {
							console.log('response', response);
							var panel = self.makePanel(response);
							var div = angular.element('<div class="_menu ' + level + '"></div>');
							div.append(panel);
							element.append(div);
							if (self.lastPages.length >= 2) {
								animate(element.children().eq(self.lastPages.length - 2), 0, -width);
							}
							var elt = element.children().eq(self.lastPages.length - 1);
							$compile(elt)(scope);
							animate(elt, width, 0);
							refresh();
						}).catch(function(error) {
							console.log('error', error);
						});
					},
					this.back = function() {
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
						refresh();
					}
				};
				scope.menu = new Menu();
				console.log('arguments', arguments);
				console.log('attrs', attrs);
				scope.menu.open(attrs.init, attrs.title);
			}
		};
	}]);

})();
