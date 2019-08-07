var express = require('express');

var app = express();

app.get('/', (req, res, next) => res.render('pages/index'));

module.exports = app;
