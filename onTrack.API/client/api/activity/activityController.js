(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$window', '$stateParams', '$http', '$q',
	 function($scope, $state, $window, $stateParams, $http, $q) {


	 	//Look into doubling the http requests!!! or not idk lol haha 
	 	function getActivitySettings() {
	 		var d = $q.defer();
	 		$http.get('api/users/' + $stateParams.id + 
	 			'/activity/' + $stateParams.activityId)
	 			.success(function(act) {
	 				$http.get('api/type-settings')
			 			.success(function(set){
			 				$scope.activity = act
			 				$scope.settings = set
			 				getUniqueTypes()
			 				getUniqueSubtypes()
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
	 		var unUniqueSubtypes = unSetSubtypes.map(function(x){
	 			return x.subTypes.map(function(sub){
	 				return sub.text
	 			})
	 		})
	 		unUniqueSubtypes = unUniqueSubtypes.reduce(function(a,b){return a.concat(b)})
	 		$scope.subTypes = [...new Set(unUniqueSubtypes)]
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
			if(data === '')return 'Type is Required'
			$scope.updateSubtype('empty')

			return updateActivity(data, 'type')
		}

		$scope.updateSubtype = function(data) {
			if(data === '')return 'Subtype is Required'

			return updateActivity(data, 'subType')
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
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.activity[field] = data
				$http.put('/api/users/' + $stateParams.id + '/activity/' 
					+ $stateParams.activityId, $scope.activity,{
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

		$scope.deleteActivity = function(activity) {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this activity!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('api/users/' + $stateParams.id
					 + '/activity/' + activity._id  )
					.success(function(data){
						userId = {'id': $stateParams.id}
						$state.go('user',userId)
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}


	 	getActivitySettings()
		


	}])
}());