angular
  .module('portal.organizations')
  .factory('OrganizationsService', function(Restangular) {

  var Organizations = Restangular.all('organizations');

  var service = {}

  service.create = function(org) {
    return Organizations.post(org);
  };

  return service;
});
