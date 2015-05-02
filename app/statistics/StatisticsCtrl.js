function StatisticsCtrl(
  Restangular, CurrentUserService, Organization
) {
  var vm = this;

  vm.organizations = undefined;

  init();

  /** Retrieve all organizations */
  /** TODO: put this in a service */
  function init() {
    getOrganizationsSortedBy('cash');
    getOrganizationsSortedBy('score');

  }

  function getOrganizationsSortedBy(sort) {

    var currentOrg = CurrentUserService.getOrganization();
    var currentSessionId = currentOrg.session;

    return Restangular.service('organization-statistics')
      .getList({
        sort: '-'+sort,
        where: angular.toJson({
          session: currentSessionId
        }),
        embedded: angular.toJson({
          organization: 1
        })
      }).then(function(res) {
        var _orgs = [];
        _.each(res, function(stats) {
          var org = Organization.build(stats.organization);
          delete stats.organization;
          org.statistics = stats
          _orgs.push(org);
        });
        vm['organizations_by_'+sort] = _orgs;
      });
  }
}

angular
  .module('portal.statistics')
  .controller('StatisticsCtrl', StatisticsCtrl);
