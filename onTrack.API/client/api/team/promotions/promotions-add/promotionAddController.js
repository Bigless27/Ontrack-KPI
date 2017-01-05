(function() {
	angular.module('onTrack')
	.controller('PromotionAddController',['$scope', '$state', '$http', '$stateParams', '$window',
		function($scope, $state, $http, $stateParams, $window) {

			$scope.add = function(promotion) {
				var token = $window.sessionStorage['jwt']

				var promo = {promotion: []}

				promotion.forEach( p => {promo.promotion.push({name: p.name, promoId: p._id})})

				$http.put('api/teams/' + $stateParams.id,  promo, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
					.then( response => {
						$state.reload()
					})
					.catch( response => {
						console.log(response)
					})

			}

			function getPromotions() {
				$http.get('api/promotions')
					.then(response => {
						$scope.promotions = response.data
					})
					.catch(response => {
						console.log(response.data)
					})
			}

			getPromotions()
		}])
}());