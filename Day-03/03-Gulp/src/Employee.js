import {SalaryCalculator} from './SalaryCalculator.js'

const salSymbol = Symbol();

export class Employee{
	constructor(name, age, salaryComponent){
		this.name = name;
		this.age = age;
		this[salSymbol] = new SalaryCalculator(salaryComponent);
	}
	commit (){
		this[salSymbol].calculate();
		this.salary = this[salSymbol].salary;
	}
}
