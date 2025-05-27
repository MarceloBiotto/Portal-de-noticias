var express = require('express');
var consign = require('consign');
var bodyPaser= require('body-parser');
var expressValidatator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyPaser.urlencoded({extended: true}));
app.use(expressValidatator());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(app);

module.exports = app;