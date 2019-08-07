var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/* parse application/x-www-form-urlencoded */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/* parse application/json */
app.use(bodyParser.json());

/* Importar rutas */
let appRoutes = require('./routes/app');

/* Rutas */
app.use('/', appRoutes);

app.listen(5000, () => {
  console.log('Express server puerto 5000 online');
});
