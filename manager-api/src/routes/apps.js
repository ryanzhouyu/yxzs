const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const ctrl = require('../controllers/appController');

const router = Router();

router.get('/', asyncHandler(ctrl.list));
router.get('/recent', asyncHandler(ctrl.recent));

module.exports = router;
