var expect  = require("chai").expect;
var request = require("request");
var server = require('../../server/server')
var algoritm = require('../../server/api/algorithm')


describe('Algorithm', function() {
	var app;
	var db;
	var token;

	before(function(done) {

		app = server.app.listen(server.config, function() {
		})


		var user = request.post('http://localhost:3000/api/users',{form:{email:'test', password:'test'}},
			function(err, response, body){
					token = JSON.parse(body).token;
			var client = request.post('http://localhost:3000/api/clients', {form: {name: 'ryan'}},
				function(err, response, body) {

				
		
				var promotion = request.post("http://localhost:3000/api/clients/" + JSON.parse(body)._id + '/promotions',
					{form:{name: 'test', type: 'sale', completionValue: 10, type: 'sale', startDate: '5/10/2012', endDate: '5/10/2018'}},
					function(err, responsePromo, bodyPromo) {


					var kpi = request.post('http://localhost:3000/api/clients/' + JSON.parse(body)._id + '/kpis', {form: {name: 'test', type: 'sale', value: 'srv + 3'}},
						function(err, resonseKpi, bodyKpi ){
							done()
					})
						
				}).auth(null, null, true, token)
				

			}).auth(null, null, true, token )
		})
	});

	before(function(done) {
			var activity = request.post('http://localhost:3000/api/activity', 
			{form: {items: [{type: 'sale', value: [{srv: 2, retail: 69, quantity: 7}]}]}},
				function(err, reponseActivity, bodyActivity) {
					
					done()
					
		}).auth(null, null, true, token);
	})

	after(function(done){
		

		server.mongoose.connection.db.dropDatabase(function(err){
			if (err){
				console.log(err)
			}
			else{
				console.log('db dropped')
			}
			app.close(function(err) {
				if(err) {
					console.log(err)
					done()
				}
				else{
					console.log('closed connection')
					done()
				}
			});
		}) 

	})


	it('should update API value', function(done){

		request.get('http://localhost:3000/api/progress', 
			function(err, response, body) {

				expect(JSON.parse(body)[0].value).to.eq(5)
				done();
		})
	})
})


