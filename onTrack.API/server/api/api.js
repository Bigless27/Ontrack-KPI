var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
// router.use('/triggers', require('./trigger/triggerRoutes'))
router.use('/clients', require('./client/clientRoutes'));

module.exports = router;