(function() {
	angular.module('onTrack') 
	.controller('RewardsViewController', ['$scope', '$http', '$state', '$stateParams', '$window',
		function($scope, $http, $state, $stateParams, $window) {


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

			$scope.deleteReward = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Reward!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/rewards/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						$state.go('rewards')
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
				})
			}

			getReward()

		}])
}());