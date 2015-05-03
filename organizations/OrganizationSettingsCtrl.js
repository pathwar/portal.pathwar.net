"use strict";

function OrganizationSettingsCtrl($state, $stateParams, Restangular) {
  var init = function () {
    var Orgs = Restangular.service("organizations");
    var org = Orgs.one($stateParams.id);

    org.get().then(function (response) {
      vm.organization = response.data;
    });
  };

  var save = function (organization) {
    var toSend = _.pick(organization, function (value, key) {
      return key.charAt(0) != "_" || key == "_etag";
    });

    organization.patch(toSend).then(function (response) {
      $state.transitionTo("organizations.list");
    });
  };

  var vm = this;

  vm.organization = {};
  vm.save = save;

  init();

  ;
}

angular.module("portal.organizations").controller("OrganizationSettingsCtrl", OrganizationSettingsCtrl);