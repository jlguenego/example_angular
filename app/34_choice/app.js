(function() {
	'use strict';

	var app = angular.module('myApp', []);

	app.controller('MainCtrl', function MainCtrl() {
		this.cities = ['Saulxures les Nancy', 'Lunéville', 'Chanteheux', 'Nancy', 'Cachan',
			'San Francisco', 'Foster city', 'Sunnyvale', 'Charenton Le Pont', 'Torcy', 'Chatswood', 'Auckland', 'Fribourg'
		];
	});
	
	app.component('mySelect', {
		templateUrl: 'my-select.html',
		bindings: {
			value: '=',
			title: '@',
			choices: '<',
		},
		controller: function MySelect($element, $document, $window) {
			console.log('MySelect', arguments);
			var ctrl = this;
			ctrl.editMode = false;
			var body = $document.find('body').eq(0);
			
			ctrl.refresh = function() {
				console.log('refresh');
				$element.find('list')[0].scrollTop = 0;
			};
			
			ctrl.start = function() {
				ctrl.editMode = true;
				ctrl.lastSaved = $window.scrollY;
				body.addClass('noscroll');
			};
			
			ctrl.stop = function() {
				ctrl.editMode = false;
				body.removeClass('noscroll');
				$window.scrollTo(0, ctrl.lastSaved);
			};
			
			ctrl.cancel = function() {
				ctrl.value = undefined;
				ctrl.stop();
			};
			
			ctrl.select = function(choice) {
				ctrl.value = choice;
				ctrl.stop();
			}
			
			ctrl.filter = function(value) {
				console.log('filter', arguments)
				if (ctrl.pattern && value.toLowerCase().indexOf(ctrl.pattern.toLowerCase()) == -1) {
					return false;
				}
				if (value === ctrl.value) {
					return false;
				}
				return true;
			}
		}
	});
})();
