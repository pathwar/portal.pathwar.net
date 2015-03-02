function OrganizationService(Restangular, Organization) {

  var Organizations = Restangular.all('organizations');

    var service = {};

  service.create = function(org) {
    return Organizations.post(org);
  };

  service.getOrganizationById = function(orgId) {
    return Restangular.one('organizations', orgId).get().then(function(response) {
      return Organization.build(response.data);
    });
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
        _orgs.push(Organization.build(org.organization));
      });
      return _orgs;
    });
  };

  return service;
}

angular
  .module('portal.organizations')
  .factory('OrganizationService', OrganizationService);
