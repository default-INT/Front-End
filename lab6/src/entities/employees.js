"use strict";

class Employee {
    /**
     *
     * @param name {string} имя сотрудника
     * @param lastName {string} фамилия сотрудника
     * @param dailyWorkRate {number} ставка за день работы
     * @param numberOfDaysWorked {number} количество отработанных дней
     */
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
     */
    toJSON() {
        return {
            name: this._name,
            lastName: this._lastName,
            dailyWorkRate: this._dailyWorkRate,
            numberOfDaysWorked: this._numberOfDaysWorked,
            salary: this.getSalary(),
            position: this._typeOfWork
        };
    }
}

/**
 * Маляр
 */
class Painter extends Employee {
    constructor(name, lastName, dailyWorkRate, numberOfDaysWorked) {
        super(name, lastName, dailyWorkRate, numberOfDaysWorked);
        this._typeOfWork = "Маляр";
    }
    get typeOfWork() {
        return this._typeOfWork;
    }
}

/**
 * Штукатур
 */
class Plasterer extends Employee {
    constructor(name, lastName, dailyWorkRate, numberOfDaysWorked) {
        super(name, lastName, dailyWorkRate, numberOfDaysWorked);
        this._typeOfWork = "Штукатур";
    }
    get typeOfWork() {
        return this._typeOfWork;
    }
}

module.exports.Employee = Employee;
module.exports.Painter = Painter;
module.exports.Plasterer = Plasterer;
