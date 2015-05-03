"use strict";

function UserViewCtrl($scope, $stateParams, UserService, OrganizationService) {
  var init = function () {
    UserService.getUserById($stateParams.id).then(function (user) {
      vm.user = user;
    });

    OrganizationService.getOrganizationsByUserId($stateParams.id).then(function (orgs) {
      vm.orgs = orgs;
    });
  };

  var vm = this;

  vm.user = {};
  vm.orgs = [];

  init();
}

angular.module("portal.users").controller("UserViewCtrl", UserViewCtrl);