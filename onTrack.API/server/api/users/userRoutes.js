var router = require('express').Router();
var controller = require('./userController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params); // tested
router.get('/me', checkUser, controller.me);

//nested routes not in use anymore
	router.use('/:id/progress', require('./progress/progressRoutes'))
//

router.route('/findUsers/:teamId')
	.get(controller.findUsers)

router.route('/')
  .get(controller.get)// tested
  .post(controller.post)// tested

router.route('/:userId/updateRefs')
	.put(controller.updateRefs)

router.route('/:id')
  .get(controller.getOne)// tested
  .put(controller.put)// tested
  .delete(checkUser, auth.deleteLoggedIn(), controller.delete)// tested

module.exports = router;
