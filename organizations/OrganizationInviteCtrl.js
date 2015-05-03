"use strict";

function OrganizationInviteCtrl($state, $stateParams, Restangular, CurrentUserService, LoggerService) {
  var init = function () {
    add();
  };

  var add = function () {
    var currentOrg = CurrentUserService.getOrganization();

    vm.invites.push({
      user: "",
      organization: currentOrg._id
    });
  };

  var invite = function (invites) {
    Restangular.all("user-organization-invites").post(invites).then(function (res) {
      LoggerService.success("Invitation successfully sent !");
      $state.go("^.invites");
    })["catch"](function (response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var vm = this;

  vm.invites = [];
  vm.invite = invite;
  vm.add = add;

  init();
}

angular.module("portal.organizations").controller("OrganizationInviteCtrl", OrganizationInviteCtrl);