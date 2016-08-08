var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/userActivity', require('./userActivity/activityRoutes'));
router.use('/userPromoProgress', require('./userPromoProgress/progressRoutes'));

module.exports = router;