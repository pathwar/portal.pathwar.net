angular
  .module('portal.services')
  .factory('CurrentUserService', function($q, $window, AuthService, UsersService, OrganizationsService) {

    var service = {};

    var storage = {
      authToken: null,
      user: {},
      organization: {}
    };

    service.login = function(credentials) {

      var authentificateUser = function(credentials) {
        return AuthService.login(credentials)
        .then(function(token) {
          service.setAuthToken(token.token);
          return token.user;
        });
      };

      return authentificateUser(credentials)
              .then(service.loadUserInfo);
    };

    // Persistency
    service.restore = function() {

      var currentUser = $window.localStorage.getItem('currentUser');
      storage = JSON.parse(currentUser) || {};

      return returnStorage();
    };

    service.loadUserInfo = function (userId) {
      return loadUser(userId)
        .then(loadOrganizations)
        .then(returnStorage);
    }

    service.logout = function() {
      return AuthService.logout().then(function() {
        service.clear();
      });
    };

    service.clear = function() {
      $window.localStorage.removeItem('currentUser');
      storage = {};
    };

    // User
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

    return service;

    //

    function loadUser(userId) {
      return UsersService.getUserById(userId)
      .then(function(user) {
        service.setUser(user);
        return user;
      });
    }

    function loadOrganizations(user) {
      return OrganizationsService.getOrganizationsByUserId(user._id)
      .then(function(orgs) {
        return orgs;
      });
    }

    function returnStorage(orgs) {
      return $q(function(resolve, reject) {
        resolve(storage);
      });
    }

    function persist() {
      $window.localStorage.setItem('currentUser', JSON.stringify(storage));
    }

  });
