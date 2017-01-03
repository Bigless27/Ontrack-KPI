(function() {
	angular.module('onTrack') 
	.controller('RewardsViewController', ['$scope', '$http', '$state', '$stateParams', 
		function($scope, $http, $state, $stateParams) {


			$scope.updateName = function(name) {
				if (!name) {
					return 'Name is required'
				}
				updateReward('name', name)
			}

			$scope.updateType = function(type) {
				if (!type) {
					return 'Type is required'
				}
				updateReward('type', type)
			}

			$scope.updateDescription = function(description) {
				if (!description) {
					return 'Description is required'
				}
				updateReward('description', description)
			}

			function updateReward(param, name) {
				$scope.reward[param] = name

				$http.put('api/rewards/' + $stateParams.id, $scope.reward)
					.success(data => {
						$state.reload()
					})
					.error(err => {
						console.log(err)
					})
			}



			function getReward() {
				$http.get('api/rewards/' + $stateParams.id)
					.success(data => {
						$scope.reward = data
					})
					.error(err => {
						console.log(err)
					})
			}

			getReward()

		}])
}());