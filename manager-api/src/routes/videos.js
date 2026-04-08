const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const ctrl = require('../controllers/videoController');

const router = Router();

router.get('/', optionalAuth, asyncHandler(ctrl.list));
router.get('/:slug', optionalAuth, asyncHandler(ctrl.getBySlug));
router.get('/:slug/topics', asyncHandler(ctrl.getTopics));
router.post('/:slug/like', requireAuth, asyncHandler(ctrl.toggleLike));

module.exports = router;
