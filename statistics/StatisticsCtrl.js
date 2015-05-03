"use strict";

function StatisticsCtrl(Restangular, CurrentUserService, Organization) {
  /** Retrieve all organizations */
  /** TODO: put this in a service */
  var init = function () {
    getOrganizationsSortedBy("cash");
    getOrganizationsSortedBy("score");
  };

  var getOrganizationsSortedBy = function (sort) {
    var currentOrg = CurrentUserService.getOrganization();
    var currentSessionId = currentOrg.session;

    return Restangular.service("organization-statistics").getList({
      sort: "-" + sort,
      where: angular.toJson({
        session: currentSessionId
      }),
      embedded: angular.toJson({
        organization: 1
      })
    }).then(function (res) {
      var _orgs = [];
      _.each(res, function (stats) {
        var org = Organization.build(stats.organization);
        delete stats.organization;
        org.statistics = stats;
        _orgs.push(org);
      });
      vm["organizations_by_" + sort] = _orgs;
    });
  };

  var vm = this;

  vm.organizations = undefined;

  init();
}

angular.module("portal.statistics").controller("StatisticsCtrl", StatisticsCtrl);