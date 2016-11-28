(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$window', '$stateParams', '$http', '$q',
	 function($scope, $state, $window, $stateParams, $http, $q) {

	 	
	 	function getActivities() {
	 		$http.get('api/activity')
	 		 .success(function(data) {
	 		 	$scope.activities = data
	 		 })
	 		 .error(function(err) {
	 		 	console.log(err)
	 		 })
	 	}

	 	getActivities()
	}])
}());