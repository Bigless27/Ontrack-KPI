(function() {
	angular.module('onTrack')
	.controller('PromotionAddController',['$scope', '$state', '$http', 
		function($scope, $state, $http) {

			function getPromotions() {
				$http.get('api/promotions')
					.success(data => {
						$scope.promotions = data
					})
					.error(err => {
						console.log(err)
					})
			}
			

			getPromotions()
		}])
}());