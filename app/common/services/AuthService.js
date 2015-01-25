var services = angular.module('portal.services');

//TODO: Use UserService
services.factory('AuthService', function($q, Restangular, $window) {

  var service = {};

  service.login = function(credentials) {
    var basic = credentials.username+':'+credentials.password;

    var Tokens = Restangular.all('user-tokens');

    //TODO: Add automatic fetch after a 201 HTTP response code
    return Tokens.post({is_session: true}, null, {
      Authorization: 'Basic '+window.btoa(basic)
    }).then(function(token) {
      return Restangular.one('user-tokens', token.data._id).get({}, {
        Authorization: 'Basic '+window.btoa(basic)
      })
      .then(function(token) {
        Restangular.setDefaultHeaders({ Authorization: "Basic "+window.btoa(token.data.token+':') });
        return token.data.token;
      });
    });
  };

  service.logout = function() {
    return $q(function(resolve, reject) {
      // placeholder
      resolve();
    });
  };

  return service;
});
