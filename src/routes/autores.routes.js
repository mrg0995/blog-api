const router = require('express').Router();
const ctrl = require('../controllers/autores.controller');

router.get('/', ctrl.getAll);
router.get('/:autorId', ctrl.getById);
router.get('/:autorId/posts', ctrl.getPostsByAutor);
router.post('/', ctrl.create);

module.exports = router;