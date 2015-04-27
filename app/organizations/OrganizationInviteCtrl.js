function OrganizationInviteCtrl(
  $state, $stateParams, Restangular, CurrentUserService
) {
  var vm = this;

  vm.invites = [];
  vm.invite = invite;
  vm.add = add;

  init();

  function init() {

    add();

  }

  function add() {
    var currentOrg = CurrentUserService.getOrganization();

    vm.invites.push({
      user: "",
      organization: currentOrg._id
    });
  }

  function invite(invites) {
    Restangular.all('user-organization-invites').post(invites)
    .then(function(res) {
      $state.go('^.invites');
    });
  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationInviteCtrl', OrganizationInviteCtrl);
