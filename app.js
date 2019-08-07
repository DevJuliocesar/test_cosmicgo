const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

/* assets */
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

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
let userRoutes = require('./routes/user');

/* Rutas */
app.use('/', appRoutes);
app.use('/usuario', userRoutes);

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});

server.listen(PORT, () => {
  console.log(`Express server puerto ${PORT} online`);
});
