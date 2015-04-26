function UserInvitationsCtrl(
  $state, $stateParams, Restangular, Organization
) {
  var vm = this;
  vm.accept = accept;
  vm.deny = deny;

  vm.invites = {};

  init();

  function init() {
    //TODO: Put this in a service
    return Restangular.all('user-organization-invites').getList({
      where: JSON.stringify({
        user: $stateParams.id,
        status: 'pending'
      }),
      embedded: JSON.stringify({
        organization: 1
      })
    })
    .then(function(invites) {
      var _invites = [];
      angular.forEach(invites, function(invite) {
        invite.organization = Organization.build(invite.organization);
        _invites.push(invite);
      });
      vm.invites = _invites;
      return _invites;
    });
  }

  function accept(invite) {
    //TODO: Put this in a service
    var toSend = _.pick(invite, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    delete toSend.organization;
    toSend.status = 'accepted';

    invite.patch(toSend).then(function(response) {
      // TODO: confirmation
      $state.reload();
    });

  }

  function deny(invite) {
    //TODO: Put this in a service
    var toSend = _.pick(invite, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    delete toSend.organization;
    toSend.status = 'refused';

    invite.patch(toSend).then(function(response) {
      $state.reload();
    });
  }

}

angular
  .module('portal.users')
  .controller('UserInvitationsCtrl', UserInvitationsCtrl);
