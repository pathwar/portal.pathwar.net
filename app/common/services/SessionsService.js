angular
  .module('portal.services')
  .factory('SessionService', function(Restangular) {

    var Sessions = Restangular.all('sessions');

    var service = {};

    service.getSessions = function(opts) {
      return Sessions.getList();
    };

    return service;

  });
