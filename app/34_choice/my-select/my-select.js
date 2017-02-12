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
			var localView = $document.find('local-view');
			console.log('localView', localView);
			ctrl.editMode = false;
			
			ctrl.start = function() {
				ctrl.editMode = true;
				$timeout(function() { $element.find('input')[0].focus(); }, 0);
				
				localView.html('<my-select-local c="$ctrl"></my-select-local');
				$compile(localView.contents())($scope);
			};
			
			ctrl.stop = function() {
				ctrl.editMode = false;
			};
			
			ctrl.select = function(choice) {
				ctrl.value = choice;
				ctrl.stop();
			};
			
			ctrl.selectFirst = function() {
				if (!ctrl.value) {
					ctrl.value = ctrl.filteredChoices[0];
				}
				ctrl.stop();
			};
			
			ctrl.filter = function(value) {
				if (ctrl.pattern && value.toLowerCase().indexOf(ctrl.pattern.toLowerCase()) == -1) {
					return false;
				}
				if (value === ctrl.value) {
					return false;
				}
				return true;
			}
			
			$scope.$watchGroup(['$ctrl.pattern', '$ctrl.value'], function() {
				console.log('refresh filteredChoices');
				ctrl.filteredChoices = ctrl.choices.filter(ctrl.filter).slice(0,20);
			}); 
		}
	});
	
	app.component('mySelectLocal', {
		templateUrl: 'my-select/tmpl/my-select-local.html',
		bindings: {
			c: '=',
		},
		controller: function MySelect() {
			console.log('MySelect', arguments);
			var ctrl = this;
		}
	});
})();
