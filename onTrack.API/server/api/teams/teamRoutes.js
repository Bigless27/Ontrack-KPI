var router = require('express').Router();
var controller = require('./teamController');
var auth = require('../../auth/auth')
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get) // Tested
  .post(checkUser, controller.post) // Tested

router.route('/findTeams/:email')
	.get(controller.findTeams)

router.route('/:id/removeAdmin')
	.put(checkUser, controller.removeAdmin)

router.route('/:id/removeUser')
	.put(checkUser, controller.removeUsersTeam)

router.route('/:id')
  .get(controller.getOne)// Tested
  .put(checkUser,controller.put)// Tested
  .delete(controller.delete)// Tested

module.exports = router;
