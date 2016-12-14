(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject',
	function($scope, $state, $http, $stateParams, arrToObject) {

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
					$scope.goal = holder
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
			var holder = []
			var goalArr = Object.values(goal).filter(x => { return typeof(x) === 'string'})
			var newGoal = {}
			var updatedGoal = null
			if (goalArr.length) {
				var nestedObj = goal.filter(x => {return typeof(x) === 'object'})

				nestedObj.forEach(x => {
					newGoal[x.key] = x.value
				})

				updatedGoal = Object.assign(newGoal,arrToObject.create(goalArr))
			}
			else{	
				goal.forEach(x => {
					newGoal[x.key] = x.value
				})
			}

			if(updatedGoal) {
				newGoal = updatedGoal
			}
			
			$http.put('api/goals/' + $stateParams.id, newGoal)	
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