(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

		$scope.selectAll = function(){
	 		if($scope.activity.users.length < $scope.optionsList.length){
		 		$scope.activity.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.activity.users = []
	 			$('#user-select-button')[0].innerHTML = 'Select All'
	 		}
	 	}

	 	$scope.subTypesList = []


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

		function getTypes() {
			$http.get('/api/type-settings')
				.success(function(data) {
					$scope.settings = data
					populateLists(data)
				})
				.error(function(data) {
					console.log(data)
				})
		}

		function populateLists(data){
			var listHolder = []
			data.forEach(function(set) {					
				listHolder.push(set.type)
			})
			$scope.typeList = [...new Set(listHolder)]
			
		}

		$scope.typeChecker = false

		$scope.checkType = function() {
			if(!$scope.activity.type) {
				$scope.typeChecker = true
			}
		}

		$scope.setSubtypes = function(){
			$scope.subTypesList = []
			if(!$scope.activity.type) return
			else{
					$scope.settings.forEach(function(set){
					if(set.type === $scope.activity.type){
						set.subTypes.forEach(function(sub){
							$scope.subTypesList.push({name: sub.text})	
						})
					}
				})
			}
		}


		$scope.typeList = []


		$scope.submitActivity = function(activity){
		 	var token = $window.sessionStorage['jwt']

			$http.post('/api/activity', activity,{
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

		getTypes()
		getUsers()
	}])
}());