(function() {
	'use strict';

	var rightLimit = 200;
	var leftLimit = 0;

	function initial() {
		$('.box').css({
			left: 100,
			top: 0
		});
		$('.limit.right').css({
			left: rightLimit,
			top: 0
		});
		$('.limit.left').css({
			left: leftLimit,
			top: 0
		});
	}

	function move(element, isRight, next) {
		var x = element.offset().left;
		var y = element.offset().top;
		console.log('x = ', x);
		var inc = 25;
		if (isRight) {
			x += inc;
		} else {
			x -= inc;
		}
		element.animate({
			left: x,
			top: y
		}, 500, next);

	}

	var app = angular.module('mainApp', []);


	app.controller('MainCtrl', ['$scope', '$q', function($scope, $q) {
		var box = $('.box');
		initial();

		var movePromise = function(isRight) {
			var deferred = $q.defer();
			var x = box.offset().left;
			if ((x == leftLimit + 50) && (isRight === false)) {
				deferred.reject();
			} else if ((x == rightLimit - 50) && (isRight === true)) {
				deferred.reject();
			} else {
				move(box, isRight, function() {
					deferred.resolve();
				});
			}
			return deferred.promise;
		};

		//		$q.when('start').then(function() {
		//			var choice = (Math.random() - 0.5) >= 0;
		//			return movePromise(choice);
		//		}).then(function() {
		//			var choice = (Math.random() - 0.5) >= 0;
		//			return movePromise(choice);
		//		}).then(function() {
		//			var choice = (Math.random() - 0.5) >= 0;
		//			return movePromise(choice);
		//		}).then(function() {
		//			var choice = (Math.random() - 0.5) >= 0;
		//			return movePromise(choice);
		//		}).catch(function() {
		//			console.log('BOUM');
		//		});


		var f = function() {
			var choice = (Math.random() - 0.5) >= 0;
			movePromise(choice).then(function() {
				f();
			}).catch(function() {
				console.log('BOUM');
			});
		};
		f();
	}]);
})();
