"use strict";

function NavCtrl($scope, $state, CurrentUserService, NotificationService, LoggerService) {
  var init = function () {};

  var toggleNotifications = function () {
    if (vm.notificationsOpened == false) {
      vm.notificationsOpened = true;
    } else {
      vm.notificationsOpened = false;
    }
  };

  var switchOrganization = function (organization) {
    CurrentUserService.switchOrganization(organization);
    LoggerService.success("You are now logged as " + organization.name);
    $state.reload();
  };

  var logout = function () {
    CurrentUserService.logout().then(function () {
      $state.transitionTo("login");
    });
  };

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
}

angular.module("portal.controllers").controller("NavCtrl", NavCtrl);