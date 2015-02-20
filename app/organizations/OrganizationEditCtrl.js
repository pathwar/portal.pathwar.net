function OrganizationEditCtrl(
  $state, $stateParams, Restangular
) {
  var vm = this;

  vm.organization = {};
  vm.save = save;

  init();

  function init() {
    var Orgs = Restangular.service('organizations');
    var org = Orgs.one($stateParams.id);

    org.get().then(function(response) {
      vm.organization = response.data;
    });
  }

  function save(organization) {
    var toSend = _.pick(organization, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    organization.patch(toSend).then(function(response) {
      $state.transitionTo('organizations.list');
    });
  };

}

angular
  .module('portal.organizations')
  .controller('OrganizationEditCtrl', OrganizationEditCtrl);
