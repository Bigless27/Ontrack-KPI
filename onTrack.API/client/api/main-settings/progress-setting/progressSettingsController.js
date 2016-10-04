(function() {
	angular.module('onTrack')
	.controller('ProgressSettingController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 	$scope.deleteSetting = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/progress-settings/'+ $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('setting')
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

		$scope.updateName = function(name) {
			if (name === ''){
				return 'Name is required'
			}
			updateSetting(name, 'name')
		}

		$scope.updateUsers = function(users) {
			updateSetting(users, 'users')
		}


		function updateSetting(data, field){
			$scope.setting[field] = data
			console.log($scope.setting)
			$http.put('api/progress-settings/' + $stateParams.id, $scope.setting)
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function getUsers() {
			$http.get('api/users')
				.success(function(data) {
					$scope.users = data
					sortUsers(data)
				})
				.error(function(err) {
					console.log(err)
				})
		}

		function sortUsers(users){
			var sub = []
			users.forEach(function(user) {
				sub.push({userId: user._id, fullName: user.firstName + ' ' + user.lastName,
							firstName: user.firstName, lastName: user.lastName})
			})	
			$scope.optionsList = sub 
		}

		function sortInitUsers(set){
			var initMS = []
			set.users.forEach(function(user) {
				initMS.push({userId: user._id, fullName: user.firstName + ' ' + user.lastName,
							firstName: user.firstName, lastName: user.lastName})
			})
			$scope.initUsers = initMS
		}

		$scope.userTags = false

		$scope.toggleEdit = function() {
			if($scope.userTags){
				$scope.userTags = false
			}
			else{
				$scope.userTags = true
			}
		}



	 	function getSetting(){
	 		$http.get('api/progress-settings/' + $stateParams.id)
	 			.success(function(data){
	 				$scope.noUsers = false
	 				$scope.setting = data
	 				if ($scope.setting.users. length === 0){
	 					$scope.noUsers = true
	 				}
	 				sortInitUsers(data)
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	getSetting()
	 	getUsers()

	}])
}());