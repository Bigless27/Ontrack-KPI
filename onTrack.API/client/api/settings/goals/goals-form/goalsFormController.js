(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$http', 'arrToObject',
	function($scope, $state, $window, $http, arrToObject) {

		$scope.tracker = 0;

		$scope.submit = function(data) {
			if (!data) {
				return
			}
			var dataJson = arrToObject.create(Object.values(data))

			$http.post('api/goals', dataJson)
				.success(function(data) {
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

		}
	}])

}());