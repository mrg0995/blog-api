const router = require('express').Router();
const ctrl = require('../controllers/posts.controller');

router.get('/', ctrl.getAll);
router.get('/:postId', ctrl.getById);
router.post('/', ctrl.create);

module.exports = router;