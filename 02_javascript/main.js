(function() {
	"use strict";

	console.log("Hello World!");

	var Animal = function() {
		this.eat = function() {
			console.log("miam miam slurp slurp...");
		};
	};

	Animal.prototype.sleep = function() {
		console.log("rzzzzzzzzz...");
	};

	var Cat = function() {
		this.speak = function() {
			console.log("miaou");
		};
	};
	Cat.prototype = new Animal();

	var garfield = new Cat();
	garfield.speak();
	garfield.sleep();
	garfield.eat();

	function myTest() {
		x = 25;
		console.log("x=" + x);

		if (true) {
			var x;
			console.log("x=" + x);
			x = 32;
			console.log("x=" + x);
		}
		console.log("x=" + x);
		x += 1;
		console.log("x=" + x);
	}

	myTest();

	for (var i = 0; i < 3; i++) {
		console.log(i);
	}

})();



