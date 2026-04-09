const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/authController');

const router = Router();

const authValidationRules = {
  username: { minLength: 3, maxLength: 50, pattern: /^[a-zA-Z0-9_]+$/ },
  password: { minLength: 6, maxLength: 100 },
};

router.post('/register', validate(['username', 'password'], {
  ...authValidationRules,
  nickname: { maxLength: 100 },
  hotel_name: { maxLength: 200 },
}), asyncHandler(ctrl.register));
router.post('/login', validate(['username', 'password'], authValidationRules), asyncHandler(ctrl.login));
router.get('/me', requireAuth, asyncHandler(ctrl.me));

module.exports = router;
