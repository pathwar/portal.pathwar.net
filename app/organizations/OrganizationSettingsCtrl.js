function OrganizationSettingsCtrl(
  $state, $stateParams, CurrentUserService, Restangular, OrganizationService,
  LoggerService
) {
  var vm = this;

  vm.organization = {};
  vm.save = save;

  init();

  function init() {
    var currentUser = CurrentUserService.getUser();
    var currentOrg = CurrentUserService.getOrganization();

    OrganizationService.getMembership({
      organization: currentOrg,
      user: currentUser
    })
    .then(function(membership) {
      vm.currentUserMembership = membership;
    });

    OrganizationService.getTeamById(currentOrg._id).then(function(org) {
      vm.organization = org;
    });
  }

  function save(organization) {
    var toSend = _.pick(organization, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    Restangular.one('teams', organization._id)
    .patch(toSend).then(function(response) {
      LoggerService.success('Changes saved');
      CurrentUserService.loadUserInfo();
      $state.reload();
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationSettingsCtrl', OrganizationSettingsCtrl);
