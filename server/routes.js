const router = require('express').Router();
const controller = require('./controller.js')

router.get('/', controller.getAll);
router.get('/:sequenceName', controller.getOne);
router.post('/', controller.post);

module.exports = router;