(function() {
	angular.module('onTrack')
	.controller('ProgressController', ['$scope', '$http', '$stateParams', 
		function($scope, $http, $stateParams) {

			function getProgresses() {
				$http.get('api/progress-settings')
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getProgresses()

	}])
}());