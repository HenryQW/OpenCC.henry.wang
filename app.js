var express = require("express");

var router = require("./route");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

module.exports = app;
