(function() {
	angular.module('onTrack')
	.controller('RewardsFormController', ['$scope', '$http', '$state',
		function($scope, $http, $state) {

			$scope.submit = function(reward) {
				$http.post('/api/rewards', reward)
					.then( response => {
						$state.go('rewards')
					})
					.catch( response => {
						console.log(response)
					})
			}
		}])
}());