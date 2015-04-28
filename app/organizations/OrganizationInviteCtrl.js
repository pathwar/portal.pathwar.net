function OrganizationInviteCtrl(
  $state, $stateParams, Restangular, CurrentUserService, LoggerService
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
      LoggerService.success('Invitation successfully sent !');
      $state.go('^.invites');
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationInviteCtrl', OrganizationInviteCtrl);
