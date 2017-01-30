(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$http', '$stateParams',
		function($scope, $state, $http, $stateParams) {

			function getRecentActivity() {
				$http.get('api/activity')
					.then(response => {

					})
					.catch(response => {
						console.log(response)
					})
			}

			// getRecentActivity()
		}])
}());