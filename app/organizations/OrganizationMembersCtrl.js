function OrganizationMembersCtrl(
  $state, $stateParams, Restangular, CurrentUserService, User
) {
  var vm = this;

  vm.organization = {};
  vm.save = save;

  init();

  function init() {

    var currentOrg = CurrentUserService.getOrganization();

    return Restangular.all('organization-users').getList({
      where: JSON.stringify({
        organization: currentOrg._id
      }),
      embedded: JSON.stringify({
        user: 1
      })
    })
    .then(function(users) {
      var _users = [];
      angular.forEach(users, function(user) {
        _users.push(User.build(user.user));
      });
      vm.users = _users;
      return _users;
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
  .controller('OrganizationMembersCtrl', OrganizationMembersCtrl);
