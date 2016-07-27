var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/kpi', require('./kpi/kpiRoutes'))
router.use('/clients', require('./client/clientRoutes'));

module.exports = router;