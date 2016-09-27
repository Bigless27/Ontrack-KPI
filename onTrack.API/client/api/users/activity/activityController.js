(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$window', '$stateParams', '$http', '$q',
	 function($scope, $state, $window, $stateParams, $http, $q) {

	 	function getActivity() {
	 		$http.get('api/users/' + $stateParams.id + 
	 			'/activity/' + $stateParams.activityId)
	 			.success(function(data) {
	 				$scope.activity = data
	 			})
	 			.error(function(err) {
	 				console.log(err)
	 			})
	 	}

	 	function getSettings() {
	 		$http.get('api/settings')
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
	 		var unUniqueSubtypes = $scope.settings.map(function(x){
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


		getSettings()
	 	getActivity()


	}])
}());