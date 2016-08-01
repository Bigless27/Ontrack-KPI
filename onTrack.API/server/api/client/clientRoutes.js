var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./clientController');
var auth = require('../../auth/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
  .get(controller.get) // Tested
  .post(checkUser, controller.post) // Tested

router.route('/:id')
  .get(controller.getOne)// Tested
  .put(checkUser, controller.put)// Tested
  .delete(checkUser,controller.delete)// Tested

module.exports = router;
