function OrganizationMembersCtrl(
  $q, $state, Restangular, UserService, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.makeAdmin = makeAdmin;

  init();

  function init() {

    var currentUser = CurrentUserService.getUser();
    var currentOrg = CurrentUserService.getOrganization();

    //TODO: Put back embed when fixed on api side
    return Restangular.all('organization-users').getList({
      where: JSON.stringify({
        organization: currentOrg._id
      })
    })
    .then(function(orgMembers) {
      var _users = [];

      angular.forEach(orgMembers, function(orgMember) {
        if (orgMember.user == currentUser._id) {
          vm.currentUserMembership = orgMember;
        }
        _users.push(UserService.getUserById(orgMember.user).then(function(user) {
          orgMember.user = user;
        }));
      });

      return $q.all(_users).then(function(results) {
        vm.members = orgMembers;
        return vm.members;
      });
    });
  }

  function makeAdmin(member) {

    var toSend = _.pick(member, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });
    delete toSend.user;
    delete toSend.organization;
    toSend.role = 'owner';

    member.patch(toSend).then(function() {
      //TODO: Add Confirm
      LoggerService.success('Ownership successfully transfered');
      $state.reload();
      console.log('ok');
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  }

}

angular
  .module('portal.organizations')
  .controller('OrganizationMembersCtrl', OrganizationMembersCtrl);
