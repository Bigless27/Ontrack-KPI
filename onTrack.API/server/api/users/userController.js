var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
	User.findById(id)
		.select('-password') // doesn't grab it
    .populate('progress')
    .populate('settingProgress')
		.exec()
		.then(function(user) {
			if (!user) {
				next(new Error('No user with that id'));
			} else {
				req.user = user;
				next();
			}
		}, function(err) {
			next(err);
	});
};


exports.get = function(req, res, next) {
	User.find({})
		.select('-password')
    .populate('progress')
		.exec()
		.then(function(users){
			res.json(users)
		}, function(err) {
			next(err);
	})
}



exports.getOne = function(req, res, next) {
	var user = req.user.toJson();
	res.json(user);
};


exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.mergeWith(user, update, customizer);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  })
};

exports.post = function(req, res, next) {
  if (!req.body.email || !req.body.password) {
	    return res.sendStatus(400).send("You must send the email and the password");
	 }

  var newUser = new User(req.body);

  newUser.save(function(err, user) {
    if(err) return next(err)
    var token = signToken(user._id);
    res.json({token: token});
  }, function(err) {
  	console.log(err)
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

exports.me = function(req, res) {
   res.json(req.user.toJson());
};


function customizer(objValue, srcValue){
  if(Array.isArray(objValue)){
    if(objValue.length > srcValue.length){
      return objValue = srcValue
    }
  }
}




