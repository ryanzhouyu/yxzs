const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/authController');

const router = Router();

router.post('/register', validate(['username', 'password']), asyncHandler(ctrl.register));
router.post('/login', validate(['username', 'password']), asyncHandler(ctrl.login));
router.get('/me', requireAuth, asyncHandler(ctrl.me));

module.exports = router;
