angular
  .module('portal.organizations')
  .factory('ScoringService', function(Restangular) {

    var service = {};

    service.getStatisticsByOrganizationId = function(orgId) {
      return Restangular.all('organization-statistics').getList({
        where: JSON.stringify({
          organization: orgId
        })
      })
      .then(function(statistics) {
        return statistics[0] || {};
      });
    };

    return service;
  });
