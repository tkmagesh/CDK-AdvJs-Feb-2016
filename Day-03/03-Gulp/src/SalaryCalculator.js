export class SalaryCalculator{
	constructor(salComp){
		this.basic = salComp.basic;
		this.hra = salComp.hra;
		this.da = salComp.da;
		this.tax = salComp.tax;
		this.salary = 0;
	}
	calculate (){
		let gross = this.basic + this.hra + this.da;
		this.salary = gross * ((100-this.tax)/100);
	}
}
