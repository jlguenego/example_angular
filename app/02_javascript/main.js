(function() {
	'use strict';

	// the following fail in strict mode. Why ?
	// toto = 5;

	console.log('Hello World!');

	var Animal = function() {
		this.eat = function() {
			console.log('miam miam slurp slurp...');
		};
	};

	Animal.prototype.sleep = function() {
		console.log('rzzzzzzzzz...');
	};

	var Cat = function() {
		this.speak = function() {
			console.log('miaou');
		};
	};
	Cat.prototype = new Animal();

	var garfield = new Cat();
	garfield.speak();
	garfield.sleep();
	garfield.eat();

	console.log('garfield', garfield);

	class Vehicle {
		constructor(color) {
			this.color = color;
		}
		start() {
			console.log('vroum vroum !');
		}
		stop() {
			console.log('...');
		}
	}

	class Car extends Vehicle {
		constructor(color, price) {
			super(color);
			this.price = price;
		}
		lock() {
			console.log('Car is locked.');
		}
	}

	const citroen2CV = new Car('blue', 25000);
	citroen2CV.lock();
	citroen2CV.start();
	citroen2CV.stop();
	console.log('citroen2CV', citroen2CV);

	function myTest() {
		// Question: what does x is ?
		// eslint-disable-next-line no-use-before-define
		x = 25;
		// eslint-disable-next-line no-use-before-define
		console.log('x', x);

		// eslint-disable-next-line no-constant-condition
		if (true) {
			var x;
			console.log('x', x);
			x = 32;
			console.log('x', x);
		}
		console.log('x', x);
		x += 1;
		console.log('x', x);
	}

	myTest();

	// Question: Why can we print i without error ? 
	console.log(i);
	for (var i = 0; i < 3; i++) {
		console.log(i);
	}
	console.log(i);

	// Every function is variadic. 
	function myTest2(a, b, c) {
		console.log('start');
		console.log(a, b, c);
		console.log(arguments);
		console.log(arguments[3]);
		console.log('is arguments an Array ?', arguments.constructor === Array);
		Array.prototype.forEach.call(arguments, function(n, i) {
			console.log(n, i);
		});
	}

	myTest2(1);
	myTest2(1, 3, 12);
	myTest2(1, 3, 12, 14);
	var x = [1, 12, 3];
	console.log(x);
	x.forEach(function(n, i) {
		console.log(n, i);
		console.log('arguments', arguments);
	});
	x.length = 10;
	console.log('x', x);
	x['!@#$%asdf'] = 'hello';
	x.$coucou = 'yeah';
	console.log('x', x);

	// Cast to number
	var a = '34';
	console.log('typeof a', typeof a);
	console.log('typeof +a', typeof + a);


})();
