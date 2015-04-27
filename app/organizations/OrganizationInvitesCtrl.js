function OrganizationInvitesCtrl(
  $q, $state, $stateParams, User, Restangular, CurrentUserService
) {
  var vm = this;
  //vm.pending_invites = null;
  //vm.accepted_invites = null;

  init();

  function init() {
    fetchInvites();
  }

  function fetchInvites() {
      var currentOrg = CurrentUserService.getOrganization();

      $q.all([
        getInvitesByOrganizationId(currentOrg._id, {status: 'pending'}),
        getInvitesByOrganizationId(currentOrg._id, {status: 'accepted'}),
      ])
      .then(function(results) {

        var pending_invites = [];
        var accepted_invites = [];

        angular.forEach(results[0], function(invite) {
          invite.user = User.build(invite.user);
          pending_invites.push(invite);
        });

        angular.forEach(results[1], function(invite) {
          invite.user = User.build(invite.user);
          accepted_invites.push(invite);
        });

        vm.pending_invites = pending_invites;
        vm.accepted_invites = accepted_invites;

        return results;
      });
  }


    //TODO: put this in a service
    function getInvitesByOrganizationId(orgId, opts) {
      var opts = opts || {};
      var where = {
        organization: orgId
      };

      if (opts.status) {
        where.status = opts.status;
      }

      return Restangular.all('user-organization-invites').getList({
        where: JSON.stringify(where),
        embedded: JSON.stringify({
          user: 1
        })
      });
    }

}

angular
  .module('portal.organizations')
  .controller('OrganizationInvitesCtrl', OrganizationInvitesCtrl);
