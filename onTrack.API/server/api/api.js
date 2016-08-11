var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/activity', require('./userActivity/activityRoutes'));
router.use('/progress', require('./userPromoProgress/progressRoutes'));
router.use('/kpis', require('./kpi/kpiRoutes'));

module.exports = router;