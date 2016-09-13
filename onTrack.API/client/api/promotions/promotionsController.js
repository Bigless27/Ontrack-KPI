(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.create = false


			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				$http.delete('/api/clients/' + $stateParams['clientid']
				 + '/promotions/' + $stateParams['promoid'], {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var clientId = {'id': $stateParams['clientid'] + ''}
					$state.go('client',clientId )
				})
				.error(function(err) {
					console.log(err)
				})
			}

			function getPromotions(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/promotions/' + $stateParams['promoid'])
							.success(function(data) {
								$scope.promotion = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getPromotions()

		
	}])
}());