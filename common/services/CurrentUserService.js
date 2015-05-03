"use strict";

function CurrentUserService($q, $window, AuthService, User, UserService, Organization, OrganizationService, ScoringService, Restangular) {
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  var loadUser = function () {
    return Restangular.one("accounts", user._id).get().then(function (response) {
      var _user = User.build(response.data);
      angular.extend(user, _user);
      persist();
      return user;
    });
  };

  var loadOrganizations = function () {
    return OrganizationService.getOrganizationsByUserId(user._id).then(function (orgs) {
      angular.copy(orgs, organizations);
      return orgs;
    });
  };

  var loadCurrentOrganization = function (orgs) {
    return $q(function (resolve, reject) {
      // default organization to the last created
      if ((user.organization === undefined || user.organization._id === undefined) && orgs[0]) {
        service.switchOrganization(orgs[0]);
      } else {
        service.switchOrganization(user.organization);
      }

      resolve();
    });
  };

  var loadOrganizationStatistics = function () {
    var orgId = user.organization._id;
    return ScoringService.getStatisticsByOrganizationId(orgId).then(function (statistics) {
      angular.extend(user.organization, { statistics: statistics });
      persist();
      return user.organization.statistics;
    });
  };

  var returnStorage = function (orgs) {
    return $q(function (resolve, reject) {
      resolve(user);
    });
  };

  var persist = function () {
    $window.localStorage.setItem("currentUser", JSON.stringify(user));
  };

  var service = {};

  var organizations = [];

  var storedUserJson = $window.localStorage.getItem("currentUser") || "{}";
  var storedUser = angular.fromJson(storedUserJson);

  var user = User.build(storedUser);
  user.authToken = storedUser.authToken;
  user.organization = Organization.build(storedUser.organization);

  service.login = function (credentials) {
    return AuthService.login(credentials).then(function (token) {
      angular.extend(user, {
        _id: token.user,
        authToken: token.token
      });
      return user;
    }).then(service.loadUserInfo);
  };

  service.loadUserInfo = function () {
    return loadUser(user._id).then(loadOrganizations).then(loadCurrentOrganization).then(returnStorage);
  };

  service.loadOrganizationStatistics = function () {
    return loadOrganizationStatistics();
  };

  // User
  service.getUser = function () {
    return user;
  };

  service.getAuthToken = function () {
    return user.authToken;
  };

  service.isAuthentificated = function () {
    return service.getAuthToken() != undefined;
  };

  // Current Organization
  service.getOrganizations = function () {
    return organizations;
  };

  service.switchOrganization = function (org) {
    user.organization = org;
    persist();
    return loadOrganizationStatistics();
  };

  service.getOrganization = function () {
    return user.organization;
  };

  service.logout = function () {
    return AuthService.logout().then(function () {
      service.clear();
    });
  };

  service.clear = function () {
    $window.localStorage.removeItem("currentUser");
    //TODO: Dirty Fix, find a better way to clear data on logout
    user.organization = undefined;
    user.authToken = null;
  };

  return service;
}

angular.module("portal.services").factory("CurrentUserService", CurrentUserService);