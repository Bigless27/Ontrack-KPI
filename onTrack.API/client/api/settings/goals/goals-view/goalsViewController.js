(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'scopeService', 'arrToObject',
	function($scope, $state, $http, $stateParams, scopeService, arrToObject) {

		$scope.box = false;

		$scope.tracker = 1


		// $scope.dummy = scopeService.getValue()

		// $scope.$watch(function() {return scopeService.getValue()}, function(newValue, oldValue) {
		// 	$scope.dummy = newValue
		// })

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
			var updateGoal = null
			if (goalArr.length) {
				var nestedObj = goal.filter(x => {return typeof(x) === 'object'})

				nestedObj.forEach(x => {
					newGoal[x.key] = x.value
				})

				updatedGoal = Object.assign(newGoal,arrToObject.create(goalArr))

				// var i = len/2
				// var counter = 2

				// while (i) {
				// 	var key = goal['key' + counter]
				// 	var value = goal['value' + counter]
				// 	console.log(key)
				// 	holder.push({key: value})
				// 	counter++
				// 	i --
				// }
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

	.factory('scopeService', function() {

		var model = {}
		var counter = 0

		return {
			getValue: function() {
				return model.value
			},
			updateValue: function(value) {
				model.value = value;
			}
		}
	})

	.directive('removeGoalRow', function() {
		return {
			restrict: 'E',
			template: "<div class = 'btn btn-default'>Remove a Pair</div>"
		}
	})

	.directive('addGoal', function() {
		return{
			restrict: 'E',
			template: '<div add-fields-table class = "btn btn-default">Click to add key-value pair</div>'
		}
	})


	// .directive('goalFormat', function($stateParams, $http, $compile, scopeService) {
	// 	return {
	// 		restrict: 'A',
	// 		controller: function($scope, $element, $attrs) {
	// 			function getGoal() {
	// 				var tableHtml = []	
	// 				$http.get('api/goals/' + $stateParams.id)
	// 					.success(function(data) {
	// 						scopeService.updateValue(data)
	// 						tableHtml.push(generateTable(data.any))
	// 						$('#goal').append($compile(tableHtml.join(''))($scope))
	// 					})
	// 					.error(function(err) {
	// 						console.log(err)
	// 					})
	// 			}

	// 			function generateTable(goal) {
	// 				var keys = Object.keys(goal)
	// 				var values  = Object.values(goal)

	// 				var tableLayout = "<table class = 'table table-bordered'>" +
	// 				"<tr>" +
	// 						"<th>Key</th>" +
	// 						"<th>Value</th>" +
	// 				"</tr>" +
	// 				rowCreator(keys, values) +
	// 				"</table>"

	// 				return tableLayout
	// 			}

	// 			function rowCreator(keys, values) {
	// 				var formedColumns = []

	// 				keys.forEach(function(key, i) {
	// 					formedColumns.push(
	// 						"<tr>" +  
	// 						"<td class = editable>" + "<span ng-if = '!box'>" + key + "</span>" + "<input ng-if = 'box' ng-model = 'dummy.any[0][key]'>" + "</td>" +
	// 						"<td class = editable>" + "<span ng-if = '!box'>" + values[i] + "</span>" + "<input ng-if = 'box' ng-model = 'dummy.any." + key + "'>" + "</td>" +
	// 						"</tr>")
	// 				})
	// 				return formedColumns.join('')
	// 			}

	// 			getGoal()
	// 		}
	// 	}
	// })
}());