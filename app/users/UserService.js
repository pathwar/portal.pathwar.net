function UserService(Restangular) {

  var service = {};

  service.getUserById = function(id) {
    return Restangular.one('users', id).get().then(function(response) {
      return response.data;
    });
  };

  return service;
}

angular
  .module('portal.users')
  .factory('UserService', UserService);
