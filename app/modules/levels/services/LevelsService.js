angular
  .module('portal.levels')
  .factory('LevelsService', function(Restangular) {

    var service = {};

    service.getLevels = function(opts) {
      return Restangular.all('levels').getList(opts || {});
    };

    return service;

  });
