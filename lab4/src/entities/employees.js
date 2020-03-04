"use strict";

class Employee {
    constructor(name, lastName, dailyWorkRate, numberOfDaysWorked) {
        this._name = name;
        this._lastName = lastName;
        this._dailyWorkRate = dailyWorkRate;
        this._numberOfDaysWorked = numberOfDaysWorked;
        this._typeOfWork = undefined;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get dailyWorkRate() {
        return this._dailyWorkRate;
    }
    set dailyWorkRate(value) {
        this._dailyWorkRate = value;
    }
    get numberOfDaysWorked() {
        return this._numberOfDaysWorked;
    }
    set numberOfDaysWorked(value) {
        this._numberOfDaysWorked = value;
    }

    /**
     *
     * @return {number}
     */
    getSalary() {
        return this._numberOfDaysWorked * this._dailyWorkRate;
    }

    /**
     *
     * @return {string}
     */
    toJSON() {
        return JSON.stringify({
            name: this._name,
            lastName: this._lastName,
            salary: this.getSalary(),
            typeOfWork: this._typeOfWork
        });
    }
}

class Painter extends Employee {
    constructor(name, lastName, dailyWorkRate, numberOfDaysWorked) {
        super(name, lastName, dailyWorkRate, numberOfDaysWorked);
        this._typeOfWork = "Красит стены";
    }
    get typeOfWork() {
        return this._typeOfWork;
    }
}

class Plasterer extends Employee {
    constructor(name, lastName, dailyWorkRate, numberOfDaysWorked) {
        super(name, lastName, dailyWorkRate, numberOfDaysWorked);
        this._typeOfWork = "Штукатурит стены";
    }
    get typeOfWork() {
        return this._typeOfWork;
    }
}

module.exports.Employee = Employee;
module.exports.Painter = Painter;
module.exports.Plasterer = Plasterer;
