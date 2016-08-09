var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/activity', require('./userActivity/activityRoutes'));
router.use('/progress', require('./userPromoProgress/progressRoutes'));

module.exports = router;