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

				$http.put('/api/clients/' + $stateParams.id
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
				  text: "You will not be able to recover this client!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function(){
					$http.delete('/api/clients/' + $stateParams.id
					 + '/promotions/' + $stateParams.promoId, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						var clientId = {'id': $stateParams['id'] + ''}
						$state.go('client',clientId )
					})
					.error(function(err) {
						console.log(err)
					})
				}).done(function() {
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
				$http.get('api/clients/' + $stateParams.id 
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


			//this below needs to be refactored to grab the users from the client!

			function getClients(matches) {
				var usersMatches = matches.map(function(x) {
					return x._id
				})
				//you have the setting Id
				
				$http.get('api/clients/' + $stateParams.id)
					.success(function(data) {
						var theUsers = []
						data.usersClient.forEach(function(user) {
							console.log(user)
							if (user.progress.length > 0) {
								user.progress.forEach(function(prog) {
									console.log(prog)
									if(prog.settingId == usersMatches[0]) {
										user['progress'] = prog
										theUsers.push(user)
									}
								})
							}
						})
						$scope.matchingUsers = theUsers
					})
					.error(function(err){
						console.log(err)
					})
			}

			function getProgresses() {
				$http.get('api/progress-settings')
					.success(function(progs) {
						var matches =  matchProgressToPromotion(progs)
						getClients(matches)
					})
					.error(function(err) {
						console.log(err)
					})
			}

			// This grabs progress of matching types and subtypes. The subtypes are only
			// matched if there is an exact match on them
			function matchProgressToPromotion(progs) {
				var matchedTypesProg = progs.filter(x => x.type === $scope.promotion.type)
				//$scope.noSubtypes applies to the $scope.promotion
				
				var subMatchArr = []
				matchedTypesProg.forEach(function(prog) {
					if (!$scope.noSubtypes) {
						var subTypeStrings = $scope.promotion.subTypes.map(x => x.name) //sub types of promotions
						prog.subTypes.forEach(function(sub) {
							if (!subMatchArr.includes(prog)) { //this matches the setting to the promotions setting match, keeps it from being pushed in twice
								var progSubsInArr = prog.subTypes.map(x => x.name)
								if (subTypeStrings.includes(sub.name)) { // any subtype is matched include that promotion
									subMatchArr.push(prog)
								}
							}
						})

					}
					else{
						prog.push(subMatchArr)
					}

				})
				return subMatchArr
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