(function() {
	'use strict';

	var app = angular.module('my-select', []);

	app.component('mySelect', {
		templateUrl: 'my-select/tmpl/my-select.html',
		bindings: {
			value: '=',
			title: '@',
			choices: '<',
			placeholder: '@',
		},
		controller: function MySelect($scope, $element, $document, $window, $compile, $timeout) {
			console.log('MySelect', arguments);
			var ctrl = this;
			var body = angular.element($document[0].body);
			var localView = $document.find('local-view');
			console.log('localView', localView);
			ctrl.editMode = false;

			ctrl.start = function() {
				ctrl.editMode = true;
				if (!$scope.$root.isMobile) {
					$timeout(function() {
 $element.find('input')[0].focus();
}, 0);
				}


				localView.html('<my-select-local c="$ctrl"></my-select-local>');
				$compile(localView.contents())($scope);
				localView.addClass('mobile-visible');
				if ($scope.$root.isMobile) {
					ctrl.lastSaved = $window.scrollY;
					body.addClass('noscroll');
				}
			};

			ctrl.stop = function() {
				ctrl.editMode = false;
				localView.html('');
				$compile(localView.contents())($scope);
				localView.removeClass('mobile-visible');
				if ($scope.$root.isMobile) {
					body.removeClass('noscroll');
					$window.scrollTo(0, ctrl.lastSaved);
				}
			};

			ctrl.select = function(choice) {
				console.log('select', arguments);
				ctrl.value = choice;
				ctrl.stop();
			};

			ctrl.cancel = function() {
				ctrl.select(undefined);
			};

			ctrl.selectFirst = function() {
				console.log('selectFirst');
				// must wait to be sure ng-click execute before !
				$timeout(function() {
					console.log('selectFirst timeout');
					if (!ctrl.value) {
						ctrl.value = ctrl.filteredChoices[0];
					}
					ctrl.stop();
				}, 200);
			};

			ctrl.filter = function(value) {
				if (ctrl.pattern && value.toLowerCase().indexOf(ctrl.pattern.toLowerCase()) == -1) {
					return false;
				}
				if (value === ctrl.value) {
					return false;
				}
				return true;
			};

			$scope.$watchGroup(['$ctrl.pattern', '$ctrl.value'], function() {
				console.log('refresh filteredChoices');
				ctrl.filteredChoices = ctrl.choices.filter(ctrl.filter).slice(0, 20);
			});
		}
	});

	app.component('mySelectLocal', {
		templateUrl: 'my-select/tmpl/my-select-local.html',
		bindings: {
			c: '=',
		},
		controller: function MySelect($element) {
			console.log('MySelect', arguments);
			var ctrl = this;

			ctrl.refresh = function() {
				$element.find('fixed-list-mobile')[0].scrollTop = 0;
			};
		}
	});
})();
