angular
  .module('portal.services')
  .factory('CurrentUserService', function($window, AuthService) {

    var service = {};

    var storage = {
      authToken: null,
      user: null,
      organization: null
    };

    // User Object
    service.setUser = function(user) {
      storage.user = user;
      persist();
    };

    service.getUser = function() {
      return storage.user;
    };

    // Authentification

    service.setAuthToken = function(token) {
      storage.authToken = token;
      persist();
    };

    service.getAuthToken = function() { return storage.authToken; }

    service.login = function(credentials) {
      return AuthService.login(credentials).then(function(token) {
        service.setAuthToken(token);
      });
    };

    service.logout = function() {
      return AuthService.logout().then(function() {
        service.clear();
      });
    };

    service.isAuthentificated = function() {
      return service.getAuthToken() != undefined;
    };

    // Current Organization
    service.switchOrganization = function(org) {
      storage.organization = org;
      persist();
    };

    service.getOrganization = function() {
      return storage.organization;
    };

    // Persistency
    service.restore = function() {
      var currentUser = $window.localStorage.getItem('currentUser');
      if (currentUser) {
        storage = JSON.parse(currentUser);
      }
    };

    service.clear = function() {
      $window.localStorage.removeItem('currentUser');
    };

    return service;

    //

    function persist() {
      $window.localStorage.setItem('currentUser', JSON.stringify(storage));
    }

  });
