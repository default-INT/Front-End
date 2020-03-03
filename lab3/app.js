"use strict";

const express = require("express");
const lab2 = require("./src/lab2");
const lab3 = require("./src/lab3");

const app = express();
const labsRouter = express.Router();
const apiRouter = express.Router();
const expressHbs = require("express-handlebars");

const hbs = require("hbs");
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