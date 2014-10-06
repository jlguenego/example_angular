console.log("Hello World!");

for (var i = 0; i < 10; i++) {
	setTimeout(function() { console.log('i=' + i); }, 1000);
}

for (var i = 0; i < 10; i++) {
	(function(my_i) {
		setTimeout(function() { console.log('i=' + my_i); }, 1000);
	})(i);
}


