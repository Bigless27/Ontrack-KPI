(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

			$scope.userId = $stateParams['id']


			function getTypes() {
				$http.get('/api/settings')
					.success(function(data) {
						$scope.settings = data
						populateLists(data)
					})
					.error(function(data) {
						console.log(data)
					})
			}

			function populateLists(data){
				data.forEach(function(set) {
					$scope.typeList.push({listValue: set.type})			
				})
			}

			$scope.setSubtypes = function(){
				$scope.settings.forEach(function(set){
					if(set.type === $scope.activity.type.listValue){
						set.subTypes.forEach(function(sub){
							$scope.subList.push({listValue: sub.text})	
						})
					}
				})
			}


			$scope.typeList = []

			$scope.subList = []

			 $scope.nameList = [{
			 	listValue: "retail sale",
			 },{
			 	listValue: ""
			 }]

			 getTypes()

			 $scope.submitActivity = function(activity){
			 	var token = $window.sessionStorage['jwt']
			 	activity.userId = []
			 	activity.userId.push($stateParams['id'])
			 	activity['type'] = $scope.activity.type.listValue
			 	activity['subType'] = $scope.activity.subType.listValue

				$http.post('/api/users/' + $stateParams.id + '/activity', activity,{
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

	}])
}());