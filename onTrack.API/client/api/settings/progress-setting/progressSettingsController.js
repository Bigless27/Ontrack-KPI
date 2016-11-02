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
				  html: false
				}).then(function(){
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
				}).done(function() {
					return
				})
			}

		$scope.updateName = function(name) {
			if (name === ''){
				return 'Name is required'
			}
			updateSetting(name, 'name')
		}

		$scope.updateType = function(data) {
			if (data === ''){
				return 'Type is required'
			}
			else if (($scope.setting.type == data)) {
				return 
			}
			return updateSetting(data, 'type')
		}

		$scope.subDups = false

		$scope.updateSubtypes = function(data) {
			var names = data.map(x => x._id)
			if([...new Set(names)].length < names.length) {
				$scope.subDups = true
				return
			}
			$scope.subDups = false
			return updateSetting(data, 'subTypes')
		}

		$scope.updateUsers = function(users) {
			//This can definetly be made better. Needs to update users and delete users promotions
			if($scope.setting.users.length > users.length){
				var editRefs = $scope.setting.users.filter(function(user){
					if (!users.map(x => x.userId).includes(user.userId)) {
						return user
					}
				})
				editRefs.forEach(function(r) {
					var token = $window.sessionStorage['jwt']
					var newUser = $scope.users.find(x => x._id === r.userId) //find the actually user from the subdocument of prog setting
					console.log(newUser)
					var delIndex = newUser.settingProgress.indexOf($scope.setting._id)
					newUser.settingProgress.splice(delIndex, 1)
					$http.get('api/users/' + r.userId)
						.success(function(userProgEdit) {
							var progId = userProgEdit.progress.filter(function(prog) {
									if(prog.settingId === $scope.setting._id) {
										return prog
									}
							}).map(x => x._id)

							var delProgIndex = newUser.progress.indexOf(progId[0])
							newUser.progress.splice(delProgIndex, 1)

							$http.put('api/users/' + r.userId, newUser, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.success(function(data){
								$http.delete('api/users/' + data._id + '/progress/' + progId[0])
									.success(function(data) {
										$state.reload()
									})
									.error(function(err) {
										console.log(err)
									})
							})
							.error(function(err) {
								console.log(err)
							})
						})
						.error(function(err) {
							console.log(err)
						})
				})
			}
			updateSetting(users, 'users')
		}


		function updateSetting(data, field){
			$scope.setting[field] = data
			$http.put('api/progress-settings/' + $stateParams.id, $scope.setting)
				.success(function(data){
					if (field == 'type') {
						$scope.updateSubtypes([])
					}
					else {
						$state.reload()
					}
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
				initMS.push({userId: user.userId, fullName: user.firstName + ' ' + user.lastName,
							firstName: user.firstName, lastName: user.lastName})
			})
			$scope.initUsers = initMS
		}

		$scope.userTags = false
		$scope.subTags = false

		$scope.toggleEditSubs = function() {
			if ($scope.subTags) {
				$scope.subTags = false
			}
			else {
				$scope.subTags = true
			}
		}

		$scope.toggleEditUsers = function() {
			if ($scope.userTags) {
				$scope.userTags = false
			}
			else {
				$scope.userTags = true
			}
		}

		//have type show on edit click
		$(document).on('click','#progress-type-edit-button', function(){
			$('#progress-type-edit')[0].click()
		} )

	 	function getSetting(){
	 		$http.get('api/progress-settings/' + $stateParams.id)
	 			.success(function(data){
	 				$http.get('api/type-settings')
	 					.success(function(set) {
	 						$scope.noUsers = false
	 						$scope.noSubs = false
			 				$scope.setting = data
			 				if ($scope.setting.users.length === 0){
			 					$scope.noUsers = true
			 				}
			 				else if($scope.setting.subTypes.length === 0){
			 					$scope.noSubs = true
			 				}
			 				$scope.typeSetting = set
			 				getUniqueTypes()
				 			getUniqueSubtypes()
			 				sortInitUsers(data)

	 					})
	 					.error(function(err) {
	 						console.log(err)
	 					})

	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	function getUniqueTypes() {
	 		var typeCopy = $scope.typeSetting
	 		var unUniqueTypes = typeCopy.map(function(x){
				return x.type
			})
			$scope.typeList = [...new Set(unUniqueTypes)]
	 	}

	 	function getUniqueSubtypes() {
	 		var unSetSubtypes = $scope.typeSetting.filter(function(set) {
	 			return set.type === $scope.setting.type
	 		})
	 		var subTypeStrings = $scope.setting.subTypes.map(x => x.name)
	 		var subArr = []
	 		unSetSubtypes[0].subTypes.forEach(function(sub) {
	 				if (!subTypeStrings.includes(sub.text)){
		 				subArr.push({name: sub.text})
	 				}
	 		})
	 		$scope.subTypes = subArr
	 	}

	 	$scope.afterRemoveItem = function(item) {
		 		var subStrings = $scope.subTypes.map(x => x.name)
		 		if (subStrings.includes(item.name)) {
		 			return
		 		}
		 		else{
			 		$scope.subTypes.push({name: item.name})
		 		}
		 	}


	 	getSetting()
	 	getUsers()

	}])
}());