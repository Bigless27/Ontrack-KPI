(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {


			$scope.deleteUser = function() {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this client!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}, function(){
					$http.delete('/api/users/' + $stateParams.id)
					.success(function(data){
						$state.go('main' )
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.success(function(data){
						$scope.user = data
					})
					.error(function(err) {
						console.log(err)
					})
			}


			getUser()
		
	}])
}());