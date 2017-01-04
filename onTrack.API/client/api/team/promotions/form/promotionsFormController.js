(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams', 'goalPreview', '$rootScope',
		function($scope, $state, $http, $window, $stateParams, goalPreview, $rootScope) {
			
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

			function getRewards() {
				$http.get('api/rewards')
					.success(data => {
						$scope.rewards = data
					})
					.error(err => {
						console.log(err)
					})
			}

			getRewards()

			$scope.setRewards = function() {
				if(!$scope.reward) return
				else {
					$scope.typeChecker = false
					$scope.filterdRewards = $scope.rewards.filter( x => {return x.type == $scope.reward.type})
				}
			}

			$scope.typeChecker = false

			$scope.checkType = function() {
				if (!$scope.reward) {
					$scope.typeChecker = true
				}
			}

			$scope.$on('highlight', function(event, data) {
				$state.go('promotionCreate.goalPreview')
				$scope.goalShow = true
				goalPreview.updateValue(data._id)
			})

			$scope.hideGoalPreview = function() {
				$scope.goalShow = false
				$state.go('promotionCreate')
			}

			$scope.afterSelectItem = function(item) {
				
			}
			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.promotionForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']

				promotion.goals = promotion.goals.map(x => x._id)

				$http.post('api/promotions', promotion ,{
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