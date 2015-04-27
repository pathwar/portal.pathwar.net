function NavCtrl(
  $scope, $state, CurrentUserService, NotificationService
) {
  var vm = this;

  vm.currentUser = CurrentUserService.getUser();
  vm.organizations = CurrentUserService.getOrganizations();
  vm.isAuthentificated = CurrentUserService.isAuthentificated;

  //TODO: SUPER UBER UGLY, should be in a disclosure, with transclude
  vm.notificationsOpened = false;
  vm.toggleNotifications = toggleNotifications;

  vm.switchOrganization = switchOrganization;
  vm.logout = logout;

  init();

  function init() {}

  function toggleNotifications() {
    if (vm.notificationsOpened == false) {
      vm.notificationsOpened = true;
    }
    else {
      vm.notificationsOpened = false;
    }
  }

  function switchOrganization(organization) {
    CurrentUserService.switchOrganization(organization);
    $state.reload();
  }

  function logout() {
    CurrentUserService.logout().then(function() {
      $state.transitionTo('login');
    });
  }
}

angular
  .module('portal.controllers')
  .controller('NavCtrl', NavCtrl);
