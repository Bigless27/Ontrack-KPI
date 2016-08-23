var expect  = require("chai").expect;
var request = require("request");
var server = require('../server-test')

describe('create user', function() {


	var app;

	before(function() {

		app = server[0].listen(server[1], function() {
			console.log('listening on http://localhost:' + server[1].port + server[1])
		})
	});

	after(function(){
		app.close();
	})


	it('post and get routes work for user', function(done) {
		request.post('http://localhost:3000/api/users',{form:{email:'test', password:'test'}})
		request('http://localhost:3000/api/users', function(error,response, body) {
			console.log(body)
			expect(body).to.not.be.empty
			done()
			}
		)
	})
})

