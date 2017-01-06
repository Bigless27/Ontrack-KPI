var Team = require('./teamModel');
var User = require('../users/userModel')
var mongoose = require('mongoose')
var _ = require('lodash');
var customizer = require('../updateCustomizer')

exports.params = function(req, res, next, id) {
  Team.findById(id)
    .populate('owner')
    .populate('users')
    .populate('promotions')
    .exec(function(err, team) {
      if(err) return next(err);
      req.team = team;
      next()
    })
};

exports.get = function(req, res, next) {
	Team.find({})
		.then(function(team){
			res.json(team);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {
	var team = req.team;
	res.json(team)
}

exports.removeAdmin = function(req, res, next) {
  var team = req.team

  var update = req.body

  var i = team.admins.length

  var updatedTeam = removeAdminsUsers('admins', team, update)

  updatedTeam.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.removePromotion = function(req, res, next) {
  var team = req.team

  var update = req.body

  var i = team.promotions.length

  var updatedTeam = removePromotion(team, update)

  updatedTeam.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.removeUsersTeam = function(req, res, next) {
  var team = req.team

  var update = req.body

  var i = team.users.length
  var teamCopy = _.cloneDeep(team)


  var updatedTeam = removeAdminsUsers('users', team, update)
 

  var updatedTeamUserEmails = updatedTeam.users.map(x => x.email)

  var userToUpdate = teamCopy.users.filter(function(user) {
    return !updatedTeamUserEmails.includes(user.email.toString())
  })

  //find comes back in an array. Look to use find one in future maybe
  User.find({'email': userToUpdate[0].email}, function(err, user) {
    if(err) next(err)
    var i = user[0].teamId.indexOf(team._id)
    user[0].teamId.splice(i, 1)

    user[0].save(function(err, saved) {
      if (err) {
        next(err)
      }
    })

  }, function(err) {
    next(err)
  })

  updatedTeam.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

function removePromotion(team, update) {
  var i = team.promotions.length

  while(i--){
    var ad = team.promotions[i]
    if (ad.promoId.toString() === update.promoId.toString()){
      ad.remove()
    }
  }
}

function removeAdminsUsers(param, team, update) {
  var i = team[param].length

  while(i--){
    var ad = team[param][i]
    if (ad.email.toString() === update.email.toString()){
      ad.remove()
    }
  }

  return team
}


exports.put = function(req, res, next) {
  // if (!req.team.checkAdmin(req.user)){
  //   next(new Error('Not authorized!!'));
  //   return;
  // }
  var team = req.team;

  var update = req.body;


  _.mergeWith(team, update, customizer.custom);

  team.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newteam = req.body;
  newteam.owner = req.user
  newteam.admins.push(req.user)
  newteam.users.push(req.user)

  Team.create(newteam)
    .then(function(team) {
      res.json(team);
    }, function(err) {
      next(err);
    });

};


exports.delete = function(req, res, next) {
  

  // // input user id here: the use of this application would 
  // // need to know to attach the current users id to req.user
  // if (!req.team.checkAdmin(req.user)){
  //   next(new Error('Not authorized!!'));
  //   return;
  // }

  req.team.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.findTeams = function(req, res, next) {
  var email  = req.params.email

  Team.find({'admins.email' : email}, function(err, teams) {
    if (err) next(err)
    res.json(teams)
  })


}
