console.log("Hello World!");

var Animal = function() {
	this.eat = function() {
		console.log("miam miam slurp slurp...");
	}
}

Animal.prototype.sleep = function() {
	console.log("rzzzzzzzzz...");
}

var Cat = function() {
	this.speak = function() {
		console.log("miaou");
	}
}
Cat.prototype = new Animal();

var garfield = new Cat();
garfield.speak();
garfield.sleep();
garfield.eat();





