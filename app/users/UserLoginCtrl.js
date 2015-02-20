function UserLoginCtrl(
  $scope, $state, CurrentUserService
) {
  var vm = this;

  vm.credentials = {};
  vm.login = login;

  function login(credentials) {
    CurrentUserService.login(credentials).then(function(user) {
      $scope.setCurrentUser(user);
      $state.transitionTo('home');
    });
  };

}

angular
  .module('portal.users')
  .controller('UserLoginCtrl', UserLoginCtrl);
