"use strict";

function OrganizationListCtrl(Restangular) {
  /** Retrieve all organizations */
  /** TODO: only current session */
  var init = function () {
    Restangular.service("organizations").getList().then(function (orgs) {
      vm.organizations = orgs;
    });
  };

  var vm = this;

  vm.organizations = [];

  init();
}

angular.module("portal.organizations").controller("OrganizationListCtrl", OrganizationListCtrl);