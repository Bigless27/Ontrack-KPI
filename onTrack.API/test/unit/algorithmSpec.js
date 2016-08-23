var expect  = require("chai").expect;
var request = require("request");
var server = require('../server-test')
describe('Update Process', function() {


	var app;

	before(function() {

		app = server[0].listen(server[1], function() {
			console.log('listening on http://localhost:' + server[1].port + server[1])
		})
	});

	after(function(){
		app.close();
	})


	it('should update the user', function(done) {
		request('http://localhost:3000/api/users', function(response, body) {
			expect(3).to.eq(10);
			done()
			}
		)
	})
})

