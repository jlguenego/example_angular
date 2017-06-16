function move(element, distanceX, distanceY, duration, next) {
	// get the actual position
	var x = element.offset().left;
	var y = element.offset().top;
	element.animate({
		left: x + distanceX,
		top: y + distanceY
	}, duration, next);
}

$(function() {

	// move($('.box'), 600, 0, 1000, function() {
	// 	move($('.box'), 0, 100, 1000, function() {
	// 		move($('.box'), -100, 0, 1000, function() {
	// 			console.log('End');
	// 		});
	// 	});
	// });

	var movePromise = function(element, distanceX, distanceY, duration) {
		return new Promise(function(fulfill, reject) {
			move(element, distanceX, distanceY, duration, fulfill);
		});
	};
	movePromise($('.box'), 600, 0, 1000)
		.then(function() {
			return movePromise($('.box'), 0, 100, 1000);
		})
		.then(function() {
			return movePromise($('.box'), -100, 0, 1000);
		})
		.then(function() {
			console.log('End');
		});
});
