function OrganizationInviteCtrl(
  $state, $stateParams, Restangular
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
    vm.invites.push({});
  }

  function invite(invites) {
    Restangular.all('user-organization-invites').post({
      user: invites[0].handle,
      organization: $stateParams.id
    })
    .then(function(res) {
      console.log(res);
    });
  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationInviteCtrl', OrganizationInviteCtrl);
