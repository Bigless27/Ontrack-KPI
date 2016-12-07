(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		
	

	}])

	.directive('goalFormat', function($compile, $http) {
		return {
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				function getGoals() {
					$http.get('api/goals')
						.success(function(data) {
							$scope.goals = data.map(x => x.any)
							var solution = []
							$scope.goals.forEach(goal => {
								generateTable(goal)
							})
							

						})
						.error(function(err) {
							console.log(err)
						})
				}

				function generateTable(goal) {
					var a = Object.keys(goal)
					var b  = Object.values(goal)
					
				}

				getGoals()
			}
		}
	})

}());