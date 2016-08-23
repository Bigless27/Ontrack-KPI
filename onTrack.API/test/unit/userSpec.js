// var expect  = require("chai").expect;
// var request = require("request");
// var mongoose = require('mongoose')
// var server = require('../server-test')
// var User = require('../../server/api/user/userModel')

// describe('create user', function() {


// 	var app;

// 	before(function() {

// 		app = server[0].listen(server[1], function() {
// 		})
// 	});

// 	after(function(){
// 		User.remove({}, function(err) {
// 			if(err) {
// 				console.log(err);
// 			}
// 		})// this is to clear database of collections
// 		app.close();


// 	})


// 	it('post and get routes work for user', function(done) {
// 		request.post('http://localhost:3000/api/users',{form:{email:'test', password:'test'}},
// 			function(err, response, body){
// 			})
// 		request('http://localhost:3000/api/users', function(err,response, body) {
// 			expect(body).to.not.be.empty
// 			done()
// 			}
// 		)
// 	})
// })