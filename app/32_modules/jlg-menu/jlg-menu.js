(function() {
	'use strict';

	var app = angular.module('jlgMenu', []);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');

		$rootScope.toggleConfig = function(name) {
			$rootScope[name].visible = !$rootScope[name].visible;
			if ($rootScope[name].visible) {
				$rootScope[name].reset();
			}
		};

	}]);

	app.directive('jlgMenu', ['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $templateRequest = $injector.get('$templateRequest');
		var $compile = $injector.get('$compile');

		return {
			restrict: 'EAC',
			link: function(scope, element, attrs, ctrl) {

				var name = attrs.name || 'menu';
				var duration = 400;

				var animate = function(element, from, to, done) {
					element.css({
						position: 'absolute',
						top: 0,
						left: from,
						display: 'block'
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

				var Menu = function() {
					var self = this;
					var width = 420;
					var height = window.innerHeight;

					var refresh = function(event) {
						height = window.innerHeight;

						if (self.isMobile) {
							width = window.innerWidth;
						}
						element.width(width);
						element.height(height);
					};

					window.onresize = refresh;

					this.isDesktop = !('ontouchstart' in window);
					this.isMobile = ('ontouchstart' in window);
					this.isLandscape = function() {
						return window.innerWidth > window.innerHeight;
					};

					if (this.isDesktop) {
						angular.element('body').addClass('jlg-desktop');
					}

					this.visible = false;

					this.makePanel = function(response) {
						var panel = angular.element('<div class="panel panel-primary"></div>');
						var head = angular.element('<div class="panel-heading"></div>');

						if (this.lastPages.length >= 2) {
							var backTitle = this.lastPages[this.lastPages.length - 2].title;
							var back = angular.element('<h3 class="jlg-back panel-title pull-left" ng-click="' +
								name + '.back()"><span class="glyphicon glyphicon-chevron-left"></span>' +
								backTitle + '</h3>');
							head.append(back);
						}

						var close = angular.element(
							'<h3 class="jlg-back panel-title pull-right glyphicon ' +
							'glyphicon-remove" ng-click="toggleConfig(\'' + name + '\')"></h3>');
						head.append(close);
						var title = angular.element('<h3 class="panel-title text-center">' +
							this.lastPages[this.lastPages.length - 1].title + '</h3>');
						head.append(title);
						response = response.replace(/<\s*jlg-line\s*\/\s*>/g, '</li><li class="list-group-item">');
						var body = angular.element('<ul class="list-group"><li class="list-group-item">' +
							response + '</li></ul>');
						panel.append(head);
						panel.append(body);
						return panel;
					};

					this.lastPages = [];
					var lastTarget;
					this.open = function(target, title) {
						if (target == lastTarget) {
							return;
						}
						lastTarget = target;
						title = title || target;

						this.lastPages.push({
							tmpl: target,
							title: title
						});
						var level = '_level_' + this.lastPages.length;

						$templateRequest(this.lastPages[this.lastPages.length - 1].tmpl, true).then(function(response) {
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
							console.error('error', error);
						});
					};
					this.back = function() {
						lastTarget = undefined;
						if (this.lastPages.length <= 1) {
							return;
						}

						var e = element.children().eq(this.lastPages.length - 1);
						var elt = element.children().eq(this.lastPages.length - 2);

						animate(e, 0, width, function() {
							e.remove();
						});

						animate(elt, -width, 0);
						this.lastPages.pop();
						refresh();
					};
					this.reset = function() {
						if (attrs.reset != 'true') {
							return;
						}

						var length = this.lastPages.length;
						if (length <= 1) {
							return;
						}

						for (var i = 0; i < length; i++) {
							element.children().eq(0).remove();
							this.lastPages.pop();
						}

						this.open(attrs.init, attrs.jlgTitle);

						refresh();
					};
				};

				$rootScope[name] = new Menu();
				$rootScope[name].open(attrs.init, attrs.jlgTitle);
			}
		};
	}]);

})();
