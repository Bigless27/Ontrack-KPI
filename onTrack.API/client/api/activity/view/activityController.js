(function() {
	angular.module('onTrack')
	.controller('ActivityViewController', ['$scope', '$state', '$window', '$stateParams', '$http', '$q',
	 function($scope, $state, $window, $stateParams, $http, $q) {


	 	//Look into doubling the http requests!!! or not idk lol haha 
	 	function getActivitySettings() {
	 		var d = $q.defer();
	 		$http.get('api/activity/' + $stateParams.id)
	 			.success(function(act) {
	 				$http.get('api/type-settings')
			 			.success(function(set){
			 				$scope.noUsers = false
			 				$scope.noSubs = false
			 				$scope.activity = act
			 				$scope.settings = set
			 				if($scope.activity.users.length === 0) {
			 					$scope.noUsers = true
			 				}
			 				if($scope.activity.subTypes.length === 0) {
			 					$scope.noSubs = true
			 				}
			 				getUniqueTypes()
			 				getUniqueSubtypes()
			 				sortInitUsers(act)
			 				d.resolve()
			 			})
			 			.error(function(err) {
			 				console.log(err)
			 				d.reject()
			 			})
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 				d.reject()
	 			})
	 	}

	 	function getSettings() {
	 		$http.get('api/type-settings')
	 			.success(function(data){
	 				$scope.settings = data
	 				getUniqueTypes()
	 				getUniqueSubtypes()
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	function getUniqueTypes() {
	 		var unUniqueTypes = $scope.settings.map(function(x){
				return x.type
			})
			$scope.typeList = [...new Set(unUniqueTypes)]
	 	}

	 	function getUniqueSubtypes() {
	 		var unSetSubtypes = $scope.settings.filter(function(set) {
		 			return set.type === $scope.activity.type
		 		})
		 		var subTypeStrings = $scope.activity.subTypes.map(x => x.name)
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

 		$(document).on('click','#activity-type-edit-button', function(){
			$('#activity-type-edit')[0].click()
		})
		.on('click', '#activity-subTypes-edit-button', function() {
			$('#activity-subTypes-edit')[0].click()
		})
		.on('click', '#activity-date-edit-button', function() {
			$('#activity-date-edit')[0].click()
		})

		$scope.updateName = function(data) {
			if(data.length < 2) return 'Name is too short'
			else if(data === '') return 'Name is required'
			else if(data.length > 45) return 'Name is too long'

			return updateActivity(data, 'name')
		}

		$scope.updateType = function(data) {
			if (data === '') return 'Type is Required'
			else if (($scope.activity.type == data)) {
					return 
			}

			return updateActivity(data, 'type')
		}

		$scope.subDups = false

		$scope.updateSubtypes = function(data) {
			var names = data.map(x => x._id)
			if([...new Set(names)].length < names.length) {
				$scope.subDups = true
				return
			}
			$scope.subDups = false
			return updateActivity(data, 'subTypes')
		}

		$scope.updateValue = function(data) {
				var reg = new RegExp('^\\d+$')

				if (data === ''){
					return 'Value is required'
				}
				else if (!reg.test(data)){
					return 'Value must be an integer'
				}
				data = parseInt(data)
				return updateActivity(data, 'value')
		}

		$scope.updateDate = function(data) {
			if(data === '') return 'Date is required'
			return updateActivity(data, 'date')
		}

		function updateActivity(data, field){
				var token = $window.sessionStorage['jwt']
				$scope.activity[field] = data
				$http.put('/api/activity/' + $stateParams.id, $scope.activity,					+ $stateParams.activityId, $scope.activity,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
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

		$scope.updateUsers = function(users) {
			//This can definetly be made better. Needs to update users and delete users promotions
			if($scope.activity.users.length > users.length) {
				//this finds out what user has been removed from the activity
				var editRefs = $scope.activity.users.filter(function(user){
					if (!users.map(x => x.userId).includes(user.userId)) {
						return user
					}
				})
				editRefs.forEach(function(r) {
					var token = $window.sessionStorage['jwt']
					var newUser = $scope.users.find(x => x._id === r.userId) //find the actual user from the subdocument of 
					var delIndex = newUser.activity.indexOf($scope.activity._id)
					newUser.activity.splice(delIndex, 1)
					$http.put('api/users/' + r.userId, newUser, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.error(function(err) {
						console.log(err)
					})
				 })
			}
			updateActivity(users, 'users')
		}

		$scope.deleteActivity = function(activity) {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this activity!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('api/activity/' + activity._id  )
					.success(function(data){
						$state.go('activity')
					})
					.error(function(err) {
						console.log(err)
					})
				})
				.done(function() {
					return
				})
		}

		getUsers()
	 	getActivitySettings()
	}])
}());