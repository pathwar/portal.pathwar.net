"use strict";

function OrganizationMembersCtrl($q, $state, $stateParams, Restangular, UserService, CurrentUserService, User) {
  var init = function () {
    var currentOrg = CurrentUserService.getOrganization();

    //TODO: Put back embed when fixed on api side
    return Restangular.all("organization-users").getList({
      where: JSON.stringify({
        organization: currentOrg._id
      })
    }).then(function (orgUsers) {
      var _users = [];

      angular.forEach(orgUsers, function (orgUser) {
        _users.push(UserService.getUserById(orgUser.user));
      });

      return $q.all(_users).then(function (results) {
        vm.users = results;
        return vm.users;
      });
    });
  };

  var vm = this;

  vm.organization = {};

  init();
}

angular.module("portal.organizations").controller("OrganizationMembersCtrl", OrganizationMembersCtrl);