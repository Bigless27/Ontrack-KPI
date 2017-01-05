(function() {
	angular.module('onTrack')
	.controller('RewardsController', ['$scope', '$http', '$state', 
		function($scope, $http, $state) {

			function getRewards() {
				$http.get('api/rewards')
					.then(response => {
						$scope.rewards = response.data
					})
					.catch(response => {
						console.log(response.data)
					})
			}

			getRewards()
	}])
}());