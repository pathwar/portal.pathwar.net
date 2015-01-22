var services = angular.module('portal.services');

//TODO: Use UserService
services.factory('AuthService', function($q, Restangular, $window) {

  var authService = {};

  authService.getAuthToken = function() {
    //TODO: Add this in UserService
    return $window.localStorage.getItem('user_token');
  };

  authService.isAuthentificated = authService.getAuthToken;

  authService.login = function(credentials) {
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
        //TODO: Add logic in UserService
        $window.localStorage.setItem('user_token', token.data.token);
        Restangular.setDefaultHeaders({ Authorization: "Basic "+window.btoa(token.data.token+':') });
        return token;
      });
    });
  };

  authService.logout = function() {
    return $q(function(resolve, reject) {
      $window.localStorage.removeItem('user_token');
      resolve();
    });
  };

  authService.register = function() {
    console.log('TODO: Register');
  };

  return authService;
});
