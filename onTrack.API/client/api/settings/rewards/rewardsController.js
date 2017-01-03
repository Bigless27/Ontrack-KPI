(function() {
	angular.module('onTrack')
	.controller('RewardsController', ['$scope', '$http', '$state', 
		function($scope, $http, $state) {

			function getRewards() {
				$http.get('api/rewards')
					.success(data => {
						$scope.rewards = data
					})
					.error(err => {
						console.log(err)
					})
			}

			getRewards()
	}])
}());