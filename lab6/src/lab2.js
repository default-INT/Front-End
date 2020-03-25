"use strict";

function strGenerate(len) {
    let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let outputStr = "";
    while (outputStr.length < len) {
        outputStr += abc[Math.floor(Math.random() * abc.length)];
    }
    return outputStr;
}

function analyticArray(array) {
    let count = 0;
    let sum = 0;
    array.forEach(el => {
        if (el % 3 === 0) {
            count++;
            sum += el;
        }
    });
    return {count, sum}
}

module.exports.strGenerate = strGenerate;
module.exports.analyticArray = analyticArray;