var express = require('express');

// var bcrypt = require('bcryptjs');

// var mdAuth = require('../middlewares/auth');

var app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// var Usuario = require('../models/user');

// ================================================
// Obtener todos los usuarios
// ================================================

app.get('/', async (req, res, next) => {
  //   var skip = Number(req.query.skip) || 0;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const results = result ? result.rows : null;
    res.status(200).json({
      ok: true,
      usuarios: results,
      total: Object.keys(results).length
    });
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// ================================================
// Actualizar usuario
// ================================================

// app.put('/:id', mdAuth.verificarToken, (req, res) => {
//   var id = req.params.id;
//   var body = req.body;
// });

// ================================================
// Crear un nuevo usuario
// ================================================

// app.post('/', (req, res) => {
//   const body = req.body;
// });

// ================================================
// Borrar un usuario
// ================================================

// app.delete('/:id', mdAuth.verificarToken, (req, res) => {
//   var id = req.params.id;
// });

module.exports = app;
