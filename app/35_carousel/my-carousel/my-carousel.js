'use strict';
import './my-carousel.scss';

import 'angular';

var app = angular.module('my-carousel', []);

app.component('myCarousel', {
	controller: function MySelect($scope, $element, $templateRequest, $document, $window, $compile, $timeout) {
		'ngInject';
		var ctrl = this;
		var currentSlideId = 0;
		var slides = $element.find('slide');
		var total = slides.length;
		console.log('slides', slides);

		ctrl.goto = function(id) {
			console.log('goto', id);
			slides.addClass('hidden');
			slides.removeClass('visible');
			var currentSlide = slides.eq(id);
			currentSlide.removeClass('hidden');
			currentSlide.addClass('visible');
		};

		ctrl.prev = function() {
			console.log('prev');
			currentSlideId--;
			if (currentSlideId < 0) {
				currentSlideId = total - 1;
			}
			ctrl.goto(currentSlideId);
		};

		ctrl.next = function() {
			console.log('next');
			currentSlideId++;
			if (currentSlideId > (total - 1)) {
				currentSlideId = 0;
			}
			ctrl.goto(currentSlideId);
		};

		ctrl.addLayout = function(id) {
			$templateRequest('./my-carousel/tmpl/my-carousel.html').then(function(html) {
				$element.append(html);
				$compile($element.contents())($scope);
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
		'ngInject';
		console.log('SlideCtrl', arguments);
		var ctrl = this;
		ctrl.$onInit = function() {
			$element.css('background-image', 'url("' + ctrl.backgroundImage + '")');
		};


	}
});
