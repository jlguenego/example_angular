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
		controller: function MySelect($scope, $element, $document, $window, $compile) {
			console.log('MySelect', arguments);
			var ctrl = this;
			var localView = $document.find('local-view');
			console.log('localView', localView);
			ctrl.editMode = false;
			
			ctrl.start = function() {
				ctrl.editMode = true;
				localView.html('<my-select-local c="$ctrl"></my-select-local');
				$compile(localView.contents())($scope);
			};
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
