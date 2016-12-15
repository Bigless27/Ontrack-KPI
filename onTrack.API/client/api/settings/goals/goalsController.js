(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		function getGoals() {
			$http.get('api/goals')
				.success(function(data) {
					$scope.goals = data
				})
				.error(function(err) {
					console.log(err)
				})
		}

		getGoals()
	}])

}());