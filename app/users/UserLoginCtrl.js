angular
  .module('portal.users')
  .controller('UserLoginCtrl', function(
    $scope, $state, CurrentUserService
  ) {

    var credentials = {};

    $scope.credentials = credentials;

    $scope.login = function() {
      CurrentUserService.login($scope.credentials).then(function(user) {
        $scope.setCurrentUser(user);
        $state.transitionTo('home');
      });
    };

  });
