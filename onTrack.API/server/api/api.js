var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/activity', require('./userActivity/activityRoutes'));
router.use('/progress', require('./userPromoProgress/progressRoutes'));
router.use('/triggers', require('./trigger/triggerRoutes'));

module.exports = router;