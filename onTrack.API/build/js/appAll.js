(function() {
	angular.module('onTrack', ['ui.router', 'ui.bootstrap.showErrors'])
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
					.state('client', {
						url: '/client/:id',
						templateUrl: 'client/api/client/client-partial.html',
						controller: 'ClientController'
					})
					.state('kpi', {
						url: '/client/:clientid/kpis/:kpiid',
						templateUrl: 'client/api/kpi/kpi-partial.html',
						controller: 'KPIController'
					})
					.state('client.kpiCreate', {
						url: '/client/:id',
						templateUrl: 'client/api/kpi/kpi-create-partial.html',
						controller: 'ClientController'
					})
					.state('promotion', {
						url: '/client/:clientid/promotions/:promoid',
						templateUrl: 'client/api/promotions/promotions-partial.html',
						controller: 'PromotionController'
					})
					.state('client.promotionCreate', {
						url: '/client/:id',
						templateUrl: 'client/api/promotions/promotions-create-partial.html',
						controller: 'ClientController'
					})
					.state('setting', {
						url: '/client/:clientid/settings/:settingid',
						templateUrl: 'client/api/settings/settings-partial.html',
						controller: 'SettingController'
					})
					.state('client.settingCreate',{
						url: 'client/:id',
						templateUrl: 'client/api/settings/settings-create-partial.html',
						controller: 'ClientController'
					})
					.state('user', {
						url: '/user/:id',
						templateUrl: 'client/api/users/user-partial.html',
						controller: 'UsersController'
					})
			}])
}());
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
	.controller('KPIController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getKPI(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/kpis/' + $stateParams['kpiid'])
							.success(function(data) {
								console.log(data)
								$scope.kpi = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getKPI()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('ClientController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {
		

			function getClient(){
				$http.get('/api/clients/' + $stateParams['id'])
					.success(function(data) {
						$scope.client = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			getClient()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('LoginController', ['$scope', '$state', '$window', '$http',
	 function($scope, $state, $window, $http) {

			$scope.logUserIn = function(user) {
				$scope.$broadcast('show-errors-check-validity');

				if($scope.userForm.$invalid){return;}


				$http.post('auth/signin', user)
					.success(function(data) {
						$window.sessionStorage.jwt = data['token']
						$state.go('main')
					})
					.error(function(error) {
						console.log(error)
					})
			}

	}])
}());
(function() {
	angular.module('onTrack')
	.controller('MainController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {

			// $scope.me = function() {
				

			// 	var token = $window.sessionStorage['jwt']
				
			// 	$http.get('api/users/me', {
			// 		headers: {
			// 			"Authorization": `Bearer ${token}`
			// 		}
			// 	})
			// 	.success(function(data){
			// 			console.log(data)
			// 	})
			// 	.error(function(err){
			// 		console.log(err)
			// 	})
			// }
			function getClients() {
				$http.get('api/clients')
					.success(function(data) {
						$scope.clients = data
					})
					.error(function(err) {
						console.log(err);
					})
			}

			getClients()




			$scope.logout = function() {
				$window.sessionStorage.clear()
				$state.go('login')
			}
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('PromotionController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getPromotions(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/promotions/' + $stateParams['promoid'])
							.success(function(data) {
								$scope.promotion = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getPromotions()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('SettingController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getSettings(){
				$http.get('/api/clients/' + $stateParams['clientid'] 
						+ '/settings/' + $stateParams['settingid'])
							.success(function(data) {
								$scope.setting = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getSettings()

		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('SignupController', ['$scope', '$state', '$http', '$window', 
		function($scope, $state, $http, $window) {
		$scope.signUp = function(user) {
			$scope.$broadcast('show-errors-check-validity')

			if ($scope.userForm.$invalid){return;}

			$http.post('api/users', user)
				.success(function(data) {
					$window.sessionStorage.jwt = data['token']
					$state.go('main')
				})
				.error(function(error) {
					console.log(error)
				})
		}
		
	}])
}());
(function() {
	angular.module('onTrack')
	.controller('UsersController', ['$scope', '$state', '$http', '$window', '$stateParams',
		function($scope, $state, $http, $window, $stateParams) {

			function getUser(){
				$http.get('/api/users/' + $stateParams['id'])
							.success(function(data) {
								$scope.user = data;
							})
							.error(function(err) {
								console.log(err);
							})
			}

			getUser()

		
	}])
}());