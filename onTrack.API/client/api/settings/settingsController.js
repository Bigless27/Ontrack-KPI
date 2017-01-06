(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.selectAll = function(){
	 		if($scope.user.users.length < $scope.optionsList.length){
		 		$scope.user.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.user.users = []
	 			$('#user-select-button')[0].innerHTML = 'Select All'
	 		}
	 	}

	 	$scope.optionsList = []

	 	function getUsers(){
			$http.get('/api/users')
				.then(function onSucces(response) {
					response.data.forEach(function(user){
						if(user){
							$scope.optionsList.push(
									{firstName: user.firstName, lastName: user.lastName, 
										email: user.email, fullName: user.firstName + ' ' + user.lastName}
								)
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(function onError(response) {
					console.log(response)
				})
		}

	 	function loadTypeSettings(){
		 	 $http.get('api/type-settings')
		 		.then(function onSucces(response) {
		 			$scope.typeSettings = response.data
		 		})
		 		.catch(function onError(response) {
		 			console.log(response)
		 		})
	 	}

	 	function loadProgressSettings(){
	 		$http.get('api/progress-settings')
	 			.then(function onSucces(response) {
	 				$scope.progressSettings = response.data
	 			})
	 			.catch(function onError(response) {
	 				console.log(response)
	 			})
	 	}


	 	getUsers()
	 	loadTypeSettings()
	 	loadProgressSettings()

	}])
}());