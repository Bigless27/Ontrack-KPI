(function() {
	angular.module('onTrack')
	.controller('TeamFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createTeam = function(data){
				$scope.$broadcast('show-errors-check-validity');

				if($scope.teamForm.$invalid){return;}

				data.promotions.map( promo => {
					promo.promoId = promo._id
				})
				
				var token = $window.sessionStorage['jwt']

				var names = $scope.teams.filter(function(team) {
					return team.name == data.name
				})

				if(names.length > 0){
					$scope.errorDisplay = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else {
					$http.post('/api/teams' , data ,{
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						var teamId = {'id': response.data._id + ''}
						$state.go('team',teamId )
					})
					.catch(function onError(response) {
						$scope.errorDisplay = true
						$scope.oops = response.message
					})
				}
			}

			function getAllUsers() {
				$http.get('/api/users')
					.then(function onSuccess(response){
						response.data.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, userId: user._id,
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.catch(function onError(response){
						console.log(response)
					})
			}

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
			getAllUsers()

			$scope.optionsList = [];

	}])
}());