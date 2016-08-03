var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params); // tested
router.get('/me', checkUser, controller.me);

//nested routes
router.use('/:id/settings', require('./settings/settingsRoutes'));
router.use('/:id/activity', require('./activity/activityRoutes'));
//


router.route('/')
  .get(controller.get)// tested
  .post(controller.post)// tested

router.route('/:id')
  .get(controller.getOne)// tested
  .put(checkUser, controller.put)// tested
  .delete(checkUser, controller.delete)// tested

module.exports = router;


