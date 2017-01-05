(function() {
	angular.module('onTrack')
	.controller('GoalPreviewController', ['$scope', '$http', '$state', 'goalPreview', 'submitFormat',
		function($scope, $http, $state, goalPreview, submitFormat) {

			$scope.$watch(function() {return goalPreview.getValue()}, function(newValue, oldValue) {
				!newValue ? $state.go('promotionCreate') : getGoal(newValue)
			})

			function getGoal(id) {
				$http.get(`/api/goals/${id}`)
					.then(response => {
						var kvObj = submitFormat.generateKVObj(response.data.any)
						
						$scope.goal = Object.assign(kvObj, {'gsfName': response.data.gsfName})
					})
					.catch(response => {
						console.log(response.data)
					})
			}

			getGoal(goalPreview.getValue())
			
	}])
}());