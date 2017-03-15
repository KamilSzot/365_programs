"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send("Hi from server!!!");
});
app.listen(8181, function () {
    console.log("Server listens on port 8181");
});
