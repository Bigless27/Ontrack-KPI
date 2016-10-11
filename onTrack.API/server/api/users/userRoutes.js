var router = require('express').Router();
var controller = require('./userController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params); // tested
router.get('/me', checkUser, controller.me);

//nested routes not in use anymore
	router.use('/:id/activity', require('./activity/activityRoutes'));
	router.use('/:id/progress', require('./progress/progressRoutes'))
//


router.route('/')
  .get(controller.get)// tested
  .post(controller.post)// tested

router.route('/:id')
  .get(controller.getOne)// tested
  .put(controller.put)// tested
  .delete(controller.delete)// tested

module.exports = router;
