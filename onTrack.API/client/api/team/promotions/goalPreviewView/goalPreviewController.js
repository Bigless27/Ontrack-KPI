(function() {
	angular.module('onTrack')
	.controller('GoalPreviewController', ['$scope', '$http', '$state', 'goalPreview', 'submitFormat',
		function($scope, $http, $state, goalPreview, submitFormat) {

			$scope.$watch(function() {return goalPreview.getValue()}, function(newValue, oldValue) {
				!newValue ? $state.go('promotionCreate') : getGoal(newValue)
			})

			function getGoal(id) {
				$http.get(`/api/goals/${id}`)
					.success(data => {
						var kvObj = submitFormat.generateKVObj(data.any)
						
						$scope.goal = Object.assign(kvObj, {'gsfName': data.gsfName})
					})
					.error(err => {
						console.log(err)
					})
			}

			getGoal(goalPreview.getValue())
			
	}])
}());