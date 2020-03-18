"use strict";

/*
 * Adding zeros in start to numbers
 */
function setZeroFirstFormat(value)
{
    if (value < 10) {
        value='0' + value;
    }
    return value;
}

function getDateTime() {
    let currentDateTime = new Date();
    let day = setZeroFirstFormat(currentDateTime.getDate());
    let month = setZeroFirstFormat(currentDateTime.getMonth() + 1);
    let year = currentDateTime.getFullYear();
    let hours = setZeroFirstFormat(currentDateTime.getHours());
    let minutes = setZeroFirstFormat(currentDateTime.getMinutes());
    let seconds = setZeroFirstFormat(currentDateTime.getSeconds());

    return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}

setInterval(function () {
    document.getElementById('time').innerHTML = getDateTime();
}, 1000);

function generateString() {
    httpRequest({
        url: "/api/str-generate",
        method: "GET"
    }).then(response => {
        let out = document.querySelector(".result #exe1 .out");
        if (!response) {
            out.innerHTML = "Не удалось получить ответ с сервера.";
        } else {
            out.innerHTML = "Сгенерированная строка: <b>" + response + "</b>";
        }
    });
}

function divCountArray() {
    let entry = document.getElementById("arrayEntry");
    let array = [];

    if (entry.value === "") {
        let out = document.querySelector(".result #exe2 .out");
        out.innerHTML = "Введите массив!";
        return;
    }
    entry.value.split(',')
               .forEach(symbol => array.push(parseInt(symbol)));

    httpRequest({
        url: "/api/div-count-3-array",
        method: "PUT",
        contentType: "application/json",
        responseType: "json",
        data: JSON.stringify({
            "array": array
        })
    }).then(response => {
        let out = document.querySelector(".result #exe2 .out");
        if (!response) {
            out.innerHTML = "Не удалось получить ответ с сервера.";
        } else {
            out.innerHTML = "Количество элементов: " + response.count + "<br>" +
                "Сумма элементов: " + response.sum;
        }

    }).catch(resolve => {
        let out = document.querySelector(".result #exe2 .out");
        out.innerHTML = "Не удалось получить ответ с сервера.";
    });
}

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
}

let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err);
            else resolve(script);
        });
    })
};


/**
 * Adding zeros in start to numbers
 *
 * @author Evgeniy Trofimov
 * @version 1.0
 */
function setZeroFirstFormat(value)
{
    if (value < 10)
    {
        value='0' + value;
    }
    return value;
}

/**
 * Function convert date to string.
 *
 * @author Evgeniy Trofimov
 * @version 1.0
 * @return {string}
 */
function dateFormat(currentDateTime) {
    let day = setZeroFirstFormat(currentDateTime.getDate());
    let month = setZeroFirstFormat(currentDateTime.getMonth()+1);
    let year = currentDateTime.getFullYear();
    let hours = setZeroFirstFormat(currentDateTime.getHours());
    let minutes = setZeroFirstFormat(currentDateTime.getMinutes());

    return day + "." + month + "." + year;
}
