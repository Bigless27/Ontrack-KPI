(function(){
	angular.module('onTrack')
	.controller('PromotionsController', ['$scope', '$state', '$http', 
		function($scope, $state, $http){

			function getPromotions() {
				$http.get('api/promotions')
					.then( response => {
						$scope.promotions = response.data
					})
					.catch( response => {
						console.log(response)
					})
			}


			getPromotions()
		}])
}());