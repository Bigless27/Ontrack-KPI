(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = true
			$scope.clientId = $stateParams['id']

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

			getSettings()

			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.promotionForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']

				$http.post('api/clients/' + $stateParams['id'] + '/promotions', promotion ,{
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