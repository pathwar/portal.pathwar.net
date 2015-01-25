angular
  .module('portal.users')
  .factory('UsersService', function(Restangular) {

    var service = {};

    service.getUserById = function(id) {
      return Restangular.one('users', id).get().then(function(response) {
        return response.data;
      });
    }

    return service;

  });
