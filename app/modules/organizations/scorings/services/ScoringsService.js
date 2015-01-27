angular
.module('portal.organizations')
.factory('ScoringsService', function(Restangular) {

  var service = {};

  service.getScoringByOrganizationId = function(orgId) {
    return Restangular.all('scorings').getList({
      where: JSON.stringify({
        organization: orgId
      })
    })
    .then(function(scorings) {
      return scorings[0] || {};
    });
  };

  return service;
});
