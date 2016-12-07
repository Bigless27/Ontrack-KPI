(function() {
	angular.module('onTrack')
		.factory('arrToObject', function() {
			var service = {};
			service.create = function(values) {
				var obj = {}
				while (values.length) {
					console.log(values.splice(0,2))
				}
			}
			return service
		})

}());