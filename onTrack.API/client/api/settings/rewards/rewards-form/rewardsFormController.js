(function() {
	angular.module('onTrack')
	.controller('RewardsFromController', ['$scope', '$http', '$state',
		function($scope, $http, $state) {

			$scope.submit = function(reward) {
				$http.post('/api/rewards', reward)
					.success(data => {
						$state.go('rewards')
					})
					.error( e => {
						console.log(e)
					})
			}
		}])
});