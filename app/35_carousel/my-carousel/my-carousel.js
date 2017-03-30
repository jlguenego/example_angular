(function() {
	'use strict';

	var app = angular.module('my-carousel', []);

	app.component('myCarousel', {
		controller: function MySelect($scope, $element, $templateRequest, $document, $window, $compile, $timeout) {
			'ngInject';
			var ctrl = this;
			var currentSlideId = 0;
			var slides = $element.find('slide');
			console.log('slides', slides);

			ctrl.goto = function(id) {
				slides.addClass('hidden');
				var currentSlide = slides.eq(id);
				currentSlide.removeClass('hidden');
				currentSlide.addClass('visible');
			};

			ctrl.addLayout = function(id) {
				$templateRequest('./my-carousel/tmpl/my-carousel.html').then(function(html) {
					$element.append(html);
				});
			};


			ctrl.goto(currentSlideId);

			ctrl.addLayout();

		}
	});

	app.component('slide', {
		require: {
			myCarousel: '^myCarousel'
		},
		bindings: {
			backgroundImage: '@',
		},
		controller: function SlideCtrl($element) {
			console.log('SlideCtrl', arguments);
			var ctrl = this;


		}
	});
})();
