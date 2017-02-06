(function() {
	angular.module('onTrack')
	.controller('GoalsFormController', ['$scope', '$state', '$window', '$http', 'arrToObject',
	function($scope, $state, $window, $http, arrToObject) {

		$scope.tracker = 0;
		$scope.prog = false

		function getProgress() {
			$http.get('api/progress-settings')
				.then(response => {
					$scope.progress = response.data
				})
				.catch(response => {
					console.log(response)
				})
		}

		getProgress()


		//on cancel look to change progress value in model
		$scope.toggleProg = function() {
			$scope.prog = !$scope.prog
		}

		$scope.submit = function(data) {
			$scope.$broadcast('show-errors-check-validity');

			var prog = undefined
			if (data.progress) {
				prog = data.progress._id
			}
			//account for duplicate name of goal here

			var props = {'gsfName': data.name, 'progress': prog}
			delete data.name
			delete data.progress
			var data = arrToObject.create(Object.values(data))
		
			var dataJson = Object.assign(data, props)


			$http.post('api/goals', dataJson)
				.then(function onSuccess(response) {
					var goal = response.data
					if (!response.data.progress) {
						$http.get('api/progress-settings')
							.then(response => {
								var progressId = response.data.filter(x => {return x.name === goal.gsfName})
								goal.progress = progressId[0]._id
	
								$http.put('api/goals/' + goal._id, goal)
									.catch(response => {
										console.log(response)
									})
							})
							.catch(response => {
								console.log(response)
							})
					}
					$state.reload()
				})
				.catch(function onError(response) {
					console.log(response)
				})
		}
	}])

}());