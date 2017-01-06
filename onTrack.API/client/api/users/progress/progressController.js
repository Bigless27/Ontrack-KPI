(function() {
	angular.module('onTrack')
	.controller('ProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
			
			function getProgress() {
				$http.get('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId)
					.then(response => {
						$scope.progress = response.data
						$http.get('api/progress-settings/' + response.data.settingId)
							.then(response => {
								$scope.setting = response.data
							})
							.catch(function(err) {
								console.log(err)
							})
					})
					.catch(function(err) {
						console.log(err)
					})
			}


			$scope.updateValue = function(data) {
				if (data < 0) {
					return "Value can't be negative"
				}
				updateProgress(data)
			}

			function updateProgress(data) {
				$scope.progress['value'] = data

				$http.put('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId, $scope.progress)
					.error(function(err) {
						console.log(err)
					})

			}

			getProgress()


	}])
}());