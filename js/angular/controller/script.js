
var mainApp = angular.module('mainApp', ['ngAnimate', 'ngMaterial', 'ui.bootstrap']);

// configure our routes

// create the controller and inject Angular's $scope
mainApp.controller('mainController', function ($scope, $timeout,$mdDialog,$mdSidenav, $mdUtil, $log) {
  	/*fab speeddial menu*/
      $scope.isOpen = false;
      $scope.selectedMode = 'md-fling';
      $scope.selectedDirection = 'down';
      
    /*dropdwon menu*/
	    var originatorEv;
		$scope.openMenu = function($mdOpenMenu, ev) {
		    originatorEv = ev;
		    $mdOpenMenu(ev);
		};
    
    
	    $scope.openChangePasswordDialog = function() { 
		    $mdDialog.show({
		      controller: 'changePassController',
		      templateUrl: 'views/change_password.html',
		      parent: angular.element(document.body),
		      targetEvent: originatorEv,
		      clickOutsideToClose:true
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
		    originatorEv = null;
	    };

	    $scope.signout = function() {
	      var signoutconfirm = $mdDialog.confirm()
		          .title('Successfully signed out')
		          //.content('All of the banks have agreed to forgive you your debts.')
		          //.ariaLabel('Lucky day')
		          .ok('Change!')
		          .cancel('cancel')
		          .targetEvent(originatorEv)
		          .clickOutsideToClose(true)
		    $mdDialog.show(signoutconfirm).then(function() {
		      console.log('Successfully signout.');
		    }, function() {
		      console.log('You decided to keep your debt.');
		    });
	      originatorEv = null;
	    };
	    
    
    /*start of right toogle bar */
		$scope.toggleRight = buildToggler('right');
			 function buildToggler(navID) {
			  var debounceFn =  $mdUtil.debounce(function(){
					$mdSidenav(navID)
					  .toggle()
					  .then(function () {
						$log.debug("toggle " + navID + " is done");
					  });
				  },200);
			  return debounceFn;
		}
		$scope.close = function () {
			  $mdSidenav('right').close()
				.then(function () {
				  $log.debug("close RIGHT is done");
				});
		};
});
mainApp.controller('changePassController', ['$scope','$mdDialog', function($scope,$mdDialog){
	$scope.change_password = function (flag) {
		if(flag=="yes"){
			console.log('password',$scope.password)
			$mdDialog.hide();
		}	
		else{
			console.log('no')
			 $mdDialog.cancel();
		}
		// body...
	}
}])