(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
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

			function updatePromotion(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.promotion[field] = data

				$http.put('/api/teams/' + $stateParams.id
				 + '/promotions/' + $stateParams.promoId, $scope.promotion,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					if (field == 'type') {
						$scope.updateSubtypes([])
					}
					else {
						$state.reload()
					}
				})
				.error(function(err) {
					console.log(err)
				})

			}


			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this team!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/teams/' + $stateParams.id
					 + '/promotions/' + $stateParams.promoId, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var teamId = {'id': $stateParams['id'] + ''}
						$state.go('team',teamId )
					})
					.error(function(err) {
						console.log(err)
					})
				}).catch(function() {
					return
				})
			}

			function getUniqueTypes() {
		 		var typeCopy = $scope.settings
		 		var unUniqueTypes = typeCopy.map(function(x){
					return x.type
				})
				$scope.typeList = [...new Set(unUniqueTypes)]
	 		}

		 	function getUniqueSubtypes() {
		 		var unSetSubtypes = $scope.settings.filter(function(set) {
		 			return set.type === $scope.promotion.type
		 		})
		 		var subTypeStrings = $scope.promotion.subTypes.map(x => x.name)
		 		var subArr = []
		 		unSetSubtypes[0].subTypes.forEach(function(sub) {
		 				if (!subTypeStrings.includes(sub.text)){
			 				subArr.push({name: sub.text})
		 				}
		 		})
		 		$scope.subTypes = subArr
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

			$scope.subTags = false

			$scope.toggleEdit = function() {
				if($scope.subTags){
					$scope.subTags = false
				}
				else{
					$scope.subTags = true
				}
			}

			function getPromotions(){
				$http.get('api/teams/' + $stateParams.id 
						+ '/promotions/' + $stateParams.promoId)
							.success(function(data) {
								$scope.promotion = data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
								getTypes()
							})
							.error(function(err) {
								console.log(err);
							})
			}

			function getTypes(){
				$http.get('api/type-settings')
					.success(function(data){
						$scope.typeList = data.map(x => x.type)
						$scope.noSubtypes = false
						if ($scope.promotion.subTypes.length === 0){
							$scope.noSubtypes = true
						}
						$scope.settings = data
						getProgresses()
						getUniqueTypes()
						getUniqueSubtypes()
					})
					.error(function(err){
						console.log(err)
					})
			}


			//this below needs to be refactored to grab the users from the team!

			function getTeams(matches) {
				//you have the setting Id
				$http.get('api/teams/' + $stateParams.id)
					.success(function(data) {
						var theUsers = []
						data.users.forEach(function(user) {
							//match the user's email to the mathcing progress email
							matches.forEach(function(prog) {
								if (prog.users.map(x => x.email).includes(user.email)) {
									theUsers.push(prog.users)
								}
							})
								
						})
						var usersQuery = theUsers.reduce((x,y) => {x.concat(y)})
					})
					.error(function(err){
						console.log(err)
					})
			}

			function findUsers() {
				$http.get('api/users/findUsers/' + $stateParams.id)
					.success(function(data) {
						$scope.matchingUsers = matchProgressToPromotion(data)
					})
					.error(function(err) {
						console.log(err)
					})
			}

			function getProgresses() {
				$http.get('api/progress-settings')
					.success(function(progs) {
						findUsers()
						
					})
					.error(function(err) {
						console.log(err)
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

			getPromotions()		
	}])
}());