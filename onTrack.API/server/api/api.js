var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/kpi', require('./kpi/kpiRoutes'));
router.use('/triggers', require('./trigger/triggerRoutes'))
router.use('/clients', require('./client/clientRoutes'));
router.use('/user-activity', require('./user/userActivity/userActivityRoutes'))

module.exports = router;