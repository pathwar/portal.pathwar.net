function OrganizationCreateCtrl(
  $scope, $state, CurrentUserService, SessionService, OrganizationService,
  Restangular, LoggerService
) {
  var vm = this;

  vm.sessions = [];
  vm.formData = {};

  vm.create = create;

  init();

  /** Retrieve user sessions */
  function init() {
    SessionService.getSessions().then(function(sessions) {
      vm.sessions = sessions;

      //TODO: This should be in API
      angular.forEach(vm.sessions, function(session) {
        if (session.name.toLowerCase().indexOf('epitech') != -1) {
          session.avatar = 'https://scontent-cdg.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/1454848_10152220512456116_345633387238949116_n.png?oh=4f6198124f61dece076236045f590617&oe=55E305C3';
        }
        else {
          session.avatar = '//placehold.it/200x200';
        }
      });
    });
  }

  /** Create the organization */
  function create(formData) {
    var org = angular.copy(formData);
    org.session = org.session._id;

    OrganizationService.create(org).then(function(organization) {
      //TODO: This is DIRTY
        CurrentUserService.switchOrganization(organization)
          .then(CurrentUserService.loadUserInfo)
          .then(function() {
            LoggerService.success('Organization '+organization.name+' successfully created !');
            $state.go('organizations.admin.invites');
          });
    })
    .catch(function(response) {
      LoggerService.errorFromResponse(response);
    });
  };

}

angular
  .module('portal.organizations')
  .controller('OrganizationCreateCtrl', OrganizationCreateCtrl);
