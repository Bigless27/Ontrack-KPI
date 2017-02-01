(function() {
	angular.module('onTrack')
	.controller('ActivityViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
		function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

			function getActivity(){
				$http.get('api/activity/' + $stateParams.id)
					.then(response => {

						var kvObj = submitFormat.generateKVObj(response.data.any)
				
						var combinedFormatted = Object.assign(kvObj, {'asfName': response.data.asfName, 'team': response.data.team, 'users': response.data.users})

						$scope.activity = combinedFormatted

						$scope.activity.users.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})

						console.log($scope.activity)
					})	
					.catch(response => {
						console.log(response)
					})
			}

			getActivity()
		}])
}());