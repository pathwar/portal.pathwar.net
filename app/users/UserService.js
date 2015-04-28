function UserService(Restangular, User) {

  var service = {};

  service.getUserById = function(id) {
    return Restangular.one('users', id).get().then(function(response) {
      return User.build(response.data);
    });
  };

  service.register = function(userModel) {
    return Restangular.all('accounts').post(userModel).then(function(response) {
      return response.data;
    });
  };

  return service;
}

angular
  .module('portal.users')
  .factory('UserService', UserService);
