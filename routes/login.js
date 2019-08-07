const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mdAuth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

const private_key = fs.readFileSync('./keys/private.key', 'utf8');

const app = express();

const _account = require('../models/account');

var signOptions = {
  issuer: 'DevJulioCesar',
  subject: 'jcmaldonadom@ufpso.edu.co',
  audience: 'devjuliocesar.com',
  expiresIn: '24h',
  algorithm: 'RS256'
};

/**
 * ================================================
 * Consultar Usuarios de logueo
 * ================================================
 */
app.get('/', mdAuth.verificarToken, (req, res) => {
  try {
    _account.getUsers(req, res);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
})

/**
 * ================================================
 * Inicio de Sesión
 * ================================================
 */
app.post('/', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  _account.validate(req, res).then((data) => {
    if (data > 0) {

      const token = jwt.sign(
        { usuario: req.body.email },
        private_key,
        signOptions
      );

      res.status(200).json({
        ok: true,
        usuario: req.body.email,
        token: token
      });

    } else {
      res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectos'
      });
    }
  });
});

module.exports = app;
