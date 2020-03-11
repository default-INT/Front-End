"use strict";

//import * as employeeService from './src/logics/employees-service';

const express = require("express");
const lab2 = require("./src/lab2");
const lab3 = require("./src/lab3");
const employeeService = require("./src/logics/employees-service");

const app = express();
const labsRouter = express.Router();
const apiRouter = express.Router();
const expressHbs = require("express-handlebars");

const hbs = require("hbs");
const {Plasterer} = require("./src/entities/employees");
const {Painter} = require("./src/entities/employees");
const jsonParser = express.json();

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

apiRouter.get("/str-generate", (req, res) => {
    res.send(lab2.strGenerate(10));
});
apiRouter.put("/div-count-3-array", jsonParser,(req, res) => {
    if(!req.body.array) return res.sendStatus(400);

    let array = req.body.array;

    res.json(lab2.analyticArray(array));
});

apiRouter.put("/lab3/exe1", jsonParser, (req, res) => {
    if(!req.body.s && !req.body.p) return res.sendStatus(400);

    res.json({
        array: lab3.arrayGenerator(req.body.s, req.body.p)
    });
});
apiRouter.put("/lab3/exe2", jsonParser, (req, res) => {
    if(!req.body.names) return res.sendStatus(400);

    let array = req.body.names;

    res.json(lab3.getHuman(array));
});

apiRouter.get("/lab4/employees/:id", (req, res) => {
    let service = employeeService.EmployeesService.instance;
    res.json(service.getEmployee(parseInt(req.params.id)));
});

apiRouter.post("/lab4/employees", jsonParser, (req, res) => {
    let service = employeeService.EmployeesService.instance;
    if (req.body.position === 'painter') {
        res.json(service.addEmployee(new Painter(
            req.body.name,
            req.body.fullName,
            req.body.dailyWorkRate,
            req.body.numberOfDaysWorked
        )));
    } else if (req.body.position === 'plasterer') {
        res.json(service.addEmployee(new Plasterer(
            req.body.name,
            req.body.fullName,
            req.body.dailyWorkRate,
            req.body.numberOfDaysWorked
        )));
    }
});

apiRouter.get("/lab4/employees", (req, res) => {
    let service = employeeService.EmployeesService.instance;
    res.json(service.getEmployees());
});

labsRouter.use("/:id", (req, res) => {
    res.render("lab" + req.params["id"] + ".hbs");
});
labsRouter.use("/", (req, res) => {
    res.redirect("/")
});

app.use("/labs", labsRouter);
app.use("/api", apiRouter);

app.use("/", (req, res) => {
    res.render("main.hbs");
});

app.listen(3000);
console.log("Server start");