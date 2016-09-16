var Client = require('./clientModel');
var mongoose = require('mongoose')
var _ = require('lodash');


exports.params = function(req, res, next, id) {
  Client.findById(id)
    .populate('owner')
    .populate('kpis')
    .populate('users')
    .populate('promotions')
    .populate('settings')
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

exports.updateAdmin = function(req, res, next) {
  var client = req.client

  var update = req.body

  var i = client.admins.length


  while(i--){
    var ad = client.admins[i]
    if(ad._id.toString() === update._id.toString()){
      ad.remove()
    }
  }

  client.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}

exports.updateUsersClient = function(req, res, next) {
  var client = req.client

  var update = req.body

  var i = client.usersClient.length

  while(i--){
    var ad = client.usersClient[i]
    if(ad._id.toString() === update._id.toString()){
      ad.remove()
    }
  }

  client.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
}


exports.put = function(req, res, next) {
  // if (!req.client.checkAdmin(req.user)){
  //   next(new Error('Not authorized!!'));
  //   return;
  // }

  var client = req.client;

  var update = req.body;


  _.merge(client, update);

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
  newclient.admins = req.user
  newclient.usersClients = req.user

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

exports.FindClient = function(id) {
  var client = Client.findById(id)
  return client
}












