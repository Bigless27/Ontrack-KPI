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
					if(set.type === $scope.user.type.listValue){
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

			 $scope.submitActivity = function(){
			 	var token = $window.sessionStorage['jwt']
			 	$scope.user.userId = []
			 	$scope.user.userId.push($stateParams.id)
			 	$scope.user['type'] = $scope.user.type.listValue
			 	$scope.user['subType'] = $scope.user.subType.listValue
 
				$http.post('/api/users/' + $stateParams['id'] + '/activity', $scope.user,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data) {
					console.log(data)
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			 }

	}])
}());