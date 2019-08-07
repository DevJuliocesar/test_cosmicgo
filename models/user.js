/** Iniciación de DB */
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// ================================================
// Obtener todos los usuarios
// ================================================

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// ================================================
// Obtener un usuario
// ================================================

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// ================================================
// Crear un nuevo usuario
// ================================================

const createUser = (request, response) => {
  const { name, email, phone, birthday, status } = request.body;

  pool.query(
    'INSERT INTO users (name, email, phone, birthday, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, phone, birthday, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      let ID = '';
      results.rows.forEach(res => {
        ID = res.id;
        request.io.sockets.emit('status', { [ID]: status });
      });
      response
        .status(201)
        .send(`Usuario agregado exitosamente, con ID: ${ID}`);
    }
  );
};

// ================================================
// Actualizar usuario
// ================================================

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { id, name, email, phone, birthday, status } = request.body;

  pool.query(
    'UPDATE users SET name = $2, email = $3, phone = $4, birthday = $5, status = $6 WHERE id = $1',
    [id, name, email, phone, birthday, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Usuario modificado con el ID: ${id}`);
    }
  );
};

// ================================================
// Borrar un usuario
// ================================================

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Usuario eliminado con el ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
