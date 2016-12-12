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
				}).then(function() {
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
						.success(function(data){
							swal({
									title: 'User Deleted',
									type: 'success'
								})
							if (data) {
								$window.sessionStorage.clear()
								$state.go('login')
							}
							else {	
								$state.go('main')
							}
						})
						.error(function(err) {
							console.log(err)
						})
					}
				})
				.catch(function() {
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
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.success(function(data){
						$scope.user = data
						getTeams()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			//ui-select
			function populateTypes() {
				$http.get('api/type-settings')
					.success(function(data) {
						$scope.settings = data
						var unUniqueTypes = $scope.settings.map(function(x){
							return x.type
						})
						$scope.typeList = [...new Set(unUniqueTypes)]
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function getTeams() {
				$http.get('api/teams/findTeams/' + $scope.user.email)
					.success(function(data) {
						if (data.length > 0) {
							var owners = data.map(x => x.owner).reduce((a, b) => a.concat(b))
							$scope.teamOwners = owners.map(x => x.email)
						}
						else {
							$scope.teamOwners = []
						}
						
					})
					.error(function(err) {
						console.log(err)
					})
			}

			populateTypes()
			getUser()
		
	}])
}());