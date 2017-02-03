(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors', 'multipleSelect', 'multipleSelectCustomized', 'xeditable', 'ngTagsInput', 'ui.select', 
		'ngSanitize'])
	.config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider',
			function($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {

				showErrorsConfigProvider.showSuccess(true)
				
				// States
				$urlRouterProvider.otherwise('login');
				$stateProvider
					.state('login', {
						url: '/login',
						templateUrl: 'client/api/login/login-partial.html',
						controller: 'LoginController'
					})
					.state('signUp', {
						url: '/signup',
						templateUrl: 'client/api/signup/signup-partial.html',
						controller: 'SignupController'
					})
					.state('main', {
						url: '/main',
						templateUrl: 'client/api/main/main-partial.html',
						controller: 'MainController',
						onEnter: ['$state', '$stateParams', '$location', '$window', function( $state, $stateParams, $location, $window){
							if($location.search().access_token){
								$window.sessionStorage.jwt = $location.search().access_token
								$location.url($location.path())
							}
						}]
					})
					.state('main.createTeam', {
						url: '/createTeam',
						templateUrl: 'client/api/team/form/team-form-partial.html',
						controller: 'TeamFormController'
					})
					.state('promotionCreate', {
						url: '/team/promotionCreate',
						templateUrl: 'client/api/promotions/form/promotions-form-partial.html',
						controller: 'PromotionFormController'
					})
					.state('promotionCreate.goalPreview', {
						url: '/team/promotionCreate/goalView',
						templateUrl: 'client/api/promotions/goalPreviewView/goal-preview-view.html',
						controller: 'GoalPreviewController'
					})
					.state('team', {
						url: '/team/:id',
						templateUrl: 'client/api/team/team-partial.html',
						controller: 'TeamController'
					})
					.state('team.addUser', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AddUserController'
					})
					.state('team.addAdmin', {
						templateUrl:'client/api/team/admin/admin-add-partial.html',
						controller: 'AdminController'
					})
					.state('team.addPromotion', {
						templateUrl: 'client/api/promotions/promotions-add/promotions-add-partial.html',
						controller: 'PromotionAddController'
					})
					.state('team.switchOwner', {
						templateUrl: 'client/api/team/owner/owner-partial.html',
						controller: 'OwnerController'
					})
					.state('promotion', {
						url: '/promotions',
						templateUrl: 'client/api/promotions/promotions-partial.html',
						controller: 'PromotionsController'
					})
					.state('promotionView', {
						url: '/promotions/:id',
						templateUrl: 'client/api/promotions/promotion-view/promotion-view-partial.html',
						controller: 'PromotionViewController'
					})
					.state('promotionViewTeam', {
						url: '/promotions/:id/:teamId',
						templateUrl: 'client/api/promotions/promotion-view/promotion-view-partial.html',
						controller: 'PromotionViewController'
					})
					.state('user', {
						url: '/user',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UserController'
					})
					.state('user.createUser', {
						url: '/createUser',
						templateUrl: 'client/api/users/form/user-form-partial.html',
						controller: 'UserFormController'
					})
					.state('user.assignProgress', {
						url: '/progress',
						templateUrl: 'client/api/settings/progress/assign-progress/assign-progress-partial.html',
						controller: 'AssignProgressController'
					})
					.state('userView', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-view/user-view-partial.html',
						controller: 'UserViewController'
					})
					.state('userViewTeam', {
						url: '/user/:id/:teamId',
						templateUrl: 'client/api/users/user-view/user-view-partial.html',
						controller: 'UserViewController'
					})
					.state('setting', {
						url: '/settings',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'MainSettingsController'
					})
					.state('goals', {
						url: '/goals',
						templateUrl: 'client/api/settings/goals/goals-partial.html',
						controller: 'GoalsController'
					})
					.state('goals.create', {
						url: '/create',
						templateUrl: 'client/api/settings/goals/goals-form/goals-form-partial.html',
						controller: 'GoalsFormController'
					})
					.state('goalsView', {
						url: '/goals/:id',
						templateUrl: 'client/api/settings/goals/goals-view/goals-view-partial.html',
						controller: 'GoalsViewController'
					})
					.state('rewards', {
						url: '/rewards',
						templateUrl: 'client/api/settings/rewards/rewards-partial.html',
						controller: 'RewardsController'
					})
					.state('rewards.create', {
						url: '/create',
						templateUrl: 'client/api/settings/rewards/rewards-form/rewards-form-partial.html',
						controller: 'RewardsFormController'
					})
					.state('rewardsView', {
						url: '/rewards/:id',
						templateUrl: 'client/api/settings/rewards/rewards-view/rewards-view-partial.html',
						controller: 'RewardsViewController'
					})
					.state('progress', {
						url: '/progress',
						templateUrl: 'client/api/settings/progress/progress-partial.html',
						controller: 'ProgressController'
					})
					.state('progress.create', {
						url: '/create', 
						templateUrl: 'client/api/settings/progress/progress-form/progress-form-partial.html',
						controller: 'ProgressFormController'
					})
					.state('progressView', {
						url: '/progress/:id',
						templateUrl: 'client/api/settings/progress/progress-view/progress-view-partial.html',
						controller: 'ProgressViewController'
					})
					.state('progressViewUser', {
						url: '/progress/:id/:userId',
						templateUrl: 'client/api/settings/progress/progress-view/progress-view-partial.html',
						controller: 'ProgressViewController',
					})
					.state('activity', {
						url: '/activity',
						templateUrl: 'client/api/activity/activity-partial.html',
						controller: 'ActivityController'
					})
					.state('activity.create', {
						url: '/createActivity',
						templateUrl: 'client/api/activity/form/activity-form-partial.html',
						controller: 'ActivityFormController'
					})
					.state('activityView', {
						url: '/activity/:id',
						templateUrl: 'client/api/activity/activityView/activity-view-partial.html',
						controller: 'ActivityViewController'
					})
					// // look to rename this state to something a little more Restful
					// .state('activityView', {
					// 	url: '/activity/:id',
					// 	templateUrl: 'client/api/activity/view/activity-view-partial.html',
					// 	controller: 'ActivityViewController'
					// })

			}])
			.run(function(editableOptions, $rootScope, $state, $stateParams) {
			  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

			})
		// 	.factory('scopeService', function() {

		// 	var model = {}

		// 	return {
		// 		getValue: function() {
		// 			return model.value
		// 		},
		// 		updateValue: function(value) {
		// 			model.value = value;
		// 		}
		// 	}
		// })
}());
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("multiple-autocomplete-tpl.html","<div class=\"ng-ms form-item-container\">\r\n    <ul class=\"list-inline\">\r\n        <li ng-repeat=\"item in modelArr\">\r\n			<span ng-if=\"objectProperty == undefined || objectProperty == \'\'\">\r\n				{{item}} <span class=\"remove\" ng-click=\"removeAddedValues(item)\">\r\n                <i class=\"glyphicon glyphicon-remove\"></i></span>&nbsp;\r\n			</span>\r\n            <span ng-if=\"objectProperty != undefined && objectProperty != \'\'\">\r\n				{{item[objectProperty]}} <span class=\"remove\" ng-click=\"removeAddedValues(item)\">\r\n                <i class=\"glyphicon glyphicon-remove\"></i></span>&nbsp;\r\n			</span>\r\n        </li>\r\n        <li>\r\n            <input name=\"{{name}}\" ng-model=\"inputValue\" placeholder=\"\" ng-keydown=\"keyParser($event)\"\r\n                   err-msg-required=\"{{errMsgRequired}}\"\r\n                   ng-focus=\"onFocus()\" ng-blur=\"onBlur()\" ng-required=\"!modelArr.length && isRequired\"\r\n                    ng-change=\"onChange()\">\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"autocomplete-list\" ng-show=\"isFocused || isHover\" ng-mouseenter=\"onMouseEnter()\" ng-mouseleave=\"onMouseLeave()\">\r\n    <ul ng-if=\"objectProperty == undefined || objectProperty == \'\'\">\r\n        <li ng-class=\"{\'autocomplete-active\' : selectedItemIndex == $index}\"\r\n            ng-repeat=\"suggestion in suggestionsArr | filter : inputValue | filter : alreadyAddedValues\"\r\n            ng-click=\"onSuggestedItemsClick(suggestion)\" ng-mouseenter=\"mouseEnterOnItem($index)\">\r\n            {{suggestion}}\r\n        </li>\r\n    </ul>\r\n    <ul ng-if=\"objectProperty != undefined && objectProperty != \'\'\">\r\n        <li ng-class=\"{\'autocomplete-active\' : selectedItemIndex == $index}\"\r\n            ng-repeat=\"suggestion in suggestionsArr | filter : inputValue | filter : alreadyAddedValues\"\r\n            ng-click=\"onSuggestedItemsClick(suggestion)\" ng-mouseenter=\"mouseEnterOnItem($index)\">\r\n            {{suggestion[objectProperty]}}\r\n        </li>\r\n    </ul>\r\n</div>");}]);
(function () {
    //declare all modules and their dependencies.
    angular.module('multipleSelectCustomized', [
        'templates'
    ]).config(function () {

    });
}
)();
(function () {

    angular.module('multipleSelectCustomized').directive('multipleAutocompleteCustomized', [
        '$filter',
        '$http',
        function ($filter, $http) {
            return {
                restrict: 'EA',
                scope : {
                    suggestionsArr : '=?',
                    modelArr : '=ngModel',
                    apiUrl : '@',
                    beforeSelectItem : '=?',
                    afterSelectItem : '=?',
                    beforeRemoveItem : '=?',
                    afterRemoveItem : '=?'
                },
                templateUrl: 'multiple-autocomplete-tpl.html',
                link : function(scope, element, attr){
                    scope.objectProperty = attr.objectProperty;
                    scope.selectedItemIndex = 0;
                    scope.name = attr.name;
                    scope.isRequired = attr.required;
                    scope.errMsgRequired = attr.errMsgRequired;
                    scope.isHover = false;
                    scope.isFocused = false;

                    if(scope.modelArr == null || scope.modelArr == ""){
                        scope.modelArr = [];
                    }
                    scope.onFocus = function () {
                        scope.mouseEnterOnItem(0)
                        scope.isFocused = true
                    };

                    scope.onMouseEnter = function () {
                        scope.isHover = true
                    };

                    scope.onMouseLeave = function () {
                        scope.isHover = false;
                    };

                    scope.onBlur = function () {
                        scope.isFocused=false;
                    };

                    scope.onChange = function () {
                        scope.selectedItemIndex = 0;
                    };

                    scope.keyParser = function ($event) {
                        var keys = {
                            38: 'up',
                            40: 'down',
                            8 : 'backspace',
                            13: 'enter',
                            9 : 'tab',
                            27: 'esc'
                        };
                        var key = keys[$event.keyCode];
                        if(key == 'backspace' && scope.inputValue == ""){
                            if(scope.modelArr.length != 0){
                                scope.removeAddedValues(scope.modelArr[scope.modelArr.length-1]);
                                //scope.modelArr.pop();
                            }
                        }
                        else if(key == 'down'){
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if(scope.selectedItemIndex < filteredSuggestionArr.length -1)
                                scope.selectedItemIndex++;
                        }
                        else if(key == 'up' && scope.selectedItemIndex > 0){
                            scope.selectedItemIndex--;
                        }
                        else if(key == 'esc'){
                            scope.isHover = false;
                            scope.isFocused=false;
                        }
                        else if(key == 'enter'){
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if(scope.selectedItemIndex < filteredSuggestionArr.length)
                                scope.onSuggestedItemsClick(filteredSuggestionArr[scope.selectedItemIndex]);
                        }
                    };

                    scope.onSuggestedItemsClick = function (selectedValue) {
                        if(scope.beforeSelectItem && typeof(scope.beforeSelectItem) == 'function')
                            scope.beforeSelectItem(selectedValue);

                        scope.modelArr.push(selectedValue);

                        if(scope.afterSelectItem && typeof(scope.afterSelectItem) == 'function')
                            scope.afterSelectItem(selectedValue);
                        scope.inputValue = ""; 

                        // var newRenderIndex = scope.suggestionsArr.findIndex(sug => {return scope.alreadyAddedValues(sug)})
                    };

                    var isDuplicate = function (arr, item) {
                        var duplicate = false;
                        if(arr == null || arr == "")
                            return duplicate;

                        for(var i=0;i<arr.length;i++){
                            duplicate = angular.equals(arr[i], item);
                            if(duplicate)
                                break;
                        }
                        return duplicate;
                    };

                    scope.alreadyAddedValues = function (item) {
                        var isAdded = true;
                        isAdded = !isDuplicate(scope.modelArr, item);
                        return isAdded;
                    };

                    scope.removeAddedValues = function (item) {
                        if(scope.modelArr != null && scope.modelArr != "") {
                            var itemIndex = scope.modelArr.indexOf(item);
                            if (itemIndex != -1) {
                                if(scope.beforeRemoveItem && typeof(scope.beforeRemoveItem) == 'function')
                                    scope.beforeRemoveItem(item);

                                scope.modelArr.splice(itemIndex, 1);

                                if(scope.afterRemoveItem && typeof(scope.afterRemoveItem) == 'function')
                                    scope.afterRemoveItem(item);
                            }
                        }
                    };

                    scope.mouseEnterOnItem = function (index) {
                        scope.selectedItemIndex = index;

                        var filterdSuggestionsArr = scope.suggestionsArr.filter(sug => {return scope.alreadyAddedValues(sug)})

                        scope.$emit('highlight', filterdSuggestionsArr[index])
                    };
                }
            };
        }
    ]);
})();
(function() {
  var showErrorsModule;

  showErrorsModule = angular.module('ui.bootstrap.showErrors', []);

  showErrorsModule.directive('showErrors', [
    '$timeout', 'showErrorsConfig', '$interpolate', function($timeout, showErrorsConfig, $interpolate) {
      var getShowSuccess, getTrigger, linkFn;
      getTrigger = function(options) {
        var trigger;
        trigger = showErrorsConfig.trigger;
        if (options && (options.trigger != null)) {
          trigger = options.trigger;
        }
        return trigger;
      };
      getShowSuccess = function(options) {
        var showSuccess;
        showSuccess = showErrorsConfig.showSuccess;
        if (options && (options.showSuccess != null)) {
          showSuccess = options.showSuccess;
        }
        return showSuccess;
      };
      linkFn = function(scope, el, attrs, formCtrl) {
        var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses, trigger;
        blurred = false;
        options = scope.$eval(attrs.showErrors);
        showSuccess = getShowSuccess(options);
        trigger = getTrigger(options);
        inputEl = el[0].querySelector('.form-control[name]');
        inputNgEl = angular.element(inputEl);
        inputName = $interpolate(inputNgEl.attr('name') || '')(scope);
        if (!inputName) {
          throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
        }
        inputNgEl.bind(trigger, function() {
          blurred = true;
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$watch(function() {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, function(invalid) {
          if (!blurred) {
            return;
          }
          return toggleClasses(invalid);
        });
        scope.$on('show-errors-check-validity', function() {
          return toggleClasses(formCtrl[inputName].$invalid);
        });
        scope.$on('show-errors-reset', function() {
          return $timeout(function() {
            el.removeClass('has-error');
            el.removeClass('has-success');
            return blurred = false;
          }, 0, false);
        });
        return toggleClasses = function(invalid) {
          el.toggleClass('has-error', invalid);
          if (showSuccess) {
            return el.toggleClass('has-success', !invalid);
          }
        };
      };
      return {
        restrict: 'A',
        require: '^form',
        compile: function(elem, attrs) {
          if (attrs['showErrors'].indexOf('skipFormGroupCheck') === -1) {
            if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
              throw "show-errors element does not have the 'form-group' or 'input-group' class";
            }
          }
          return linkFn;
        }
      };
    }
  ]);

  showErrorsModule.provider('showErrorsConfig', function() {
    var _showSuccess, _trigger;
    _showSuccess = false;
    _trigger = 'blur';
    this.showSuccess = function(showSuccess) {
      return _showSuccess = showSuccess;
    };
    this.trigger = function(trigger) {
      return _trigger = trigger;
    };
    this.$get = function() {
      return {
        showSuccess: _showSuccess,
        trigger: _trigger
      };
    };
  });

}).call(this);

(function() {
	angular.module('onTrack')
	.directive('showErrors', function() {
		return{
			restrict: 'A',
			require: '^form',
			link: function(scope, el, attrs, formCtrl) {
				var inputEl = el[0].querySelector("[name]");
				//find text box element that has the name
				var inputNgEl = angular.element(inputEl);
				var inputName = inputNgEl.attr('name')
				// all that to get the name of input field
				inputNgEl.bind('blur', function() {
					el.toggleClass('has-error', 
						formCtrl[inputName].$invalid)
				})

				scope.$on('show-errors-check-validity', function() {
					el.toggleClass('has-error', formCtrl[inputName].$invalid)
				})
			}
		}
	})
}());
(function() {
	angular.module('onTrack')
		.factory('arrToObject', function() {
			var service = {};
			service.create = function(values) {
				var obj = {}
				while (values.length) {
					var kv = values.splice(0,2)
					obj[kv[0]] = kv[1]
				}
				return obj
			}
			return service
		})

		.factory('submitFormat', function() {
			var service = {}

			service.addGoalFormat = function(obj) {
				var goalArr = Object.values(obj).filter(x => {return typeof(x) === 'string'})
				if (goalArr) {
					return goalArr
				}
				else{
					return {}
				}
			}

			service.generateKVObj = function(obj) {
				var keys = Object.keys(obj)
				var values = Object.values(obj)

				var solution = keys.map((x,i) => {return {'key': x, 'value': values[i]}})

				return solution
			}

			service.nestedObj = function(obj) {
				 return obj.filter(x => {return typeof(x) === 'object'})
			}

			service.kvPair = function(obj) {
				service.newGoal = {}
				obj.forEach(x => { return service.newGoal[x.key] = x.value})
				return service.newGoal
			}

			return service
		})
}());
(function() {
	angular.module('onTrack')
	.controller('ActivityController', ['$scope', '$state', '$http', '$stateParams',
		function($scope, $state, $http, $stateParams) {

			$scope.filteredTeam = false

			function getRecentActivity() {
				$http.get('api/activity')
					.then(response => {

					})
					.catch(response => {
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.teams =response.data
					})
					.catch(response => {
						console.log(response)
					})
			}


			$scope.$watch(function() { return $scope.team}, function(newVal, oldVal) {
				if (newVal) {
					$scope.filterdActivityTeam = $scope.activities.filter(a => {return a.team == newVal._id})
					$scope.filteredTeam = true
				}	
			})
			
			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getActivity() {
				$http.get('api/activity')
					.then(response => {
						$scope.activities = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}


			getActivity()
			getUsers()
			getTeams()

			// getRecentActivity()
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			function getTeams() {
				$http.get('api/teams')
					.then(function onSuccess(response) {
						$scope.teams = response.data
					})
					.catch(function onError(response) {
						console.log(response);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(function onSuccess(response) {
						$scope.users = response.data
					})
					.catch(function onError(response) {
						console.log(response)
					})
			}

			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
			getUsers() 
			getTeams()
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');


				if($scope.userForm.$invalid){return;}

				$scope.err = true

				$http.post('auth/signin', user)
					.then((response) => {

						$scope.err = false
						$window.sessionStorage.jwt = response.data['token']
						$state.go('main')
					})
					.catch((response) => {
						$scope.err = true
						$scope.errMessage = response
					})
			}

	}])
}());
(function(){
	angular.module('onTrack')
	.controller('PromotionsController', ['$scope', '$state', '$http', 
		function($scope, $state, $http){

			function getPromotions() {
				$http.get('api/promotions')
					.then( response => {
						$scope.promotions = response.data
					})
					.catch( response => {
						console.log(response)
					})
			}

			getPromotions()
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}
			$scope.err = false
			$http.post('api/users', user)
				.then(function(response) {
					$scope.err = false
					$window.sessionStorage.jwt = response.data['token']
					$state.go('main')
				})
				.catch(function(reponse) {
					$scope.err = true
					$scope.errMessage = response.message
				})
		}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('TeamController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {
			
			$scope.removePromotion = function(promo) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams.id + '/removePromotion', promo, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then( response => {
					$scope.team = response.data
				})
				.catch( response => {
					console.log(response)
				})

			}

			$scope.removeAdmin = function(admin) {
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams['id'] + '/removeAdmin', admin, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$scope.team = response.data
				})
				.catch(response => {
					console.log(response)
				})
			}

			$scope.removeUser = function(user) {
				//this automatically makes two requests. Check to see if you need to remove admin as well. If not then only issue one update
				var token = $window.sessionStorage['jwt']

				$http.put('/api/teams/' + $stateParams.id + '/removeAdmin', user , {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(response => {
						$http.put('/api/teams/' + $stateParams.id + '/removeUser', user, {
								headers: {
									'Authorization': `Bearer ${token}`
								}
							})
							.then(response => {
								$scope.team = response.data
							})
							.catch(response => {
								console.log(response)
						})
					})
					.catch(reponse => {
						console.log(response)
				})
			}

			$scope.deleteTeam = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this team!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(response => {
					$http.delete('/api/teams/' + $stateParams['id'],
					 {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(response => {
						$state.go('main')
					})
					.catch(response => {
						console.log(response)
					})
				}).catch(response => {
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
				return updateTeam(data, 'name')
			}

			function updateTeam(data, field) {
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.team[field] = data

				$http.put('/api/teams/' + $stateParams['id'], $scope.team,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response)
				})

			}



			function getTeam(){
				$http.get('/api/teams/' + $stateParams['id'])
					.then(response => {
						$scope.team = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.nameArr = []
						response.data.forEach(function(team){
							$scope.nameArr.push(team.name)
						})

					})
					.catch(response => {
						console.log(response);
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = []
						response.data.forEach(function(){
							$scope.users.push({name: response.data.firstName + ' ' + response.data.lastName})
						})

					})
					.catch(response => {
						console.log(response)
					})
			}

			getTeams()
			getTeam()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainSettingsController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

	 	$scope.selectAll = function(){
	 		if($scope.user.users.length < $scope.optionsList.length){
		 		$scope.user.users = $scope.optionsList
		 		$('#user-select-button')[0].innerHTML = 'Clear'
	 		}
	 		else{
	 			$scope.user.users = []
	 			$('#user-select-button')[0].innerHTML = 'Select All'
	 		}
	 	}

	 	$scope.optionsList = []

	 	function getUsers(){
			$http.get('/api/users')
				.then(function onSucces(response) {
					response.data.forEach(function(user){
						if(user){
							$scope.optionsList.push(
									{firstName: user.firstName, lastName: user.lastName, 
										email: user.email, fullName: user.firstName + ' ' + user.lastName}
								)
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(function onError(response) {
					console.log(response)
				})
		}


	 	function loadProgressSettings(){
	 		$http.get('api/progress-settings')
	 			.then(function onSucces(response) {
	 				$scope.progressSettings = response.data
	 			})
	 			.catch(function onError(response) {
	 				console.log(response)
	 			})
	 	}


	 	getUsers()
	 	loadProgressSettings()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('AddUserController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

		$scope.add = function(data){
			var token = $window.sessionStorage['jwt']

			var team = {users:[]}

			// push users active back in
			$scope.team.users.forEach(function(user) {
				team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
			})

			// check duplicates
			data.users.forEach(function(user){
				if (team.users.filter(function(e){return e.email == user.email}).length === 0) {
				 	team.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName})
				}
			})

			$http.put('/api/teams/' + $stateParams['id'], team, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(function(response) {
				$state.reload() //look into making this two way bound

			})
			.catch(function(response) {
				console.log(response)
			})
		}



		function getTeam() {
			$http.get('/api/teams/' + $stateParams.id)
				.then(function onSuccess(response) {
					$scope.team = response.data	
					getUsers()
				})
				.catch(function onError(reponse) {
					console.log(response)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.then(function onSuccess(response) {
					response.data.forEach(function(user){
						if(user){
							var userEmails = $scope.team.users.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(function onError(response) {
					console.log(respose);
				})
		}

		$scope.optionsList = []

		getTeam()
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('UserController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getUsers()
		
	}])
}());
(function() {
	angular.module('onTrack')
		.directive('addActivity', function() {
			return{
				restrict: 'E',
				template: '<div add-fields-table class = "btn btn-default">Click to add key-value pair</div>'
			}
		})

		.directive('addButtonActivity', function() {
				return{
					restrict: 'E',
					template: '<div add-fields-activity class = "btn btn-default">Click to add key-value pair</div>'
				}
		})

		.directive('removeOneActivity', function() {
			return {
				restrict: 'E',
				template: '<div class = "btn btn-default">remove a pair</div>',
				link: function(scope, element, attrs) {
					element.bind('click', function() {
						if (!$('#space-for-buttons').children().length) {
							$('.table-removable').last().remove()
							if(scope.goal) {
								scope.goal.pop()
							}
						}
						$('#space-for-buttons').children().last().remove()
					})
				}
			}
		})

		.directive('addFieldsActivity', function($compile) {
			return function(scope, element, attrs) {

				function activityFormField(i) {
					return "<div class = 'fieldForm'>"+
					"<hr>" +
					"<form id = 'edit' name = 'activityForm' role = 'form' data-toggle = 'validator'>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'key' class = 'control-label'>Key</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'key' type = 'text' ng-model = activity.key" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key' required>" +
							"</div>"+
							"<p class= 'help-block' ng-if = 'activityForm.key.$error.required'>Key is required</p>" +
						"</div>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'value' class = control-label'>Value</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'value' type = 'text' ng-model = activity.value" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value' required>" + 
							"</div>" +
							"<p class = 'help-block' ng-if = 'activityForm.value.$error.required'>Value is required</p>" +
						"</div>" +
					"</form>" +
					"</div>"
				}
				
				if(scope.tracker < 1) {
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(activityFormField(scope.tracker))(scope))
				}

				element.bind("click", function(){
					scope.tracker++;
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(activityFormField(scope.tracker))(scope))
				})
			}
		})
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionFormController', ['$scope', '$state', '$http', '$window', '$stateParams', 'goalPreview', '$rootScope',
		function($scope, $state, $http, $window, $stateParams, goalPreview, $rootScope) {
			
			$scope.teamId = $stateParams['id']

			$scope.showGoal = false

			$scope.achievementRules = ['inclusive', 'exclusive']

			var today = new Date();
			$scope.minDate = today.toISOString();

			function getGoals(){
				$http.get('api/goals')
					.then(response => {
						$scope.goals = response.data
					})	
					.catch(response => {
						console.log(response)
					})
			} 

			getGoals()

			function getRewards() {
				$http.get('api/rewards')
					.then(response => {
						$scope.rewards = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getRewards()

			$scope.setRewards = function() {
				if(!$scope.reward) return
				else {
					$scope.typeChecker = false
					$scope.filterdRewards = $scope.rewards.filter( x => {return x.type == $scope.reward.type})
				}
			}

			$scope.typeChecker = false

			$scope.checkType = function() {
				if (!$scope.reward) {
					$scope.typeChecker = true
				}
			}

			$scope.$on('highlight', function(event, data) {
				if ($scope.goals.length == 0) return
				$state.go('promotionCreate.goalPreview')
				$scope.goalShow = true
				goalPreview.updateValue(data._id)
			})

			$scope.hideGoalPreview = function() {
				$scope.goalShow = false
				$state.go('promotionCreate')
			}

			
			$scope.submitPromotion = function(promotion) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.promotionForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']

				promotion.goals = promotion.goals.map(x => x._id)


				$http.post('api/promotions', promotion, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				.then(function(response){
						$state.go('promotion')
				})
				.catch(function(response){
					console.log(response)
				})
			}
	}])
	.service('goalPreview', function() {
		var model = {}

		return {

			getValue: function() {
				return model.value
			},
			updateValue: function(value) {
				model.value = value;
			}
		}
	})
}());
(function() {
	angular.module('onTrack')
	.controller('ActivityFormController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject',
		function($scope, $state, $http, $stateParams, arrToObject) {

			$scope.teamChecker = false

			$scope.tracker = 0;

			$scope.submit = function(data) {
				$scope.$broadcast('show-errors-check-validity');

				//not working for some reason
				// if($scope.activityForm.$invalid){return;}

				var props = {'asfName': data.name, 'team': data.team, 
					'users': data.users}
				delete data.name
				delete data.team
				delete data.users

				var data = arrToObject.create(Object.values(data))
			
				var dataJson = Object.assign(data, props)


				$http.post('api/activity', dataJson)
				.then(function onSuccess(response) {
					$state.reload()
				})
				.catch(function onError(response) {
					console.log(response)
				})
			}

			$scope.setUsers = function() {
				if(!$scope.activity.team) return
				else {
					$scope.teamChecker = false
					var usersFiltered = $scope.users.filter( x => {return x.teamId.includes($scope.activity.team._id)})
					usersFiltered.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					$scope.filteredUsers = usersFiltered
				}
			}

			$scope.checkTeam = function() {
				if (!$scope.teams) {
					$scope.teamChecker = true
				}
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.teams = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						$scope.users = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getUsers()
			getTeams()
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('ActivityViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
		function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

			$scope.box = false;

			$scope.tracker = 1

			$scope.editActivity = function() {
				$scope.box = true
			}

			$scope.cancel = function() {
				$scope.box = false
				$state.reload()
			}




			function getActivity(){
				$http.get('api/activity/' + $stateParams.id)
					.then(response => {

						var kvObj = submitFormat.generateKVObj(response.data.any)
				
						var combinedFormatted = Object.assign(kvObj, {'asfName': response.data.asfName, 'team': response.data.team, 'users': response.data.users})

						$scope.activity = combinedFormatted

						$scope.activity.users.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					})	
					.catch(response => {
						console.log(response)
					})
			}

			$scope.submit = function(activity) {
				var name = {'asfName': activity.asfName, 'team': activity.team, 'users': activity.users}
				delete activity.gsfName
				delete activity.team
				delete activity.asfName


				var newActivity = submitFormat.kvPair(activity)

				var addedActivitys = submitFormat.addGoalFormat(activity)

				updatedActivity = Object.assign(newActivity, arrToObject.create(addedActivitys), name)
				
				$http.put('api/activity/' + $stateParams.id, updatedActivity)	
					.then(response => {
						$state.reload()
					})
					.catch(response => {	
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams')
					.then(response => {
						$scope.teams = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						response.data.forEach(x => {x.fullName = `${x.firstName} ${x.lastName}`})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getUsers()
			getTeams()
			getActivity()
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('GoalPreviewController', ['$scope', '$http', '$state', 'goalPreview', 'submitFormat',
		function($scope, $http, $state, goalPreview, submitFormat) {

			$scope.$watch(function() {return goalPreview.getValue()}, function(newValue, oldValue) {
				!newValue ? $state.go('promotionCreate') : getGoal(newValue)
			})

			function getGoal(id) {
				$http.get(`/api/goals/${id}`)
					.then(response => {
						var kvObj = submitFormat.generateKVObj(response.data.any)
						
						$scope.goal = Object.assign(kvObj, {'gsfName': response.data.gsfName})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getGoal(goalPreview.getValue())
			
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('AdminController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		
		$scope.admins = true

		$scope.user = {

		 };

		$scope.uncheckAll = function() {
		    $scope.user.roles = [];
		};


		$scope.add = function(data){
				var token = $window.sessionStorage['jwt']

				var team = {admins:[], users:[]}

				$scope.team.admins.forEach(function(user) {
					team.admins.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user._id})
				})

				$scope.team.users.forEach(function(user) {
					team.users.push({id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user._id})
				})


				data.users.forEach(function(user){
					if (team.admins.filter(function(e){return e.email == user.email}).length === 0) {
					 	team.admins.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user.userId})
					}
					if(team.users.filter(function(e){return e.email == user.email}).length === 0) {
						team.users.push({id:user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userId: user.userId})
					}
				})

				$http.put('/api/teams/' + $stateParams['id'], team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(function(response) {
					$state.reload() //look into making this two way bound

				})
				.catch(function(response) {
					console.log(response.data)
				})
		}

		function getUsers(){
			$http.get('/api/users')
				.then(response => {
					response.data.forEach(function(user){
						if(user){
							var userEmails = $scope.team.admins.map(x => x.email)
							if(!userEmails.includes(user.email)) {
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, 
											email: user.email, fullName: user.firstName + ' ' + user.lastName, userId: user._id}
									)
							}
						}
						else{
							$scope.optionsList = [{name: 'No users'}]
						}
					})
				})
				.catch(response => {
					console.log(response.data);
				})
		}

		$scope.optionsList = []

		getUsers()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('TeamFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createTeam = function(data){
				$scope.$broadcast('show-errors-check-validity');

				if($scope.teamForm.$invalid){return;}

				data.promotions.map( promo => {
					promo.promoId = promo._id
				})
				
				var token = $window.sessionStorage['jwt']

				var names = $scope.teams.filter(function(team) {
					return team.name == data.name
				})

				if(names.length > 0){
					$scope.errorDisplay = true
					$scope.oops = 'Name is already taken!'
					return
				}
				else {
					$http.post('/api/teams' , data ,{
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						var teamId = {'id': response.data._id + ''}
						$state.go('team',teamId )
					})
					.catch(function onError(response) {
						$scope.errorDisplay = true
						$scope.oops = response.message
					})
				}
			}

			function getAllUsers() {
				$http.get('/api/users')
					.then(function onSuccess(response){
						response.data.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, userId: user._id,
											email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.catch(function onError(response){
						console.log(response)
					})
			}

			function getPromotions() {
				$http.get('api/promotions')
					.then( response => {
						$scope.promotions = response.data
					})
					.catch( response => {
						console.log(response)
					})
			}

			getPromotions()
			getAllUsers()

			$scope.optionsList = [];

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('OwnerController', ['$scope', '$state', '$http', '$window', '$stateParams', 
		function($scope, $state, $http, $window, $stateParams) {

			$scope.optionsList = []
			$scope.success = false

			$scope.transfer = function(data) {
				var token = $window.sessionStorage['jwt']
				$scope.team['owner'] = [data]

				$http.put('api/teams/' + $stateParams.id, $scope.team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(function(response) {
					$state.reload()
				})
				.catch(function(response) {
					console.log(response)
				}) 
			}

			// function getUsers() {
			// 	$http.get('api/users')
			// 		.success(function(users) {
			// 			users.forEach(function(user){
			// 				if(user){
			// 					if (user.email !== $scope.team.owner[0].email){
			// 						$scope.optionsList.push(
			// 								{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
			// 									email: user.email, fullName: user.firstName + ' ' + user.lastName}
			// 						)
			// 					}
			// 				}
			// 				else{
			// 					$scope.optionsList = [{name: 'No users'}]
			// 				}
			// 			})
			// 		})
			// 		.error(function(err) {
			// 			console.log(err)
			// 		})
			// }

			function getTeam() {
				$http.get('api/teams/' + $stateParams.id)
					.then(function(response) {
						$scope.team = response.data
						console.log(response.data)
						response.data.admins.forEach(function(user){
							if(user){
								if (user.email !== $scope.team.owner[0].email){
									$scope.optionsList.push(
											{firstName: user.firstName, lastName: user.lastName, userId: user._id, 
												email: user.email, fullName: user.firstName + ' ' + user.lastName}
									)
								}
							}
							else{
								$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]
							}
						})
						if ($scope.optionsList.length == 0) {
							$scope.optionsList = [{fullName: 'No Users, only admins can be owners'}]	
						}
						// getUsers()
					})
					.catch(function(response) {
						console.log(response)
					})
			}

			getTeam()
		}])
} ());
(function() {
	angular.module('onTrack')
	.controller('PromotionViewController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			//have type show on edit click
			$(document).on('click','.promotion-startDate-edit-button', function(){
				$('#promotion-startDate-edit')[0].click()
			})
			.on('click','.promotion-endDate-edit-button', function() {
				$('#promotion-endDate-edit')[0].click()
			})
			.on('click', '.promotion-edit-type-button', function() {
				$('#promotion-type-edit')[0].click()
			})
			.on('click', '.promotion-rule-edit-button', function() {
				$('#promotion-rule-edit')[0].click()
			})

			$scope.achievementRules = ['inclusive', 'exclusive']

			function setTeam() {
				if ($stateParams.teamId) {
					$scope.team = true
					$scope.teamId = $stateParams.teamId
				}
				else {
					$scope.team = false
				}

			}
			setTeam()


			$scope.updateName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updatePromotion(data, 'name')
			}


			$scope.updateType = function(data) {
				if (data === ''){
					return 'Type is required'
				}
				else if (($scope.promotion.type == data)) {
					return 
				}
				return updatePromotion(data, 'type')
			}

			$scope.updateSubtypes = function(data) {
				return updatePromotion(data,'subTypes')			
			}

			$scope.updateAchievementRule = function(data) {
				if (data === ''){
					return 'Value is required'
				}
				return updatePromotion(data, 'achievementRule')
			}

			$scope.updateDescription = function(data) {
				if (data === '') {
					return 'Description is required'
				}
				return updatePromotion(data, 'description')
			}

			$scope.updateStartDate = function(data) {
				var today = new Date();
				  if (data < today.toISOString()) {
				  	return "Start Date can't be in the past"
				  }
				  return updatePromotion(data, 'startDate')
			}

			$scope.updateEndDate = function(data) {
				if ($scope.promotion.startDate.toISOString() > data){
					return 'End date must come after start date'
				}
				return updatePromotion(data, 'endDate')
			}

			$scope.updateGoals = function(data) {
				if (!data) return

				var goals = data.map(x => x._id)
				return updatePromotionRefs(goals, 'goals')
			}

			$scope.updateRewards = function(data) {
				if (!data) return

				var rewards = data.map(x => x._id)
				return updatePromotionRefs(rewards, 'rewards')
			}

			function updatePromotionRefs(data, field) {
				var token = $window.sessionStorage['jwt']

				$scope.promotion[field] = []
				
				data.forEach(x => $scope.promotion[field].push(x))

				$http.put('api/promotions/' + $stateParams.id + '/updateRefs', $scope.promotion, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response)
				})
			}

			function updatePromotion(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.promotion[field] = data

				$http.put('/api/promotions/' + $stateParams.id, $scope.promotion,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(function onSuccess(response){
					$state.reload()
				})
				.catch(function onError(response) {
					console.log(response.data)
				})

			}


			$scope.deletePromotion = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Promotion!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/promotions/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						var teamId = {'id': $stateParams['id'] + ''}
						$state.go('promotion')
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
				})
			}

		 	$scope.afterRemoveItem = function(item) {
		 		var subStrings = $scope.subTypes.map(x => x.name)
		 		if (subStrings.includes(item.name)) {
		 			return
		 		}
		 		else{
			 		$scope.subTypes.push({name: item.name})
		 		}
		 	}

			$scope.promo = false
			$scope.reward = false

			$scope.toggleEditPromo = function() {
				$scope.promo = !$scope.promo
			}

			$scope.toggleEditReward = function() {
				$scope.reward = !$scope.reward
			}

			function getPromotion(){
				$http.get('api/promotions/' + $stateParams.id)
							.then(function onSuccess(response) {
								$scope.promotion = response.data;
								$scope.promotion['startDate'] = new Date($scope.promotion.startDate) 
								$scope.promotion['endDate'] =  new Date($scope.promotion.endDate)
								// getTypes()
							})
							.catch(function onError(response) {
								console.log(response);
							})
			}


			//this below needs to be refactored to grab the users from the team!

			function getTeams(matches) {
				//you have the setting Id
				$http.get('api/teams/' + $stateParams.id)
					.then(function onSuccess(response) {
						var theUsers = []
						response.data.users.forEach(function(user) {
							//match the user's email to the mathcing progress email
							matches.forEach(function(prog) {
								if (prog.users.map(x => x.email).includes(user.email)) {
									theUsers.push(prog.users)
								}
							})
								
						})
						var usersQuery = theUsers.reduce((x,y) => {x.concat(y)})
					})
					.catch(function onError(response){
						console.log(response.data)
					})
			}

			// This grabs progress of matching types and subtypes. The subtypes are only
			// matched if there is an exact match on them
			function matchProgressToPromotion(users) {

				var subMatchArr = []

				var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				matchedTypesUsers.forEach(function(user) {
					user['settingProgress'] = user.settingProgress.filter(set => set.type === $scope.promotion.type)
					if (user.settingProgress.length > 0) {
						subMatchArr.push(user)
					}
				})
				
				// var matchedTypesUsers = users.filter((user) => {return user.settingProgress.filter(prog =>  prog.type == $scope.promotion.type)})
				// // The above filters the users the have a progress of a matched type!
				var theProgresses = []

				subMatchArr.forEach(function(user) {
					if (!$scope.noSubtypes) {
						user.settingProgress[0].subTypes.forEach(function(sub){
							if (sub) {
								if ($scope.promotion.subTypes.includes(sub.name)) {
									theProgresses.push(user)
								}
							}
						})
					}
					else {
						var matchedProg = user.progress.filter(prog => prog.settingId === user.settingProgress[0]._id)
						user['progress'] = matchedProg
						theProgresses.push(user)
						
					}
				})
				return theProgresses
			}

			$scope.getPercentage = function(x,y) {
				if (x === 0) {
					return 0
				}
				else {
				return (x/y * 100).toFixed(2)
				}
			}

			function getGoals(){
				$http.get('api/goals')
					.then(response => {
						$scope.promoList = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getRewards() {
				$http.get('api/rewards')
					.then(response => {
						$scope.rewardsList = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getPromotion()
			getGoals()	
			getRewards()	
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionAddController',['$scope', '$state', '$http', '$stateParams', '$window',
		function($scope, $state, $http, $stateParams, $window) {

			$scope.promotions = []

			$scope.add = function(promotion) {
				var token = $window.sessionStorage['jwt']

				var team = {promotions: []}

				$scope.team.promotions.forEach( promo => {
					team.promotions.push({name: promo.name, promoId: promo._id})
				})

				promotion.forEach( p => {team.promotions.push({name: p.name, promoId: p.promoId})})


				$http.put('api/teams/' + $stateParams.id,  team, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
					.then( response => {
						var team = response.data
						response.data.promotions.forEach(promo => {
							$http.get('api/promotions/' + promo.promoId)
								.then( response => {
									var promo = response.data
									if (!promo.teamId) {
										promo.teamId = []
									}
									console.log(team)

									promo.teamId.push(team._id)

									$http.put('api/promotions/' + promo._id + '/updateRefs', promo)
										.catch(response => {
											console.log(response)
										})
								})
								.catch( response => {
									console.log(response)
								})
						})
						$state.reload()
					})
					.catch( response => {
						console.log(response)
					})

			}

			function getTeam() {
				$http.get('api/teams')
					.then(response => {
						$scope.team = response.data[0]
						getPromotions()
					})
					.catch(response => {
						console.log(response)
					})
			}

			// there may be a little bug with this on duplicates showing up after they are added
			function getPromotions() {
				$http.get('api/promotions')
					.then(response => {
						response.data.forEach(function(promo) {
							if(promo) {
								var promoIds = $scope.team.promotions.map(p => p.promoId)
								if (!promoIds.includes(promo._id)) {
									$scope.promotions.push(
											{name: promo.name, promoId: promo._id}
										)
								}
							}
							else {
								$scope.promotions = [{name: 'No Promotions available'}]
							}							
						})
					})
					.catch(response => {
						console.log(response)
					})
			}

			getTeam()
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('GoalsController', ['$scope', '$state', '$window', '$http', '$stateParams',
	function($scope, $state, $window, $http, $stateParams) {
		function getGoals() {
			$http.get('api/goals')
				.then(function onSuccess(response) {
					$scope.goals = response.data
				})
				.catch(function onError(response) {
					console.log(response)
				})
		}

		getGoals()
	}])

}());
(function() {
	angular.module('onTrack')
	.controller('UserFormController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			$scope.errorDisplay = false

			$scope.createUser = function(user) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}
				
				var duplicate = $scope.users.filter(function(x){
					return x.email == user.email
				})

				if (duplicate.length > 0){
					$scope.oops = 'Email is already taken!'
					$scope.errorDisplay = true
					return
				}
				else{
					$http.post('api/users', user)
						.then(response => {
							$state.reload()

						})
						.catch(response => {
							console.log(response)
						})
				}
			}
	}])
}());
// (function() {
// 	angular.module('onTrack')
// 	.controller('ProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
// 		function($scope, $state, $http, $window, $stateParams, $q) {
			
// 			function getProgress() {
// 				$http.get('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId)
// 					.then(response => {
// 						$scope.progress = response.data
// 						$http.get('api/progress-settings/' + response.data.settingId)
// 							.then(response => {
// 								$scope.setting = response.data
// 							})
// 							.catch(function(err) {
// 								console.log(err)
// 							})
// 					})
// 					.catch(reponse => {
// 						console.log(response)
// 					})
// 			}


// 			$scope.updateValue = function(data) {
// 				if (data < 0) {
// 					return "Value can't be negative"
// 				}
// 				updateProgress(data)
// 			}

// 			function updateProgress(data) {
// 				$scope.progress['value'] = data

// 				$http.put('api/users/' + $stateParams.id + '/progress/' + $stateParams.progressId, $scope.progress)
// 					.catch( response => {
// 						console.log(response)
// 					})

// 			}

// 			getProgress()


// 	}])
// }());
(function() {
	angular.module('onTrack')
	.controller('ProgressController', ['$scope', '$http', '$stateParams', 
		function($scope, $http, $stateParams) {

			function getProgresses() {
				$http.get('api/progress-settings')
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getProgresses()

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('RewardsController', ['$scope', '$http', '$state', 
		function($scope, $http, $state) {

			function getRewards() {
				$http.get('api/rewards')
					.then(response => {
						$scope.rewards = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			getRewards()
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('UserViewController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			$scope.deleteUser = function() {
				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this user!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(() => {
					if ($scope.teamOwners.indexOf($scope.user.email) >= 0) {
						swal({
								title: 'User is an owner of a team!',
								text: 'Please transfer ownership of team before deleting user!',
								type: 'error'
							})
						return
					}
					else {
						var token = $window.sessionStorage['jwt']
						$http.delete('/api/users/' + $stateParams.id, {
							headers: {
								'Authorization' : `Bearer ${token}`
							}
						})
						.then(response => {
							swal({
									title: 'User Deleted',
									type: 'success'
								})
							if (response.data) {
								$window.sessionStorage.clear()
								$state.go('login')
							}
							else {	
								$state.go('main')
							}
						})
						.catch(response => {
							console.log(response)
						})
					}
				})
				.catch(response =>{
					return
				})
			}


			$(document).on('click','.user-email-edit-button', function(){
				$('#user-email-edit')[0].click()
			})
			.on('click', '.user-dateJoined-edit-button', function() {
				$('#user-dateJoined-edit')[0].click()
			})

			$scope.updateFirstName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'firstName')
			}

			$scope.updateLastName = function(data) {
				if (data === ''){
					return 'Name is Required'
				}
				else if (data.length < 2){
					return 'Name must be more than one character'
				}
				return updateUser(data, 'lastName')
			}

			$scope.updateEmail = function(data) {
				if(data === ''){
					return 'Email is required'
				}
				return updateUser(data, 'email')
			}

			$scope.updateDateJoined = function(data) {
				if (data === '') {
					return 'Date Joined is required'
				}
				return updateUser(data, 'dateJoined')
			}

			function updateUser(data, field){
				var d = $q.defer();
				var token = $window.sessionStorage['jwt']
				$scope.user[field] = data

				$http.put('/api/users/' + $stateParams['id'], $scope.user,{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => {
					$state.reload()
				})
				.catch(response => {
					console.log(response)
				})
			}

			function getUser() {
				$http.get('/api/users/' + $stateParams.id)
					.then(response => {
						$scope.user = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			//ui-select
			function populateTypes() {
				$http.get('api/type-settings')
					.then(response => {
						$scope.settings = response.data
						var unUniqueTypes = $scope.settings.map(function(x){
							return x.type
						})
						$scope.typeList = [...new Set(unUniqueTypes)]
					})
					.catch(response => {
						console.log(response)
					})
			}

			function getTeams() {
				$http.get('api/teams/findTeams/' + $scope.user.email)
					.then(response => {
						if (response.data.length > 0) {
							var owners = response.data.map(x => x.owner).reduce((a, b) => a.concat(b))
							$scope.teamOwners = owners.map(x => x.email)
						}
						else {
							$scope.teamOwners = []
						}
					})
					.catch(response => {
						console.log(response)
					})
			}

			$scope.remove = function(progId) {
				var userProgId = $scope.user.userProgress.find(x => x.progressId === progId)

				$http.delete('api/user-progress/' + userProgId._id )
					.then(response => {
						$state.reload()
						
					})
					.catch(response => {
						console.log(response)
					})
			}

			function setTeam() {
				if ($stateParams.teamId) {
					$scope.team = true
					$scope.teamId = $stateParams.teamId
				}
				else {
					$scope.team = false
				}
			}

			setTeam()
			getUser()
	}])
}());
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
(function() {
	angular.module('onTrack')
	.controller('AssignProgressController', ['$scope', '$state', '$http', '$window', '$stateParams', '$q',
		function($scope, $state, $http, $window, $stateParams, $q) {

			$scope.typeChecker = false


			$scope.setProgress = function() {
				if(!$scope.progType) return
				else {
					$scope.typeChecker = false
					$scope.filterdProgress = $scope.progress.filter( x => {return x.type == $scope.progType.type})
				}
			}


			$scope.checkType = function() {
				if (!$scope.progType) {
					$scope.typeChecker = true
				}
			}

			function getProgress() {
				$http.get('api/progress-settings')
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function createUserProgress(data) {
				data.progress.forEach(progress => {
					var userProgress = {value: 0, userId: data._id,
										 progressId: progress }

					$http.post('api/user-progress', userProgress)
						.catch(response => {
							console.log(response)
						})
				})
			}

			$scope.submit = function(data) {
				data.progress.forEach(function(prog){
					data.users.forEach(function(user) {
						
						if(!user.progress.length) {
							user.progress = []
						}

						// account for adding duplicates
						var dups = user.progress.map(x => x._id)
						if (!dups.includes(prog._id)) {
							user.progress.push(prog._id)
						}

						
						$http.put(`api/users/${user.userId}/updateRefs`, user)
							.then(response => {
								$state.reload()
								createUserProgress(response.data)
							})
							.catch(response => {
								console.log(response)
							})
					})
				})
			}

			function getUsers() {
				$http.get('api/users')
					.then(response => {
						response.data.forEach(function(user){
							if(user){
								$scope.optionsList.push(
										{firstName: user.firstName, lastName: user.lastName, userId: user._id,
											email: user.email, fullName: user.firstName + ' ' + user.lastName, 
											progress: user.progress}
								)
							}
							else{
								$scope.optionsList = [{name: 'No users'}]
							}
						})
					})
					.catch(response => {
						console.log(response)
					})
			}

			$scope.optionsList = [];
			getProgress()
			getUsers()
		
	}])
}());
(function() {
	angular.module('onTrack')
		.directive('addGoal', function() {
			return{
				restrict: 'E',
				template: '<div add-fields-table class = "btn btn-default">Click to add key-value pair</div>'
			}
		})

		.directive('addButton', function() {
				return{
					restrict: 'E',
					template: '<div add-fields class = "btn btn-default">Click to add key-value pair</div>'
				}
		})

		.directive('removeOne', function() {
			return {
				restrict: 'E',
				template: '<div class = "btn btn-default">remove a pair</div>',
				link: function(scope, element, attrs) {
					element.bind('click', function() {
						if (!$('#space-for-buttons').children().length) {
							$('.table-removable').last().remove()
							if(scope.goal) {
								scope.goal.pop()
							}
						}
						$('#space-for-buttons').children().last().remove()
					})
				}
			}
		})

		.directive('addFields', function($compile) {
			return function(scope, element, attrs) {

				function goalFormField(i) {
					return "<div class = 'fieldForm'>"+
					"<hr>" +
					"<form id = 'edit' name = 'goalForm' role = 'form' data-toggle = 'validator'>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'key' class = 'control-label'>Key</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'key' type = 'text' ng-model = goal.key" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a key' required>" +
							"</div>"+
							"<p class= 'help-block' ng-if = 'goalForm.key.$error.required'>Key is required</p>" +
						"</div>" +
						"<div class = 'form-group' show-errors>" +
							"<lable for = 'value' class = control-label'>Value</label>" +
							"<div class = 'input-group'>" +
								"<span class = 'input-group-addon'><i class = 'glyphicon glyphicon-user'></i></span>" +
								"<input name = 'value' type = 'text' ng-model = goal.value" + scope.tracker + ' ' + "class = 'form-control' placeholder = 'enter a value' required>" + 
							"</div>" +
							"<p class = 'help-block' ng-if = 'goalForm.value.$error.required'>Value is required</p>" +
						"</div>" +
					"</form>" +
					"</div>"
				}
				
				if(scope.tracker < 1) {
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(goalFormField(scope.tracker))(scope))
				}

				element.bind("click", function(){
					scope.tracker++;
					angular.element(document.getElementById('space-for-buttons'))
						.append($compile(goalFormField(scope.tracker))(scope))
				})
			}
		})
}());
(function() {
	angular.module('onTrack')
	.controller('ProgressFormController', ['$scope', '$http', '$stateParams', '$window', '$state',
		function($scope, $http, $stateParams, $window, $state) {

			$scope.submit = function(data) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.progressForm.$invalid){return;}
				var token = $window.sessionStorage['jwt']
				

				var progress = Object.assign({}, data)
				
				$http.post('api/progress-settings', progress) 
				 .then(response => {
				 	$state.reload()
				 })
				 .catch(response => {
				 	console.log(response)
				 })
			}
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('RewardsFormController', ['$scope', '$http', '$state',
		function($scope, $http, $state) {

			$scope.submit = function(reward) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.rewardForm.$invalid){return;}

				$http.post('/api/rewards', reward)
					.then( response => {
						$state.reload()
					})
					.catch( response => {
						console.log(response)
					})
			}

			
		}])
}());
(function() {
	angular.module('onTrack')
	.controller('ProgressViewController', ['$scope', '$http', '$stateParams', '$state', '$window',
		function($scope, $http, $stateParams, $state, $window) {

			$scope.updateName = function(name) {
				if (!name) {
					return 'Name is required'
				}
				updateProgress('name', name)
			}

			$scope.updateType = function(type) {
				if (!type) {
					return 'Type is required'
				}
				updateProgress('type', type)
			}

			$scope.updateDescription = function(description) {
				if (!description) {
					return 'Description is required'
				}
				updateProgress('description', description)
			}

			$scope.deleteProgress = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Progress!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/progress-settings/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						$state.go('progress')
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
				})
			}

			function updateProgress(param, name) {
				$scope.progress[param] = name

				$http.put('api/progress-settings/' + $stateParams.id, $scope.progress)
					.then(response => {
						$state.reload()
					})
					.catch(response => {
						console.log(response)
					})
			}

			
			function getProgress() {
				$http.get(`api/progress-settings/${$stateParams.id}` )
					.then(response => {
						$scope.progress = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			function setUser() {
				if ($stateParams.userId) {
					$scope.user = true
					$scope.userId = $stateParams.userId
					getUser()
				}
				else {
					$scope.user = false
				}
			}

			function getUser() {
				$http.get(`api/users/${$stateParams.userId}`)
					.then(response => {
						$scope.userProgress = response.data.userProgress.filter(x => {return $stateParams.id == x.progressId})
					})
					.catch(response => {
						console.log(response)
					})
			}


			setUser()
			getProgress()
	}])
}());
(function() {
	angular.module('onTrack') 
	.controller('RewardsViewController', ['$scope', '$http', '$state', '$stateParams', '$window',
		function($scope, $http, $state, $stateParams, $window) {


			$scope.updateName = function(name) {
				if (!name) {
					return 'Name is required'
				}
				updateReward('name', name)
			}

			$scope.updateType = function(type) {
				if (!type) {
					return 'Type is required'
				}
				updateReward('type', type)
			}

			$scope.updateDescription = function(description) {
				if (!description) {
					return 'Description is required'
				}
				updateReward('description', description)
			}

			function updateReward(param, name) {
				$scope.reward[param] = name

				$http.put('api/rewards/' + $stateParams.id, $scope.reward)
					.then(response => {
						$state.reload()
					})
					.catch(response => {
						console.log(response)
					})
			}



			function getReward() {
				$http.get('api/rewards/' + $stateParams.id)
					.then(response => {
						$scope.reward = response.data
					})
					.catch(response => {
						console.log(response)
					})
			}

			$scope.deleteReward = function() {
				var token = $window.sessionStorage['jwt']

				swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this Reward!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, delete it!",
				  html: false
				}).then(function onSuccess(response){
					$http.delete('/api/rewards/' + $stateParams.id, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					})
					.then(function onSuccess(response){
						$state.go('rewards')
					})
					.catch(function onError(response) {
						console.log(response)
					})
				}).catch(function onError(response) {
					console.log(response)
				})
			}

			getReward()

		}])
}());
(function() {
	angular.module('onTrack')
	.controller('GoalsViewController', ['$scope', '$state', '$http', '$stateParams', 'arrToObject', 'submitFormat',
	function($scope, $state, $http, $stateParams, arrToObject, submitFormat) {

		$scope.box = false;

		$scope.tracker = 1

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

		function getGoal() {
			$http.get('api/goals/' + $stateParams.id)
				.then(response => {
					var kvObj = submitFormat.generateKVObj(response.data.any)
				
					var combinedFormatted = Object.assign(kvObj, {'gsfName': response.data.gsfName,
					 'progress': response.data.progress})

					$scope.goal = combinedFormatted

				})
				.catch(response => {
					console.log(response)
				})
		} 

		getGoal()

		$scope.editGoal = function() {
			$scope.box = true
		}

		$scope.submit = function(goal) {

			//bug in submitting progress from the ng-select
			//fix this logic below, refactor. wont retain value on submit
			var holder;
			if (!goal.progress) {
				if($scope.goal.progress) {
					holder = $scope.goal.progress._id
				}
			}
			else{
				holder = goal.progress.name._id
			}
			

			var name = {'gsfName': goal.gsfName, 'progress': holder}
			delete goal.gsfName
			delete goal.progress

			var newGoal = submitFormat.kvPair(goal)

			var addedGoals = submitFormat.addGoalFormat(goal)

			updatedGoal = Object.assign(newGoal, arrToObject.create(addedGoals), name)
			

			$http.put('api/goals/' + $stateParams.id, updatedGoal)	
				.then(response => {
					$state.reload()
				})
				.catch(response => {	
					console.log(response)
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
					console.log(response)
				})
			}).catch(e => {})
		}
	}])

}());