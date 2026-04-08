const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const ctrl = require('../controllers/hotspotController');

const router = Router();

router.get('/', asyncHandler(ctrl.getAll));

module.exports = router;
