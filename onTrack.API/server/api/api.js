var router = require('express').Router();

router.use('/clients', require('./client/clientRoutes'));
router.use('/users', require('./users/userRoutes'));


module.exports = router;
