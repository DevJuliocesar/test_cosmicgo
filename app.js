/**
 *  Librerias iniciales
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**
 *  Socket inicializado 
 */
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 *  CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/**
 *  Assets publicos
 */
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

/**
 *  Lectura de application/x-www-form-urlencoded 
 */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/**
 *  Lectura de application/json 
 */
app.use(bodyParser.json());

/** 
 * Primera emisión del servicio Socket.io 
 */
io.on('connection', function (socket) {
  socket.emit('other', { esto: 'desde el backend' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

/* Envío de la conexion del Socket */
app.use(function (req, res, next) {
  req.io = io;
  next();
});

/** 
 * Importar rutas 
 */
let appRoutes = require('./routes/app');
let userRoutes = require('./routes/user');
let loginRoutes = require('./routes/login');

/** 
 * Rutas 
 */
app.use('/', appRoutes);
app.use('/usuario', userRoutes);
app.use('/login', loginRoutes);

/**
 * Asignación del puerto
 */
server.listen(process.env.PORT || 5000, () => {
  console.log(`Express server puerto ${process.env.PORT || 5000} online`);
});
