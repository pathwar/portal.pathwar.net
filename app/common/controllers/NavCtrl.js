function NavCtrl(
  $scope, $state, CurrentUserService, NotificationService
) {
  var vm = this;

  vm.isAuthentificated = CurrentUserService.isAuthentificated;
  vm.logout = logout;

  function logout() {
    CurrentUserService.logout().then(function() {
      $scope.setCurrentUser({}); // bad
      $state.transitionTo('home');
    });
  }
}

angular
  .module('portal.controllers')
  .controller('NavCtrl', NavCtrl);
