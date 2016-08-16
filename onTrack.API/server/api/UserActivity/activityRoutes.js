var router = require('express').Router();
var controller = require('./activityController');
var mock = require('../../middleware/customMiddleware');
var algorithm = require('../algorithm')



router.param('id', controller.params);

router.route('/')
	.get(controller.get)
	.post(mock.mockUser(), controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)


module.exports = router;