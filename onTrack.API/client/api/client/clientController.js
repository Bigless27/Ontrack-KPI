(function() {
	angular.module('onTrack')
	.controller('ClientController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
		
		

			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams['id'] + '/updateAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					$scope.client = data
				})
				.error(function(err) {
					console.log(err)
				})
			}

			$scope.removeUser = function(user) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/clients/' + $stateParams.id + '/updateAdmin', user , {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data) {
						$http.put('/api/clients/' + $stateParams.id + '/updateUser', user, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.success(function(data) {
								$scope.client = data
							})
							.error(function(err) {
								console.log(err)
						})
					})
					.error(function(err) {
						console.log(err)
				})


			}

			$scope.deleteClient = function() {
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
					$http.delete('/api/clients/' + $stateParams['id'],
					 {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.success(function(data){
						$state.go('main')
					})
					.error(function(err) {
						console.log(err)
					})
				}).done(function(){
					return
				})

			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}

			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is required'
				}
			
				if($scope.nameArr.includes(data)){
					return 'Name is already taken'
				}
				return updateClient(data, 'name')
			}

			function updateClient(data, field) {
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.client[field] = data

				$http.put('/api/clients/' + $stateParams['id'], $scope.client,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.success(function(data){
					var params = {clientid: $stateParams['clientid'], kpiid: $stateParams['kpiid'] }
					$state.reload()
				})
				.error(function(err) {
					console.log(err)
				})

			}



			function getClient(){
				$http.get('/api/clients/' + $stateParams['id'])
					.success(function(data) {
						$scope.client = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getClients() {
				$http.get('api/clients')
					.success(function(data) {
						$scope.nameArr = []
						data.forEach(function(client){
							$scope.nameArr.push(client.name)
						})

					})
					.error(function(err) {
						console.log(err);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.success(function(data) {
						$scope.users = []
						data.forEach(function(){
							$scope.users.push({name: data.firstName + ' ' + data.lastName})
						})

					})
					.error(function(err) {
						console.log(err)
					})
			}

			getClients()
			getClient()

		
	}])
}());