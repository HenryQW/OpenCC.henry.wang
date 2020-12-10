var express = require("express");

var router = require("./route");

var app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use("/", router);

module.exports = app;
