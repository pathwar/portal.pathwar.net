function NavCtrl(
  $scope, $state, CurrentUserService, NotificationService
) {
  var vm = this;

  vm.isAuthentificated = CurrentUserService.isAuthentificated;
  vm.logout = logout;

  vm.currentUser = CurrentUserService.getUser();

  function logout() {
    CurrentUserService.logout().then(function() {
      $state.transitionTo('home');
    });
  }
}

angular
  .module('portal.controllers')
  .controller('NavCtrl', NavCtrl);
