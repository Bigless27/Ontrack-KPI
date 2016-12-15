(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
	function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

		$scope.box = false;

		$scope.tracker = 1

		function getGoal() {
			$http.get('api/goals/' + $stateParams.id)
				.success(data => {
					var holder = []

					var keys = Object.keys(data.any)
				    var values = Object.values(data.any)

				    keys.forEach(function(key, i) {
				    	holder.push({'key': key, 'value': values[i]})
				    })
				    var combinedFormatted = Object.assign(holder, {'gsfName': data.gsfName})
				    console.log(combinedFormatted)
					$scope.goal = combinedFormatted
				})
				.error(err => {
					console.log(err)
				})
		} 

		getGoal()

		$scope.editGoal = function() {
			$scope.box = true
		}

		$scope.submit = function(goal) {

			var newGoal = submitFormat.kvPair(goal)

			var addedGoals = submitFormat.addGoalFormat(goal)

			updatedGoal = Object.assign(newGoal, arrToObject.create(addedGoals))
			
			$http.put('api/goals/' + $stateParams.id, updatedGoal)	
				.success(data => {
					$state.reload()
				})
				.error(err => {	
					console.log(err)
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
			}).then(function() {
				$http.delete('api/goals/' + $stateParams.id)
				.success(function(data) {
					$state.go('goals')
				})
				.error(function(err) {
					console.log(err)
				})
			}).catch(e => {})
		}
	}])

}());