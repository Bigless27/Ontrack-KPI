(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
	function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

		$scope.box = false;

		$scope.tracker = 1

		function getGoal() {
			$http.get('api/goals/' + $stateParams.id)
				.then(response => {
					var kvObj = submitFormat.generateKVObj(response.data.any)
				
					var combinedFormatted = Object.assign(kvObj, {'gsfName': response.data.gsfName})

					$scope.goal = combinedFormatted

				})
				.catch(response => {
					console.log(response.data)
				})
		} 

		getGoal()

		$scope.editGoal = function() {
			$scope.box = true
		}

		$scope.submit = function(goal) {

			var name = {'gsfName': goal.gsfName}
			delete goal.gsfName

			var newGoal = submitFormat.kvPair(goal)

			var addedGoals = submitFormat.addGoalFormat(goal)

			updatedGoal = Object.assign(newGoal, arrToObject.create(addedGoals), name)
			
			$http.put('api/goals/' + $stateParams.id, updatedGoal)	
				.then(response => {
					$state.reload()
				})
				.catch(response => {	
					console.log(response.data)
				})
		}

		$scope.cancel = function() {
			$scope.box = false
			$state.reload()
		}

		$scope.deleteGoal = function() {
			swal({
				title: "Are you sure?",
				text: "You will not be able to recover this goal",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				html: false
			}).then(function(response) {
				$http.delete('api/goals/' + $stateParams.id)
				.then(function(data) {
					$state.go('goals')
				})
				.catch(function(response) {
					console.log(response.data)
				})
			}).catch(e => {})
		}
	}])

}());