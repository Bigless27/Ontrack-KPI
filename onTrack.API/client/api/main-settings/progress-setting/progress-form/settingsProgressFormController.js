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
										userId: user._id, firstName: user.firstName,
										lastName: user.lastName
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

		function getSettings() {
			$http.get('api/type-settings')
				.success(function(data) {
					$scope.typeSettings = data
					setTypes()
				})
				.error(function(err){
					console.log(err)
				})
		}

		//for select button
		function setTypes() {
			var settingsCopy = $scope.typeSettings
			$scope.types = [...new Set(settingsCopy.map(function(set){
				return set.type
			}))]

		}


		getSettings()

		$scope.setSubtypes = function(){
			if(!$scope.setting.type) return

			else{
					var id = 1
					$scope.subList = []
					$scope.typeSettings.forEach(function(set){
					if(set.type === $scope.setting.type){
						set.subTypes.forEach(function(sub){
							$scope.itemArray.push({id: id, name: sub.text})
							id++	
						})
					}
				})
			}
		}

		 $scope.itemArray = [];

    	$scope.selected = { value: $scope.itemArray[0] };



	 	$scope.submitProgressSetting = function(setting) {
	 		if(setting.subTypes){
	 			setting['subTypes'] = setting.subTypes.map(x => x.name)
	 		}
	 		console.log(setting)
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