(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			$scope.deleteUser = function() {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this user!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(() => {
					if ($scope.teamOwners.indexOf($scope.user.email) >= 0) {
						swal({
								title: 'User is an owner of a team!',
								text: 'Please transfer ownership of team before deleting user!',
								type: 'error'
							})
						return
					}
					else {
						var token = $window.sessionStorage['jwt']
						$http.delete('/api/users/' + $stateParams.id, {
							headers: {
								'Authorization' : `Bearer ${token}`
							}
						})
						.then(response => {
							swal({
									title: 'User Deleted',
									type: 'success'
								})
							if (response.data) {
								$window.sessionStorage.clear()
								$state.go('login')
							}
							else {	
								$state.go('main')
							}
						})
						.catch(response => {
							console.log(response.data)
						})
					}
				})
				.catch(response =>{
					return
				})
			}


			$(document).on('click','.user-email-edit-button', function(){
				$('#user-email-edit')[0].click()
			})
			.on('click', '.user-dateJoined-edit-button', function() {
				$('#user-dateJoined-edit')[0].click()
			})

			$scope.updateFirstName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'firstName')
			}

			$scope.updateLastName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'lastName')
			}

			$scope.updateEmail = function(data) {
				if(data === ''){
					return 'Email is required'
				}
				return updateUser(data, 'email')
			}

			$scope.updateDateJoined = function(data) {
				if (data === '') {
					return 'Date Joined is required'
				}
				return updateUser(data, 'dateJoined')
			}

			$scope.getSettingName = function(id) {
				var matchSetting = $scope.user.settingProgress.filter(function(set) {
					return set._id === id
				})
				return matchSetting[0].name
			}

			$scope.getSettingType = function(id) {
				var matchSetting = $scope.user.settingProgress.filter(function(set) {
					return set._id === id
				})
				return matchSetting[0].type
			}

			function updateUser(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.user[field] = data

				$http.put('/api/users/' + $stateParams['id'], $scope.user,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response.data)
				})
			}

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.then(response => {
						$scope.user = response.data
						getTeams()
					})
					.catch(response => {
						console.log(response.data)
					})
			}

			//ui-select
			function populateTypes() {
				$http.get('api/type-settings')
					.then(response => {
						$scope.settings = response.data
						var unUniqueTypes = $scope.settings.map(function(x){
							return x.type
						})
						$scope.typeList = [...new Set(unUniqueTypes)]
					})
					.catch(response => {
						console.log(response.data)
					})
			}

			function getTeams() {
				$http.get('api/teams/findTeams/' + $scope.user.email)
					.then(response => {
						if (response.data.length > 0) {
							var owners = response.data.map(x => x.owner).reduce((a, b) => a.concat(b))
							$scope.teamOwners = owners.map(x => x.email)
						}
						else {
							$scope.teamOwners = []
						}
					})
					.catch(response => {
						console.log(response.data)
					})
			}
			populateTypes()
			getUser()
		
	}])
}());