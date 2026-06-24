const router = require('express').Router();
const controller = require('../controllers/caContact.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id/read', controller.markRead);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
