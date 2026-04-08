const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/creationController');

const router = Router();

router.get('/calendar', requireAuth, asyncHandler(ctrl.getCalendar));
router.get('/inspirations', requireAuth, asyncHandler(ctrl.getInspirations));
router.post('/inspirations', requireAuth, asyncHandler(ctrl.saveInspiration));
router.get('/works', requireAuth, asyncHandler(ctrl.getWorks));

module.exports = router;
