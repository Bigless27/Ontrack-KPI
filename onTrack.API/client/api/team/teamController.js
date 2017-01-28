(function() {
	angular.module('onTrack')
	.controller('TeamController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
			
			$scope.removePromotion = function(promo) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams.id + '/removePromotion', promo, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then( response => {
					$scope.team = response.data
				})
				.catch( response => {
					console.log(response)
				})

			}

			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams['id'] + '/removeAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$scope.team = response.data
				})
				.catch(response => {
					console.log(response)
				})
			}

			$scope.removeUser = function(user) {
				//this automatically makes two requests. Check to see if you need to remove admin as well. If not then only issue one update
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams.id + '/removeAdmin', user , {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(response => {
						$http.put('/api/teams/' + $stateParams.id + '/removeUser', user, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.then(response => {
								$scope.team = response.data
							})
							.catch(response => {
								console.log(response)
						})
					})
					.catch(reponse => {
						console.log(response)
				})
			}

			$scope.deleteTeam = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this team!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(response => {
					$http.delete('/api/teams/' + $stateParams['id'],
					 {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(response => {
						$state.go('main')
					})
					.catch(response => {
						console.log(response)
					})
				}).catch(response => {
					return
				})
			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}

			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is required'
				}
			
				if($scope.nameArr.includes(data)){
					return 'Name is already taken'
				}
				return updateTeam(data, 'name')
			}

			function updateTeam(data, field) {
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.team[field] = data

				$http.put('/api/teams/' + $stateParams['id'], $scope.team,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response)
				})

			}



			function getTeam(){
				$http.get('/api/teams/' + $stateParams['id'])
					.then(response => {
						console.log(response.data)
						$scope.team = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.nameArr = []
						response.data.forEach(function(team){
							$scope.nameArr.push(team.name)
						})

					})
					.catch(response => {
						console.log(response);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = []
						response.data.forEach(function(){
							$scope.users.push({name: response.data.firstName + ' ' + response.data.lastName})
						})

					})
					.catch(response => {
						console.log(response)
					})
			}

			getTeams()
			getTeam()

		
	}])
}());