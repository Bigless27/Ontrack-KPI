var Client = require('./clientModel');
var mongoose = require('mongoose')
var _ = require('lodash');



exports.params = function(req, res, next, id) {
  Client.findById(id)
    .populate('owner')
    .populate('kpis')
    .populate('users')
    .populate('promotions')
    .exec(function(err, client) {
      if(err) return next(err);
      req.client = client;
      next()
    })
};

exports.get = function(req, res, next) {
	Client.find({})
		.then(function(client){
			res.json(client);
		}, function(err) {
			next(err);
	})
}

exports.getOne = function(req, res, next) {
	var client = req.client;
	res.json(client)
}

exports.removeAdmin = function(req, res, next) {
  var client = req.client

  var update = req.body

  var i = client.admins.length

  var updatedClient = removeAdminsUsers('admins', client, update)

  updatedClient.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.removeUsersClient = function(req, res, next) {
  var client = req.client

  var update = req.body

  var i = client.users.length

  var updatedClient = removeAdminsUsers('users', client, update)

  updatedClient.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

function removeAdminsUsers(param, client, update) {
  var i = client[param].length

  while(i--){
    var ad = client[param][i]
    if (ad.email.toString() === update.email.toString()){
      ad.remove()
    }
  }

  return client
}


exports.put = function(req, res, next) {
  // if (!req.client.checkAdmin(req.user)){
  //   next(new Error('Not authorized!!'));
  //   return;
  // }
  console.log('ji')
  var client = req.client;

  var update = req.body;


  _.mergeWith(client, update, customizer);

  client.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newclient = req.body;
  newclient.owner = req.user
  newclient.admins.push(req.user)
  newclient.users.push(req.user)

  Client.create(newclient)
    .then(function(client) {
      res.json(client);
    }, function(err) {
      next(err);
    });

};


exports.delete = function(req, res, next) {
  

  // // input user id here: the use of this application would 
  // // need to know to attach the current users id to req.user
  // if (!req.client.checkAdmin(req.user)){
  //   next(new Error('Not authorized!!'));
  //   return;
  // }

  req.client.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.findClients = function(req, res, next) {
  var email  = req.params.email

  Client.find({'admins.email' : email}, function(err, clients) {
    if (err) next(err)
    res.json(clients)
  })


}

function customizer(objValue, srcValue){
  if(Array.isArray(objValue)){
    if(objValue.length > srcValue.length){
      return objValue = srcValue
    }
  }
}












