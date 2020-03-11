"use strict";


function addEmployee() {
    let nameEntry = document.querySelector('#exe1 input[name="name"]');
    let fullNameEntry = document.querySelector('#exe1 input[name="fullName"]');
    let dailyWorkRateEntry = document.querySelector('#exe1 input[name="dailyWorkRate"]');
    let numberOfDaysWorkedEntry = document.querySelector('#exe1 input[name="numberOfDaysWorked"]');
    let positionSelector = document.querySelector('#exe1 select');

    httpRequest({
        url: '/api/lab4/employees',
        method: 'POST',
        contentType: "application/json",
        responseType: "json",
        data: JSON.stringify({
            name: nameEntry.value,
            fullName: fullNameEntry.value,
            dailyWorkRate: dailyWorkRateEntry.value,
            numberOfDaysWorked: numberOfDaysWorkedEntry.value,
            position: positionSelector.value
        })
    }).then(response => {
        if (response.result) {
            let tbody = document.querySelector("#exe1 tbody");
            tbody.innerHTML += "<tr><td>" + response.employee.name + "</td>" +
                "<td>" + response.employee.lastName + "</td>" +
                "<td>" + response.employee.dailyWorkRate + "</td>" +
                "<td>" + response.employee.numberOfDaysWorked + "</td>" +
                "<td>" + response.employee.position +"</td>" +
                "<td>" + response.employee.salary +"</td>" +
                "</tr>";
        }
    })
}

function setEmployees() {
    httpRequest({
        url: '/api/lab4/employees',
        method: 'GET',
        responseType: 'json'
    }).then(response => {
        let tbody = document.querySelector("#exe1 tbody");
        tbody.innerHTML = '';
        response.forEach(employee => {
            tbody.innerHTML += "<tr><td>" + employee.name + "</td>" +
                "<td>" + employee.lastName + "</td>" +
                "<td>" + employee.dailyWorkRate + "</td>" +
                "<td>" + employee.numberOfDaysWorked + "</td>" +
                "<td>" + employee.position +"</td>" +
                "<td>" + employee.salary + "</td>" +
                "</tr>";
        });
    });
}