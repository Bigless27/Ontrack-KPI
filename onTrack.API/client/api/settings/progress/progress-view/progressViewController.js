(function() {
	angular.module('onTrack')
	.controller('ProgressViewController', ['$scope', '$http', '$stateParams', '$state', '$window',
		function($scope, $http, $stateParams, $state, $window) {

			$scope.updateName = function(name) {
				if (!name) {
					return 'Name is required'
				}
				updateProgress('name', name)
			}

			$scope.updateType = function(type) {
				if (!type) {
					return 'Type is required'
				}
				updateProgress('type', type)
			}

			$scope.updateDescription = function(description) {
				if (!description) {
					return 'Description is required'
				}
				updateProgress('description', description)
			}

			$scope.deleteProgress = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Progress!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/progress-settings/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						$state.go('progress')
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
				})
			}

			function updateProgress(param, name) {
				$scope.progress[param] = name

				$http.put('api/progress-settings/' + $stateParams.id, $scope.progress)
					.then(response => {
						$state.reload()
					})
					.catch(response => {
						console.log(response)
					})
			}

			
			function getProgress() {
				$http.get(`api/progress-settings/${$stateParams.id}` )
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function setUser() {
				console.log($stateParams)
				if ($stateParams.userId) {
					$scope.user = true
					$scope.userId = $stateParams.userId
					getUser()
				}
				else {
					$scope.user = false
				}
			}

			function getUser() {
				$http.get(`api/users/${$stateParams.userId}`)
					.then(response => {
						$scope.userProgress = response.data.userProgress.filter(x => {return $stateParams.id == x.progressId})
					})
					.catch(response => {
						console.log(response)
					})
			}


			setUser()
			getProgress()
	}])
}());