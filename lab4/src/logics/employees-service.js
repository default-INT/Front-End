"use strict";

const employees = require('../entities/employees');

class EmployeesService {
    static _instance;
    _team;

    constructor() {
        this._team = [];
        EmployeesService._setTemplate(this._team);
    }

    /**
     *
     * @param team {[]}
     */
    static _setTemplate(team) {
        team.push(new employees.Plasterer('Евгений', 'Трофимов', 12, 30));
        team.push(new employees.Painter('Игорь', 'Ропот', 15, 15));
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new EmployeesService();
        }
        return this._instance;
    }

    /**
     *
     * @param employee {employees.Employee}
     */
    addEmployee(employee) {
        this._team.push(employee);
        return {
            employee: employee,
            result: true
        };
    }

    /**
     *
     * @param id {number}
     */
    getEmployee(id) {
        this._team[id];
    }

    getEmployees() {
        return this._team;
    }
}

module.exports.EmployeesService = EmployeesService;