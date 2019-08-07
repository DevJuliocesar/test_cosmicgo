const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

// ================================================
// Obtener todos los usuarios
// ================================================

const getUsers = (request, response) => {
    pool.query('SELECT * FROM account', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// ================================================
// Login Validate
// ================================================

const validate = (request, response) => {
    return new Promise((resolve, reject) => {
        const { email, password } = request.body;
        return pool.query('SELECT count(*) conteo FROM account WHERE email = $1 AND password = $2', [email, password], (error, results) => {
            if (error) {
                reject('error al validar', error);
                throw error;
            }
            resolve(results.rows[0].conteo);
        });
    });
};

module.exports = {
    getUsers,
    validate
};