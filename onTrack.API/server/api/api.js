var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/users', require('./users/userRoutes'));
router.use('/settings', require('./type-settings/settingsRoutes'))


module.exports = router;
