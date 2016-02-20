(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Employee = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SalaryCalculator = require('./SalaryCalculator.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var salSymbol = Symbol();

var Employee = exports.Employee = function () {
	function Employee(name, age, salaryComponent) {
		_classCallCheck(this, Employee);

		this.name = name;
		this.age = age;
		this[salSymbol] = new _SalaryCalculator.SalaryCalculator(salaryComponent);
	}

	_createClass(Employee, [{
		key: 'commit',
		value: function commit() {
			this[salSymbol].calculate();
			this.salary = this[salSymbol].salary;
		}
	}]);

	return Employee;
}();

},{"./SalaryCalculator.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SalaryCalculator = exports.SalaryCalculator = function () {
	function SalaryCalculator(salComp) {
		_classCallCheck(this, SalaryCalculator);

		this.basic = salComp.basic;
		this.hra = salComp.hra;
		this.da = salComp.da;
		this.tax = salComp.tax;
		this.salary = 0;
	}

	_createClass(SalaryCalculator, [{
		key: "calculate",
		value: function calculate() {
			var gross = this.basic + this.hra + this.da;
			this.salary = gross * ((100 - this.tax) / 100);
		}
	}]);

	return SalaryCalculator;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _Employee = require('./Employee.js');

var emp = new _Employee.Employee('Magesh', 25, { basic: 10000, hra: 2000, da: 3000, tax: 10 });
console.log('Before commit salary = ' + emp.salary);
emp.commit();
console.log('After commit salary = ' + emp.salary);

},{"./Employee.js":1}]},{},[3]);
