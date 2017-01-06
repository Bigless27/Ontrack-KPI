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
					.then(response => {
						$state.reload()
					})
					.catch(response => {
						console.log(response)
					})
			}



			function getReward() {
				$http.get('api/rewards/' + $stateParams.id)
					.then(response => {
						$scope.reward = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getReward()

		}])
}());