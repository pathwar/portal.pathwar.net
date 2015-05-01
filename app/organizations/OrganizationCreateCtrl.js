function OrganizationCreateCtrl(
  $q, $state, CurrentUserService, SessionService, OrganizationService,
  Restangular, LoggerService
) {
  var vm = this;

  vm.sessions = [];
  vm.formData = {};

  vm.create = create;

  init();

  /** Retrieve user sessions */
  function init() {
    var user = CurrentUserService.getUser();

    $q.all([
      SessionService.getPublicSessions(),
      OrganizationService.getOrganizationsByUserId(user._id)
    ]).then(function(results) {

      var sessions = results[0];
      //TODO: This should be in API
      angular.forEach(sessions, function(session) {
        if (session.name.toLowerCase().indexOf('epitech') != -1) {
          session.avatar = 'https://scontent-cdg.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/1454848_10152220512456116_345633387238949116_n.png?oh=4f6198124f61dece076236045f590617&oe=55E305C3';
        }
        else {
          session.avatar = '//placehold.it/200x200';
        }
      });

      var orgs = results[1];

      angular.forEach(orgs, function(org) {
        var sessionAlreadyIn = _.findWhere(sessions, {_id: org.session});
        if (sessionAlreadyIn) {
          sessionAlreadyIn.userHasOrganization = true;
        }
      });

      vm.sessions = sessions;
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
            LoggerService.success('You are now logged as '+organization.name);
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
