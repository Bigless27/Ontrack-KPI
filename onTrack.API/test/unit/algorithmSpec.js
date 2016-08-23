var expect  = require("chai").expect;
var request = require("request");
var server = require('../server-test')
var algoritm = require('../../server/api/algorithm')
var User = require('../../server/api/user/userModel')
var Client = require('../../server/api/client/clientModel')

describe('Algorithm', function() {

	var app;

	before(function() {

		app = server[0].listen(server[1], function() {
		})
	});

	after(function(){
		User.remove({}, function(err) {
			if(err) {
				console.log(err);
			}
		})
		Client.remove({}, function(err) {
			if(err) {
				console.log(err);
			}
		})
		app.close();

	})


	it('should update API value', function(done){
		var token;
		var user = request.post('http://localhost:3000/api/users',{form:{email:'test', password:'test'}},
						function(err, response, body){
						token = JSON.parse(body).token;
				var client = request.post('http://localhost:3000/api/clients', {form: {name: 'ryan'}},
					function(err, response, body) {
						done()
					}).auth(null, null, true, token )
		})

		//client created!!
		
	})
})


