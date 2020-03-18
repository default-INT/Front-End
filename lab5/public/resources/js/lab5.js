"use strict";

let student;

if (!!document.querySelector('#title #lab5')) {
    getStudentInfo();
}

function getStudentInfo() {
    httpRequest({
        url: '/api/lab5/student-info',
        method: 'GET',
        responseType: 'json'
    }).then(studentInfo => {
        let disciplinesSelector = document.getElementById('disciplines');
        let fullName = document.getElementById('fullName');
        let faculty = document.getElementById('faculty');
        let specialty = document.getElementById('specialty');

        fullName.innerHTML = studentInfo.fullName;
        faculty.innerHTML = studentInfo.faculty;
        specialty.innerHTML = studentInfo.specialty;

        disciplinesSelector.innerHTML = '';
        studentInfo.disciplines.forEach(discipline => {
            disciplinesSelector.appendChild(node({
                tag: 'option',
                content: discipline.name
            }));
        });
        student = studentInfo;
        selectDiscipline();
    }).catch(reject => console.log(reject));
}

function selectDiscipline() {
    let disciplinesSelector = document.getElementById('disciplines');
    student.disciplines.forEach(discipline => {
        if (discipline.name === disciplinesSelector.value) {
            let tableBody = document.querySelector('.student-table tbody');
            tableBody.innerHTML = '';
            discipline.labs.forEach(lab => {
                tableBody.innerHTML += "<tr>" +
                    "<td>" + lab.name + "</td>" +
                    "<td>" + dateFormat(new Date(lab.date)) + "</td>" +
                    "<td>" + (!lab.mark ? "Не оценено" : lab.mark) + "</td>" +
                    "</tr>"
            });
        }
    });
}

function getLabOnDate() {
    let labDate = document.getElementById('labDate');
    let checker = false;

    let table = getLabsTable();
    let tbody = node({
        tag: 'tbody'
    });
    student.disciplines.forEach(discipline => {
        discipline.labs.forEach(lab => {
            if (labDate.value === lab.date && !lab.mark) {
                checker = true;
                let tr = node({
                    tag: 'tr',
                    childNodes: [
                        node({
                            tag: 'td',
                            content: discipline.name
                        }),
                        node({
                            tag: 'td',
                            content: lab.name
                        })
                    ]
                });
                tbody.appendChild(tr);
            }
        });
    });
    let out = document.querySelector('#exe1 .out');
    if (!checker) out.innerHTML = "В выбранную дату нет не сданных лабораторных работ.";
    else {
        table.appendChild(tbody);
        out.innerHTML = '';
        out.appendChild(table);
    }

}

function getLabsTable() {
    let table = node({
        tag: 'table',
        classList: 'student-table',
        childNodes: node({
            tag: 'thead',
            childNodes: node({
                tag: 'tr',
                childNodes: [
                    node({
                        tag: 'td',
                        content: 'Предмет'
                    }),
                    node({
                        tag: 'td',
                        content: 'Тема лабаратоной работы'
                    })
                ]
            })
        })
    });
    return table;
}