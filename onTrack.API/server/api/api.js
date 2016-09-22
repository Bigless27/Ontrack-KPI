var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/users', require('./users/userRoutes'));
router.use('/settings', require('./main-settings/settingsRoutes'))


module.exports = router;
