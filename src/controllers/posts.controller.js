const Post = require('../models/post.model');
const Autor = require('../models/autor.model');

const getAll = async (req, res) => {
  try {
    res.json(await Post.getAll());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.getById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, autor_id } = req.body;
    const faltan = ['titulo', 'descripcion', 'categoria', 'autor_id']
      .filter((c) => req.body[c] === undefined || String(req.body[c]).trim() === '');
    if (faltan.length) {
      return res.status(400).json({ error: `Campos obligatorios: ${faltan.join(', ')}` });
    }
    const autor = await Autor.getById(autor_id);
    if (!autor) return res.status(400).json({ error: 'El autor indicado no existe' });

    const nuevo = await Post.create({ titulo, descripcion, categoria, autor_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create };