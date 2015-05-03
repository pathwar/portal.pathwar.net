"use strict";

function UserLoginCtrl($scope, $state, CurrentUserService, LoggerService) {
  var login = function (credentials) {
    CurrentUserService.login(credentials).then(function success(user) {
      LoggerService.success("Login successful ! Welcome back " + user.login + " !");
      $state.transitionTo("home.welcome");
    }, function error(response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var vm = this;

  vm.credentials = {};
  vm.login = login;

  ;
}

angular.module("portal.users").controller("UserLoginCtrl", UserLoginCtrl);