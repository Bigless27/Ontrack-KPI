(function() {
	angular.module('onTrack')
	.controller('ProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
			
			function getProgress() {
				$http.get('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId)
					.success(function(data) {
						$scope.progress = data
						console.log($scope.progress)
					})
					.error(function(err) {
						console.log(err)
					})
			}

			getProgress()


	}])
}());