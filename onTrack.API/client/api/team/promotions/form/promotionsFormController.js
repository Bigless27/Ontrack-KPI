(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams', 'goalPreview',
		function($scope, $state, $http, $window, $stateParams, goalPreview) {
			
			$scope.teamId = $stateParams['id']

			$scope.showGoal = false

			var today = new Date();
			$scope.minDate = today.toISOString();

			function getGoals(){
				$http.get('api/goals')
					.success(data => {
						$scope.goals = data
					})	
					.error(err => {
						console.log(err)
					})
			} 
			getGoals()

			$scope.showGoalPreview = function() {
				$scope.goalShow = true
			}

			$scope.hideGoalPreview = function() {
				$scope.goalShow = false
				$state.go('promotionCreate')
			}

			$scope.beforeSelectItem = function(item) {
				$state.go('promotionCreate.goalPreview')
				goalPreview.updateValue(item._id)
			}

			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.promotionForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']

				$http.post('api/teams/' + $stateParams['id'] + '/promotions', promotion ,{
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				.success(function(data){
						$state.reload()
				})
				.error(function(err){
					console.log(err)
				})
			}
	}])
	.service('goalPreview', function() {
		var model = {}

		return {
			getValue: function() {
				return model.value
			},
			updateValue: function(value) {
				model.value = value;
			}
		}
	})
}());