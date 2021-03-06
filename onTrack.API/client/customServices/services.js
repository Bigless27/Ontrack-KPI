(function() {
	angular.module('onTrack')
		.factory('arrToObject', function() {
			var service = {};
			service.create = function(values) {
				var obj = {}
				while (values.length) {
					var kv = values.splice(0,2)
					obj[kv[0]] = kv[1]
				}
				return obj
			}
			return service
		})

		.factory('submitFormat', function() {
			var service = {}

			service.addGoalFormat = function(obj) {
				var goalArr = Object.values(obj).filter(x => {return typeof(x) === 'string'})
				if (goalArr) {
					return goalArr
				}
				else{
					return {}
				}
			}

			service.generateKVObj = function(obj) {
				var keys = Object.keys(obj)
				var values = Object.values(obj)

				var solution = keys.map((x,i) => {return {'key': x, 'value': values[i]}})

				return solution
			}

			service.nestedObj = function(obj) {
				 return obj.filter(x => {return typeof(x) === 'object'})
			}

			service.kvPair = function(obj) {
				service.newGoal = {}
				obj.forEach(x => { return service.newGoal[x.key] = x.value})
				return service.newGoal
			}

			return service
		})

		//add one that attaches web token for authorization later
		//Doesn't really save a lot of typing. Only a tiny bit more modular
		// .factory('http', ['$http', function($http) {
		// 	var request = {}

		// 	request.get = function(param) {
		// 		$http.get(param)
		// 			.then(response => {
		// 				return response.data
		// 			})
		// 			.error(response => {
		// 				return 
		// 			})
		// 	}

		// 	request.post = function(param) {

		// 	}

		// 	request.put = function(param) {

		// 	}

		// 	request.delete = function(param) {

		// 	}


		// }])
}());