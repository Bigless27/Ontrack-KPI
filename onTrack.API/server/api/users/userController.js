var User = require('./userModel');
var _ = require('lodash');
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
var signToken = require('../../auth/auth').signToken;
var customizer = require('../updateCustomizer')

exports.params = function(req, res, next, id) {
	User.findById(id)
    .populate('progress')
    .populate('userProgress')
    .select('-password') // doesn't grab it
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

exports.findUsers = function(req, res, next) {
  var arr = []
  var id = req.params.teamId

  arr.push(id)
  User.find({
    'teamId': {$in: arr}
  })
    .limit(90)
    .populate('progress')
    .populate('settingProgress')
    .exec(function(err, docs) {
      if (err) next(err)
      res.json(docs)
    })
}

exports.get = function(req, res, next) {
	User.find({})
    .populate('progress')
    .select('-password')
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

exports.updateRefs = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  user.progress = update.progress.map(x => typeof x === 'string' ? new ObjectId(x) : x)

  user.save(function(err, saved) {
    if(err) {
      next(err);
    } else {
      res.json(saved)
    }
  })
}


exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.mergeWith(user, update, customizer.custom);


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
      res.json(req.loggedIn);
    }
  });
};

exports.me = function(req, res) {
   res.json(req.user.toJson());
};