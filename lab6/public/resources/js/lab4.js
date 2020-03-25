"use strict";

setEmployees();

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
            setEmployees();
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
        response.forEach((employee, index) => {
            tbody.innerHTML += "<tr id='empl" + index +"'><td class='name'>" + employee.name + "</td>" +
                "<td class='lastName'>" + employee.lastName + "</td>" +
                "<td class='dailyWorkRate'>" + employee.dailyWorkRate + "</td>" +
                "<td class='numberOfDaysWorked'>" + employee.numberOfDaysWorked + "</td>" +
                "<td class='position'>" + employee.position +"</td>" +
                "<td class='salary'>" + employee.salary + "</td>" +
                "<td><button onclick='editEmployee("+ index + ")'>Редактировать</button></td>" +
                "<td><button onclick='deleteEmployee("+ index + ")'>Удалить</button></td>" +
                "</tr>";
        });
    });
}

function deleteEmployee(index) {
    fetch('/api/lab6/employees', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            index
        })
    }).then(response => response.json())
        .then(result => setEmployees());
}

function editEmployee(index) {
    document.getElementById('addBtn').style.display = 'none';
    document.getElementById('editBtn').style.display = '';
    document.getElementById('changeBtn').style.display = '';

    let nameEntry = document.querySelector('#exe1 input[name="name"]');
    let fullNameEntry = document.querySelector('#exe1 input[name="fullName"]');
    let dailyWorkRateEntry = document.querySelector('#exe1 input[name="dailyWorkRate"]');
    let numberOfDaysWorkedEntry = document.querySelector('#exe1 input[name="numberOfDaysWorked"]');
    let positionSelector = document.querySelector('#exe1 select');

    let selectName = document.querySelector('#empl' + index + ' .name');
    let selectFullName = document.querySelector('#empl' + index + ' .lastName');
    let selectDailyWorkRate  = document.querySelector('#empl' + index + ' .dailyWorkRate ');
    let selectNumberOfDaysWorked = document.querySelector('#empl' + index + ' .numberOfDaysWorked ');
    // let selectPosition = document.querySelector('#empl' + index + ' .position ');

    nameEntry.value = selectName.innerHTML;
    fullNameEntry.value = selectFullName.innerHTML;
    dailyWorkRateEntry.value = selectDailyWorkRate.innerHTML;
    numberOfDaysWorkedEntry.value = selectNumberOfDaysWorked.innerHTML;

    document.getElementById('editBtn').onclick = () => {
        fetch('/api/lab6/employees', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                index: index,
                name: nameEntry.value,
                fullName: fullNameEntry.value,
                dailyWorkRate: dailyWorkRateEntry.value,
                numberOfDaysWorked: numberOfDaysWorkedEntry.value,
                position: positionSelector.value
            })
        }).then(response => setEmployees())
    }
    // dailyWorkRate
}

function changeClick() {
    document.getElementById('addBtn').style.display = '';
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('changeBtn').style.display = 'none';
}