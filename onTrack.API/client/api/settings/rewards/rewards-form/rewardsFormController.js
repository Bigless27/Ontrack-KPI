(function() {
	angular.module('onTrack')
	.controller('RewardsFormController', ['$scope', '$http', '$state',
		function($scope, $http, $state) {

			$scope.submit = function(reward) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.rewardForm.$invalid){return;}

				console.log(reward)
				return

				$http.post('/api/rewards', reward)
					.then( response => {
						$state.reload()
					})
					.catch( response => {
						console.log(response)
					})
			}

			
		}])
}());