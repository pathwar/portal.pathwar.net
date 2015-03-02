function StatisticsCtrl(
  Restangular, Organization
) {
  var vm = this;

  vm.organizations = undefined;

  init();

  /** Retrieve all organizations */
  /** FIXME: Dummy listing for now */
  function init() {
    Restangular.service('organizations')
      .getList().then(function(orgs) {
        var _orgs = [];
        _.each(orgs, function(org) {
          _orgs.push(Organization.build(org));
        });
        vm.organizations = _orgs;
      });
  }
}

angular
  .module('portal.statistics')
  .controller('StatisticsCtrl', StatisticsCtrl);
