function NavCtrl(
  $scope, $state, CurrentUserService, NotificationService
) {
  var vm = this;

  vm.currentUser = CurrentUserService.getUser();
  vm.organizations = CurrentUserService.getOrganizations();

  vm.isAuthentificated = CurrentUserService.isAuthentificated;
  vm.logout = logout;


  function logout() {
    CurrentUserService.logout().then(function() {
      $state.transitionTo('home');
    });
  }
}

angular
  .module('portal.controllers')
  .controller('NavCtrl', NavCtrl);
