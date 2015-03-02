function UserLoginCtrl(
  $scope, $state, CurrentUserService
) {
  var vm = this;

  vm.credentials = {};
  vm.login = login;

  function login(credentials) {
    CurrentUserService.login(credentials).then(function(user) {
      $state.transitionTo('home.welcome');
    });
  };

}

angular
  .module('portal.users')
  .controller('UserLoginCtrl', UserLoginCtrl);
