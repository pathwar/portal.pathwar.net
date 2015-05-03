"use strict";

function UserInvitationsCtrl($state, $stateParams, Restangular, Organization, CurrentUserService, LoggerService) {
  var init = function () {
    //TODO: Put this in a service
    return Restangular.all("user-organization-invites").getList({
      where: JSON.stringify({
        user: $stateParams.id,
        status: "pending"
      }),
      embedded: JSON.stringify({
        organization: 1
      })
    }).then(function (invites) {
      var _invites = [];
      angular.forEach(invites, function (invite) {
        invite.organization = Organization.build(invite.organization);
        _invites.push(invite);
      });
      vm.invites = _invites;
      return _invites;
    });
  };

  var accept = function (invite) {
    //TODO: Put this in a service
    var toSend = _.pick(invite, function (value, key) {
      return key.charAt(0) != "_" || key == "_etag";
    });

    var _organization = toSend.organization;

    delete toSend.organization;
    toSend.status = "accepted";

    invite.patch(toSend).then(function (response) {
      LoggerService.success("Congratulations, you are now part of " + _organization.name);
      CurrentUserService.loadUserInfo();
      $state.reload();
    })["catch"](function (response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var deny = function (invite) {
    //TODO: Put this in a service
    var toSend = _.pick(invite, function (value, key) {
      return key.charAt(0) != "_" || key == "_etag";
    });

    delete toSend.organization;
    toSend.status = "refused";

    invite.patch(toSend).then(function (response) {
      $state.reload();
    });
  };

  var vm = this;
  vm.accept = accept;
  vm.deny = deny;

  vm.invites = {};

  init();
}

angular.module("portal.users").controller("UserInvitationsCtrl", UserInvitationsCtrl);