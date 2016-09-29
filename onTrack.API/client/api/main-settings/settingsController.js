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
				.success(function(users) {
					users.forEach(function(user){
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
				.error(function(err) {
					console.log(err);
				})
		}

	 	function loadTypeSettings(){
		 	 $http.get('api/settings')
		 		.success(function(data) {
		 			$scope.settings = data
		 		})
		 		.error(function(err) {
		 			console.log(err)
		 		})
	 	}


	 	getUsers()
	 	loadTypeSettings()

	}])
}());