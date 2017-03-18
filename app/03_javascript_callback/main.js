(function() {
	'use strict';
	console.log('Hello World!');

	for (var i = 0; i < 10; i++) {
		setTimeout(function() {
			console.log('i=' + i);
		}, 1000);
	}
	// eslint-disable-next-line no-redeclare
	for (var i = 0; i < 10; i++) {
		(function(j) {
			setTimeout(function() {
				console.log('i=' + j);
			}, 1000);
		})(i);
	}
})();
