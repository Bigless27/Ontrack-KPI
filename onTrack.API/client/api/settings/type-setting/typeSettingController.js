(function() {
	angular.module('onTrack')
	.controller('TypeSettingController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

	 		$scope.deleteSetting = function() {
				var token = $window.sessionStorage['jwt']
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Setting!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  closeOnConfirm: true,
				  html: false
				}).then(function(){
					$http.delete('/api/type-settings/'+ $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('setting')
					})
					.error(function(err) {
						console.log(err)
					})
				})
			}

			$scope.userTags = false

			$scope.toggleEdit = function() {
				if($scope.userTags){
					$scope.userTags = false
				}
				else{
					$scope.userTags = true
				}
			}

			$scope.updateType = function(type){
				updateSetting(type, 'type')
			}

			$scope.updateSubtype = function(sub){
				updateSetting(sub, 'subTypes')
			}


			function updateSetting(data, field){
				var token = $window.sessionStorage['jwt']
				$scope.setting[field] = data
				$http.put('api/type-settings/' + $stateParams.id, $scope.setting, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})
			}

			//make this work!
			$scope.clickMe = function(){
				


			}

			function getCbUsers(cb){

			}


	 		function getSetting(){
	 			$http.get('api/type-settings/' + $stateParams.id)
	 				.success(function(data) {
	 					$scope.noSubTypes = false
	 					$scope.setting = data
	 					if ($scope.setting.subTypes.length === 0){
	 						$scope.noSubTypes = true
	 					}
	 				})
	 				.error(function(err) {
	 					console.log(err)
	 				})
	 		}

	 		getSetting()

	}])
}());