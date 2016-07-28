var Client = require('./clientModel');
var _ = require('lodash');


exports.params = function(req, res, next, id) {
	Client.findById(id)
		.then(function(client) {
			if (!client) {
				next(new Error('No Client with that id'));
			} else {
				req.client = client;
				next();
			}
		}, function(err) {
			next(err);
	});
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


exports.put = function(req, res, next) {
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

  Client.create(newclient)
    .then(function(client) {
      res.json(client);
    }, function(err) {
      next(err);
    });
};


exports.delete = function(req, res, next) {
  req.client.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};



