(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
			
			$scope.teamId = $stateParams['id']

			var today = new Date();
			$scope.minDate = today.toISOString();


			function getSettings(){
				$http.get('api/type-settings')
					.success(function(data){
						$scope.settings = data
						setTypes()
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function setTypes() {
				var unUniqueTypes = $scope.settings.map(function(set){
					return set.type
				})
				$scope.typeList = [...new Set(unUniqueTypes)]
			}

			$scope.subTypesList = [];

			$scope.typeChecker = false

			$scope.checkType = function(){
				if(!$scope.promotion.type) {
					$scope.typeChecker = true
				}
			}

			$scope.setSubtypes = function() {
				$scope.subTypesList = []
				if(!$scope.promotion.type) return
				else{
					$scope.typeChecker = false
					$scope.settings.forEach(function(set){
						if(set.type === $scope.promotion.type){
							set.subTypes.forEach(function(sub){
								$scope.subTypesList.push({name: sub.text})
							})
						}
					})
				}
			}

			getSettings()

			
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
}());