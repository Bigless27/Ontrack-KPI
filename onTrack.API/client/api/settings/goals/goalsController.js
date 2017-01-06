(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		function getGoals() {
			$http.get('api/goals')
				.then(function onSuccess(response) {
					$scope.goals = response.data
				})
				.catch(function onError(response) {
					console.log(response)
				})
		}

		getGoals()
	}])

}());