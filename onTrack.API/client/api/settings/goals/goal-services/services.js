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

		// .factory('scopeService', function() {

		// 	var model = {}
		// 	var counter = 0

		// 	return {
		// 		getValue: function() {
		// 			return model.value
		// 		},
		// 		updateValue: function(value) {
		// 			model.value = value;
		// 		}
		// 	}
		// })

}());