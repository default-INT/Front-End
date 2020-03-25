"use strict";

const fs = require('fs');

class StudentService {
    static _instance;

    static _fileName = './data/student.json';
    static _encoding = 'utf-8';

    constructor() {
        if (!!StudentService._instance) {
            new Error("This object has been created.");
        }
    }

    /**
     *
     * @return {Promise<Object>}
     */
    static getStudentData() {
        return StudentService._readFile(this._fileName, this._encoding)
            .then(data => {
                return JSON.parse(data);
            });
    }

    /**
     *
     * @param fileName
     * @param encoding
     * @return {Promise<string>}
     */
    static _readFile(fileName, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, encoding, ((err, data) => {
                return err ? reject(err) : resolve(data);
            }));
        });
    }
}

module.exports.StudentService = StudentService;