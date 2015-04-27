function NavCtrl(
  $scope, $state, CurrentUserService, NotificationService
) {
  var vm = this;

  vm.currentUser = CurrentUserService.getUser();
  vm.organizations = CurrentUserService.getOrganizations();
  vm.isAuthentificated = CurrentUserService.isAuthentificated;
  vm.notifications = NotificationService.items;
  vm.notificationsCount = NotificationService.meta;

  vm.switchOrganization = switchOrganization;
  vm.logout = logout;

  init();

  function init() {
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
