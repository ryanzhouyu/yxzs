const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const ctrl = require('../controllers/marketingController');

const router = Router();

router.get('/analysis', requireAuth, asyncHandler(ctrl.getAnalysis));
router.get('/strategies', requireAuth, asyncHandler(ctrl.getStrategies));
router.get('/hot-topics', requireAuth, asyncHandler(ctrl.getHotTopics));
router.get('/calendar', requireAuth, asyncHandler(ctrl.getCalendar));
router.get('/publish-suggestions', requireAuth, asyncHandler(ctrl.getPublishSuggestions));
router.get('/reports', requireAuth, asyncHandler(ctrl.getReports));
router.post('/reports', requireAuth, validate(['title']), asyncHandler(ctrl.createReport));

module.exports = router;
