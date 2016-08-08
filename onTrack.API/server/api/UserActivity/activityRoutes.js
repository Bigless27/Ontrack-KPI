var router = require('express').Router({mergeParams: true});
var controller = require('./activityController');

router.param('id', controler.params);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)


module.exports = router;