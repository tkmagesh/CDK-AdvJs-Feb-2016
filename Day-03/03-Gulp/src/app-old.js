let add = (x,y) => {
	return x + y;
};

const id = 100;

var Employee = (function(){
	const idSymbol = Symbol();
	class Employee{
		constructor(defaults = {id : 0, name : "", salary : 0}){
			this[idSymbol] = defaults.id;
			this.name = defaults.name;
			this.salary = defaults.salary;
		}
		display(){
			console.log(`id = ${this[idSymbol]}, name = ${this.name}, salary = ${this.salary}`);
		}
	}
	return Employee;
})()

var emp = new Employee({id : 100, name : "Magesh", salary : 10000});
emp.display();
var dummy = new Employee();
dummy.display();


var x = 10, y = 20;

console.log(`before swapping x = ${x}, y = ${y}`);

[y,x] = [x,y];

console.log(`after swapping x = ${x}, y = ${y}`);
