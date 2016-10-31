(function() {
	angular.module('onTrack')
	.controller('OwnerController', ['$scope', '$state', '$http', '$window', '$stateParams', 
		function($scope, $state, $http, $window, $stateParams) {

			$scope.optionsList = []
			$scope.success = false

			$scope.transfer = function(data) {
				var token = $window.sessionStorage['jwt']
				$scope.client['owner'] = [data]

				$http.put('api/clients/' + $stateParams.id, $scope.client, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data) {
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				}) 
			}

			// function getUsers() {
			// 	$http.get('api/users')
			// 		.success(function(users) {
			// 			users.forEach(function(user){
			// 				if(user){
			// 					if (user.email !== $scope.client.owner[0].email){
			// 						$scope.optionsList.push(
			// 								{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
			// 									email: user.email, fullName: user.firstName + ' ' + user.lastName}
			// 						)
			// 					}
			// 				}
			// 				else{
			// 					$scope.optionsList = [{name: 'No users'}]
			// 				}
			// 			})
			// 		})
			// 		.error(function(err) {
			// 			console.log(err)
			// 		})
			// }

			function getClient() {
				$http.get('api/clients/' + $stateParams.id)
					.success(function(data) {
						$scope.client = data

						data.admins.forEach(function(user){
							if(user){
								if (user.email !== $scope.client.owner[0].email){
									$scope.optionsList.push(
											{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
												email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
								}
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
						getUsers()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			getClient()
		}])
} ());