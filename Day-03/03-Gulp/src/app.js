import {Employee} from './Employee.js'
var emp = new Employee('Magesh' , 25, {basic :10000, hra : 2000, da : 3000, tax : 10});
console.log(`Before commit salary = ${emp.salary}`)
emp.commit();
console.log(`After commit salary = ${emp.salary}`)
