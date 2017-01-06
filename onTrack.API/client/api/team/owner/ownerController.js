(function() {
	angular.module('onTrack')
	.controller('OwnerController', ['$scope', '$state', '$http', '$window', '$stateParams', 
		function($scope, $state, $http, $window, $stateParams) {

			$scope.optionsList = []
			$scope.success = false

			$scope.transfer = function(data) {
				var token = $window.sessionStorage['jwt']
				$scope.team['owner'] = [data]

				$http.put('api/teams/' + $stateParams.id, $scope.team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(function(response) {
					$state.reload()
				})
				.catch(function(response) {
					console.log(response)
				}) 
			}

			// function getUsers() {
			// 	$http.get('api/users')
			// 		.success(function(users) {
			// 			users.forEach(function(user){
			// 				if(user){
			// 					if (user.email !== $scope.team.owner[0].email){
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

			function getTeam() {
				$http.get('api/teams/' + $stateParams.id)
					.then(function(response) {
						$scope.team = response.data

						response.data.admins.forEach(function(user){
							if(user){
								if (user.email !== $scope.team.owner[0].email){
									$scope.optionsList.push(
											{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
												email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
								}
							}
							else{
								$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]
							}
						})
						if ($scope.optionsList.length == 0) {
							$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]	
						}
						// getUsers()
					})
					.catch(function(response) {
						console.log(response)
					})
			}

			getTeam()
		}])
} ());