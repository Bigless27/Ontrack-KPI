(function() {
	angular.module('onTrack')
	.controller('AssignProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			$scope.typeChecker = false


			$scope.setProgress = function() {
				if(!$scope.progType) return
				else {
					$scope.typeChecker = false
					$scope.filterdProgress = $scope.progress.filter( x => {return x.type == $scope.progType.type})
				}
			}


			$scope.checkType = function() {
				if (!$scope.progType) {
					$scope.typeChecker = true
				}
			}

			function getProgress() {
				$http.get('api/progress-settings')
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function createUserProgress(data) {
				data.progress.forEach(progress => {

					var userProgress = {value: 0, userId: data._id,
										 progressId: progress }

					$http.post('api/user-progress', userProgress)
						.catch(response => {
							console.log(response)
						})
				})
			}

			$scope.submit = function(data) {
				data.progress.forEach(function(prog){
					data.users.forEach(function(user) {
						
						if(!user.progress.length) {
							user.progress = []
						}

						// account for adding duplicates
						var dups = user.progress.map(x => x._id)
						if (!dups.includes(prog._id)) {
							user.progress.push(prog._id)
						}

						
						$http.put(`api/users/${user.userId}/updateRefs`, user)
							.then(response => {
								$state.reload()
								createUserProgress(response.data)
							})
							.catch(response => {
								console.log(response)
							})
					})
				})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						response.data.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, userId: user._id,
											email: user.email, fullName: user.firstName + ' ' + user.lastName, 
											progress: user.progress}
								)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.catch(response => {
						console.log(response)
					})
			}

			$scope.optionsList = [];
			getProgress()
			getUsers()
		
	}])
}());