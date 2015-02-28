angular
  .module('portal.organizations')
  .controller('OrganizationViewCtrl', function(
    $stateParams, Restangular, User, Organization
  ) {
    var vm = this;

    vm.organization = {};

    init();

    function init() {

      var Orgs = Restangular.service('organizations');

      Orgs.one($stateParams.id).get().then(function(response) {
        vm.organization = Organization.build(response.data);

        Restangular.all('organization-users')
          .getList({
            where: angular.toJson({
              organization: vm.organization._id
            }),
            embedded: angular.toJson({
              user: 1
            })
          })
          .then(function(users) {
            vm.organization.users = [];

            for (var i = 0; i < users.length; i++) {
              vm.organization.users.push(User.build(users[i].user));
            }
          });
      });

    }
  });
