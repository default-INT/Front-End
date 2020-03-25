"use strict";

function arrayGenerator() {
    let s = parseInt(document.querySelector("#exe1 input[name='s']").value);
    let p = parseInt(document.querySelector("#exe1 input[name='p']").value);
    let out = document.querySelector("#exe1 .out");

    if (p > 100 || p <= 0) {
        out.outerHTML = "p должно быть от 1 до 100";
        return;
    }
    httpRequest({
        url: "/api/lab3/exe1",
        method: "PUT",
        contentType: "application/json",
        responseType: "json",
        data: JSON.stringify({
            "s": s,
            "p": p
        })
    }).then(response => {
        let lines = "";
        let count = 0;
        response.array.forEach(item => {
            if (count < 100) {
                lines += item + " ";
                count++;
            } else {
                count = 0;
            }
        });
        out.innerHTML = "<br>Массив:<br>" + lines;
    }).catch(reason => {
        out.innerHTML = reason;
    });
}

function namesCreate() {
    let names = document.querySelector("#exe2 input[name='names']").value;
    names = names.split(',');
    let out = document.querySelector("#exe2 .out");

    httpRequest({
        url: "/api/lab3/exe2",
        method: "PUT",
        contentType: "application/json",
        responseType: "json",
        data: JSON.stringify({
            "names": names
        })
    }).then(response => {
        let outStr = "";
        response.split(',').forEach(line => {
            outStr += line + "<br>";
        });
        out.innerHTML = outStr;
    }).catch(reason => {
        out.innerHTML = reason;
    });
}