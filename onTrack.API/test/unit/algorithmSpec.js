var expect  = require("chai").expect;
var request = require("request");
var server = require('../server-test')
var algoritm = require('../../server/api/algorithm')
var User = require('../../server/api/user/userModel')
var Client = require('../../server/api/client/clientModel')
var Promotion = require('../../server/api/client/promotions/promotionModel');
var Kpi = require('../../server/api/client/kpi/kpiModel')
var Activity = require('../../server/api/UserActivity/activityModel')
var Progress = require('../../server/api/userPromoProgress/progressModel')

describe('Algorithm', function() {

	var app;
	var token;

	before(function(done) {

		app = server[0].listen(server[1], function() {
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
		Progress.remove({}, function(err){
			if(err) {
				console.log(err);
			}
		})
		Kpi.remove({}, function(err){
			if(err) {
				console.log(err);
			}
		})
		Promotion.remove({}, function(err) {
			if(err) {
				console.log(err);
			}
		})
		Activity.remove({}, function(err){
			if(err) {
				console.log(err);
			}
		})
		app.close();

	})


	it('should update API value', function(done){

		request.get('http://localhost:3000/api/progress', 
			function(err, response, body) {

				expect(JSON.parse(body)[0].value).to.eq(5)
				done();
		})
	})
})


