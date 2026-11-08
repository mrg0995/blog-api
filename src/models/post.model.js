const pool = require('../config/db');

const BASE_QUERY = `
  SELECT
    p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
    a.id AS autor_id, a.nombre AS autor_nombre,
    a.email AS autor_email, a.imagen AS autor_imagen
  FROM posts p
  INNER JOIN autores a ON a.id = p.autor_id
`;

const format = (r) => ({
  id: r.id,
  titulo: r.titulo,
  descripcion: r.descripcion,
  fecha_creacion: r.fecha_creacion,
  categoria: r.categoria,
  autor: {
    id: r.autor_id,
    nombre: r.autor_nombre,
    email: r.autor_email,
    imagen: r.autor_imagen
  }
});

const getAll = async () => {
  const [rows] = await pool.query(`${BASE_QUERY} ORDER BY p.fecha_creacion DESC, p.id DESC`);
  return rows.map(format);
};

const getById = async (id) => {
  const [rows] = await pool.query(`${BASE_QUERY} WHERE p.id = ?`, [id]);
  return rows.length ? format(rows[0]) : null;
};

const getByAutor = async (autorId) => {
  const [rows] = await pool.query(
    `${BASE_QUERY} WHERE p.autor_id = ? ORDER BY p.fecha_creacion DESC, p.id DESC`,
    [autorId]
  );
  return rows.map(format);
};

const create = async ({ titulo, descripcion, categoria, autor_id }) => {
  const [result] = await pool.query(
    'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
    [titulo, descripcion, categoria, autor_id]
  );
  return getById(result.insertId);
};

module.exports = { getAll, getById, getByAutor, create };