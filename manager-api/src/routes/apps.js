const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/appController');

const router = Router();

router.get('/', asyncHandler(ctrl.list));
router.get('/recent', requireAuth, asyncHandler(ctrl.recent));

module.exports = router;
