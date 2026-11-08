const Autor = require('../models/autor.model');
const Post = require('../models/post.model');

const isValidEmail = (e) => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const getAll = async (req, res) => {
  try {
    res.json(await Autor.getAll());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const autor = await Autor.getById(req.params.autorId);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, email, imagen } = req.body;
    if (!nombre || !String(nombre).trim()) {
      return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'El campo "email" es obligatorio y debe ser válido' });
    }
    if (await Autor.getByEmail(email)) {
      return res.status(409).json({ error: 'Ya existe un autor con ese email' });
    }
    const nuevo = await Autor.create({ nombre: nombre.trim(), email, imagen });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criterio 6: posts de un autor concreto
const getPostsByAutor = async (req, res) => {
  try {
    const autor = await Autor.getById(req.params.autorId);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    const posts = await Post.getByAutor(autor.id);
    res.json({ autor, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, getPostsByAutor };