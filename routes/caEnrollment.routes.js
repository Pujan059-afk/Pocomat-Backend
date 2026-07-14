const router = require('express').Router();
const controller = require('../controllers/caEnrollment.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/accept', controller.accept);
router.put('/:id/reject', controller.reject);
router.delete('/:id', controller.remove);

module.exports = router;
