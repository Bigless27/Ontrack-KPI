(function() {
	angular.module('onTrack')
	.controller('SettingsProgressFormController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {


	 	$scope.selectAll = function(){
	 		if($scope.setting.users.length < $scope.optionsList.length){
		 		$scope.setting.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.setting.users = []
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
									{ fullName: user.firstName + ' ' + user.lastName,
										userId: user._id
									}
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

	 	$scope.submitProgressSetting = function(setting) {
	 		if(!setting.users){
	 			return 'No Users Assigned'
	 		}
	 		else{
	 			 var modSetting = setting.users.map(function(user) {
	 				return user.userId
	 			})
	 		}

	 		setting['users'] = modSetting

	 		$http.post('/api/progress-settings', setting)
	 			.success(function(data) {
	 				$scope.progressSettings = data
	 				$state.reload()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}


	 	getUsers()
	}])
}());