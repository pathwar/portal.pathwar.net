function OrganizationInvitesCtrl(
  $state, $stateParams, User, Restangular, CurrentUserService
) {
  var vm = this;
  vm.invites = [];

  vm.organization = {};

  init();

  function init() {

    var currentOrg = CurrentUserService.getOrganization();

    return Restangular.all('user-organization-invites').getList({
      where: JSON.stringify({
        organization: currentOrg._id,
        status: 'pending'
      }),
      embedded: JSON.stringify({
        user: 1
      })
    })
    .then(function(invites) {
      var _invites = [];
      angular.forEach(invites, function(invite) {
        invite.user = User.build(invite.user);
        _invites.push(invite);
      });
      vm.invites = _invites;
      return _invites;
    });

  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationInvitesCtrl', OrganizationInvitesCtrl);
