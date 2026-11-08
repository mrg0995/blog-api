const router = require('express').Router();

router.use('/posts', require('./posts.routes'));
router.use('/autores', require('./autores.routes'));

module.exports = router;