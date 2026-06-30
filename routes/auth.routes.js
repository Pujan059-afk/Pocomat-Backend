const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/send-otp', controller.sendOtp);
router.post('/verify-otp', controller.verifyOtp);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', auth, controller.getMe);
router.get('/admins', auth, controller.listAdmins);
router.post('/admins', auth, controller.addAdmin);
router.delete('/admins/:id', auth, controller.removeAdmin);

module.exports = router;
