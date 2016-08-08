var router = require('express').Router();
var client = require('../middleware/customMiddleware');

router.use('/clients', require('./client/clientRoutes'));

module.exports = router;