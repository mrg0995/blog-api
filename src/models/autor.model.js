const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM autores');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

const getByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM autores WHERE email = ?', [email]);
  return rows.length ? rows[0] : null;
};

const create = async ({ nombre, email, imagen }) => {
  const [result] = await pool.query(
    'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
    [nombre, email, imagen || null]
  );
  return getById(result.insertId);
};

module.exports = { getAll, getById, getByEmail, create };