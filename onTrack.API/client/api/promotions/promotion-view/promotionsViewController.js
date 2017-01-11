(function() {
	angular.module('onTrack')
	.controller('PromotionViewController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			//have type show on edit click
			$(document).on('click','.promotion-startDate-edit-button', function(){
				$('#promotion-startDate-edit')[0].click()
			})
			.on('click','.promotion-endDate-edit-button', function(){
				$('#promotion-endDate-edit')[0].click()
			})
			.on('click', '.promotion-edit-type-button', function(){
				$('#promotion-type-edit')[0].click()
			})


			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updatePromotion(data, 'name')
			}


			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				else if (($scope.promotion.type == data)) {
					return 
				}
				return updatePromotion(data, 'type')
			}

			$scope.updateSubtypes = function(data) {
				return updatePromotion(data,'subTypes')			
			}

			$scope.updateCompletionValue = function(data) {
				var reg = new RegExp('^\\d+$')

				if (data === ''){
					return 'Value is required'
				}
				else if (!reg.test(data)){
					return 'Value must be an integer'
				}
				data['completionValue'] = parseInt(data['completionValue'])
				return updatePromotion(data, 'completionValue')
			}

			$scope.updateDescription = function(data) {
				if (data === '') {
					return 'Description is required'
				}
				return updatePromotion(data, 'description')
			}

			$scope.updateStartDate = function(data) {
				var today = new Date();
				  if (data < today.toISOString()) {
				  	return "Start Date can't be in the past"
				  }
				  return updatePromotion(data, 'startDate')
			}

			$scope.updateEndDate = function(data) {
				if ($scope.promotion.startDate.toISOString() > data){
					return 'End date must come after start date'
				}
				return updatePromotion(data, 'endDate')
			}

			$scope.updateGoals = function(data) {
				if (!data) return

				var goals = data.map(x => x._id)
				return updatePromotionRefs(goals, 'goals')
			}

			$scope.updateRewards = function(data) {
				if (!data) return

				var rewards = data.map(x => x._id)
				return updatePromotionRefs(rewards, 'rewards')
			}

			function updatePromotionRefs(data, field) {
				var token = $window.sessionStorage['jwt']

				$scope.promotion[field] = []
				
				data.forEach(x => $scope.promotion[field].push(x))

				$http.put('api/promotions/' + $stateParams.id + '/updateRefs', $scope.promotion, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response)
				})
			}

			function updatePromotion(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.promotion[field] = data

				$http.put('/api/promotions/' + $stateParams.id, $scope.promotion,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(function onSuccess(response){
					$state.reload()
				})
				.catch(function onError(response) {
					console.log(response.data)
				})

			}


			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Promotion!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/promotions/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						var teamId = {'id': $stateParams['id'] + ''}
						$state.go('team',teamId )
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
					return
				})
			}

		 	$scope.afterRemoveItem = function(item) {
		 		var subStrings = $scope.subTypes.map(x => x.name)
		 		if (subStrings.includes(item.name)) {
		 			return
		 		}
		 		else{
			 		$scope.subTypes.push({name: item.name})
		 		}
		 	}

			$scope.promo = false
			$scope.reward = false

			$scope.toggleEditPromo = function() {
				$scope.promo = !$scope.promo
			}

			$scope.toggleEditReward = function() {
				$scope.reward = !$scope.reward
			}

			function getPromotion(){
				$http.get('api/promotions/' + $stateParams.id)
							.then(function onSuccess(response) {
								$scope.promotion = response.data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
								// getTypes()
							})
							.catch(function onError(response) {
								console.log(response);
							})
			}


			//this below needs to be refactored to grab the users from the team!

			function getTeams(matches) {
				//you have the setting Id
				$http.get('api/teams/' + $stateParams.id)
					.then(function onSuccess(response) {
						var theUsers = []
						response.data.users.forEach(function(user) {
							//match the user's email to the mathcing progress email
							matches.forEach(function(prog) {
								if (prog.users.map(x => x.email).includes(user.email)) {
									theUsers.push(prog.users)
								}
							})
								
						})
						var usersQuery = theUsers.reduce((x,y) => {x.concat(y)})
					})
					.catch(function onError(response){
						console.log(response.data)
					})
			}

			// This grabs progress of matching types and subtypes. The subtypes are only
			// matched if there is an exact match on them
			function matchProgressToPromotion(users) {

				var subMatchArr = []

				var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				matchedTypesUsers.forEach(function(user) {
					user['settingProgress'] = user.settingProgress.filter(set => set.type === $scope.promotion.type)
					if (user.settingProgress.length > 0) {
						subMatchArr.push(user)
					}
				})
				
				// var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				// // The above filters the users the have a progress of a matched type!
				var theProgresses = []

				subMatchArr.forEach(function(user) {
					if (!$scope.noSubtypes) {
						user.settingProgress[0].subTypes.forEach(function(sub){
							if (sub) {
								if ($scope.promotion.subTypes.includes(sub.name)) {
									theProgresses.push(user)
								}
							}
						})
					}
					else {
						var matchedProg = user.progress.filter(prog => prog.settingId === user.settingProgress[0]._id)
						user['progress'] = matchedProg
						theProgresses.push(user)
						
					}
				})
				return theProgresses
			}

			$scope.getPercentage = function(x,y) {
				if (x === 0) {
					return 0
				}
				else {
				return (x/y * 100).toFixed(2)
				}
			}

			function getGoals(){
				$http.get('api/goals')
					.then(response => {
						$scope.promoList = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getRewards() {
				$http.get('api/rewards')
					.then(response => {
						$scope.rewardsList = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getPromotion()
			getGoals()	
			getRewards()	
	}])
}());