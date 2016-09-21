(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$window', '$http', '$stateParams',
	 function($scope, $state, $window, $http, $stateParams) {

			$scope.userId = $stateParams['id']

			$scope.myList = [{
				    listValue: "sale"
			      }, {
			        listValue: "attendance"
			      }, {
			        listValue: "calls"
			      }, {
			        listValue: "refferals"
			 }]

			 $scope.nameList = [{
			 	listValue: "retail sale",
			 },{
			 	listValue: ""
			 }]

			 $scope.createActivity = function(activity){

			 }

	}])
}());