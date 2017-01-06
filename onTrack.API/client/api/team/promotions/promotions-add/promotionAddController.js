(function() {
	angular.module('onTrack')
	.controller('PromotionAddController',['$scope', '$state', '$http', '$stateParams', '$window',
		function($scope, $state, $http, $stateParams, $window) {

			$scope.promotions = []

			$scope.add = function(promotion) {
				var token = $window.sessionStorage['jwt']

				var team = {promotions: []}

				$scope.team.promotions.forEach( promo => {
					team.promotions.push({name: promo.name, promoId: promo._id})
				})

				promotion.forEach( p => {team.promotions.push({name: p.name, promoId: p._id})})


				$http.put('api/teams/' + $stateParams.id,  team, {
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
						response.data.forEach(function(promo) {
							if(promo) {
								var promoIds = $scope.team.promotions.map(p => p.promoId)
								if (!promoIds.includes(promo.promoId)) {
									$scope.promotions.push(
											{name: promo.name, promoId: promo.promId}
										)
								}
							}
							else {
								$scope.promotions = [{name: 'No Promotinos available'}]
							}							
						})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getPromotions()
		}])
}());