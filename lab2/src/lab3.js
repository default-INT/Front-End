"use strict";

function strGenerate(len) {
    let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let outputStr = "";
    while (outputStr.length < len) {
        outputStr += abc[Math.floor(Math.random() * abc.length)];
    }
    let sum = 0;
    let charArray = [];
    outputStr.toUpperCase().split('')
                           .forEach(codeSymbol => {
                               if (codeSymbol % 5 !== 0) {
                                   sum += codeSymbol % 5;
                                   charArray.push(codeSymbol);
                               }
                           });
    return {charArray, sum}
}

function arrayGenerator(s = 100, p = 30) {
    let max = s + s * p / 100;
    let min = s - s * p / 100;
    let array = [];
    for (let i = 0; i < 1000; i++) {
        array.push(Math.round(Math.random() * (max - min) + min));
    }
    array.sort((prev, next) => next % 10 - prev % 10);
    return array;
}

function getArgsAvg(...args) {
    let sum = 0;
    let avgSum = args.reduce((prev, current) => prev + current) / args.length;
    args.forEach(n => sum += 1 / n);
    let avgHarmonic = args.length / sum;
    return {avgSum, avgHarmonic};
}

function getHuman(names) {
    let humanArray = [];
    for (let i = 0; i < 20; i++) {
        let name = names[Math.round(Math.random() * (names.length - 1))];
        let age = Math.round(Math.random() * (100 - 5) + 5);
        humanArray.push({
            name, age,
            toString() {
                return "Меня зовут " + this.name + " и мне " + this.age + " лет. ";
            }
        });
    }
    return humanArray.toString();
}

module.exports.strGenerate = strGenerate;
module.exports.arrayGenerator = arrayGenerator;
module.exports.getArgsAvg = getArgsAvg;
module.exports.getHuman = getHuman;
