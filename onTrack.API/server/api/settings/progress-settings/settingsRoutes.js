var router = require('express').Router({mergeParams: true});
var controller = require('./settingsController');
var client = require('../../../middleware/customMiddleware')


//changed from setting id
router.param('id', controller.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:settingsProgressId')
	.get(controller.getOne)
	.put(client.getClient(), controller.put)
	.delete(controller.delete)

module.exports = router;