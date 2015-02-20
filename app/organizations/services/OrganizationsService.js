angular
  .module('portal.organizations')
  .factory('OrganizationsService', function(Restangular) {

  var Organizations = Restangular.all('organizations');

    var service = {};

  service.create = function(org) {
    return Organizations.post(org);
  };

  service.getOrganizationsByUserId = function(userId) {
    return Restangular.all('organization-users').getList({
      where: JSON.stringify({
        user: userId
      }),
      embedded: JSON.stringify({
        organization: 1
      })
    })
    .then(function(orgs) {
      var _orgs = [];
      angular.forEach(orgs, function(org) {
        _orgs.push(org.organization);
      });
      return _orgs;
    });
  };

  return service;
});
