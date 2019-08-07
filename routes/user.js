const express = require('express');

// var bcrypt = require('bcryptjs');

var mdAuth = require('../middlewares/auth');

const app = express();

const _user = require('../models/user');

const { check, validationResult } = require('express-validator');

// ================================================
// Obtener todos los usuarios
// ================================================

app.get('/', (req, res, next) => {
  try {
    _user.getUsers(req, res);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// ================================================
// Obtener un usuario
// ================================================

app.get('/', (req, res, next) => {
  try {
    _user.getUserById(req, res);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// ================================================
// Actualizar usuario
// ================================================

app.put(
  '/:id',
  [
    check('email').isEmail(),
    check('name').isLength({ max: 50 }),
    check('phone').isLength({ min: 7 }),
    check('status').isBoolean(),
    check('birthday')
      .isISO8601()
      .toDate()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      _user.updateUser(req, res);
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  }
);

// ================================================
// Crear un nuevo usuario
// ================================================

app.post(
  '/',
  [
    check('email').isEmail(),
    check('name').isLength({ max: 50 }),
    check('phone').isLength({ min: 7 }),
    check('status').isBoolean(),
    check('birthday')
      .isISO8601()
      .toDate()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      _user.createUser(req, res);
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  }
);

// ================================================
// Borrar un usuario
// ================================================

app.delete('/:id', (req, res) => {
  try {
    _user.deleteUser(req, res);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

module.exports = app;
