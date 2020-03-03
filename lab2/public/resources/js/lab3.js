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
        out.innerHTML = "<br>Массив:<br>" + response.array;
    }).catch(reason => {
        out.innerHTML = reason;
    });
}