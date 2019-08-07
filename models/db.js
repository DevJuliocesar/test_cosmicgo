const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      USERS (
          ID SERIAL PRIMARY KEY, 
          NAME VARCHAR(50) NOT NULL, 
          EMAIL VARCHAR(50) NOT NULL, 
          PHONE VARCHAR(15), 
          BIRTHDAY DATE, 
          STATUS BOOL
        )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');
