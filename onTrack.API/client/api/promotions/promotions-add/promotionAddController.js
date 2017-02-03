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

				promotion.forEach( p => {team.promotions.push({name: p.name, promoId: p.promoId})})


				$http.put('api/teams/' + $stateParams.id,  team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
					.then( response => {
						var team = response.data
						response.data.promotions.forEach(promo => {
							$http.get('api/promotions/' + promo.promoId)
								.then( response => {
									var promo = response.data
									if (!promo.teamId) {
										promo.teamId = []
									}
									console.log(team)

									promo.teamId.push(team._id)

									$http.put('api/promotions/' + promo._id + '/updateRefs', promo)
										.catch(response => {
											console.log(response)
										})
								})
								.catch( response => {
									console.log(response)
								})
						})
						$state.reload()
					})
					.catch( response => {
						console.log(response)
					})

			}

			function getTeam() {
				$http.get('api/teams')
					.then(response => {
						$scope.team = response.data[0]
						getPromotions()
					})
					.catch(response => {
						console.log(response)
					})
			}

			// there may be a little bug with this on duplicates showing up after they are added
			function getPromotions() {
				$http.get('api/promotions')
					.then(response => {
						response.data.forEach(function(promo) {
							if(promo) {
								var promoIds = $scope.team.promotions.map(p => p.promoId)
								if (!promoIds.includes(promo._id)) {
									$scope.promotions.push(
											{name: promo.name, promoId: promo._id}
										)
								}
							}
							else {
								$scope.promotions = [{name: 'No Promotions available'}]
							}							
						})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getTeam()
		}])
}());