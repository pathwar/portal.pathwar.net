function StatisticsCtrl(
  Restangular, Organization
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
    return Restangular.service('organization-statistics')
      .getList({
        sort: '-'+sort,
        embedded: JSON.stringify({
          organization: 1
        })
      }).then(function(res) {
        var _orgs = [];
        _.each(res, function(stats) {
          _orgs.push(Organization.build(stats.organization));
        });
        vm['organizations_by_'+sort] = _orgs;
      });
  }
}

angular
  .module('portal.statistics')
  .controller('StatisticsCtrl', StatisticsCtrl);
