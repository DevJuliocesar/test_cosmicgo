var express = require('express');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var app = express();

app.get('/', (req, res, next) => res.render('pages/index'));

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const results = { results: result ? result.rows : null };
    res.render('pages/db', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

module.exports = app;
