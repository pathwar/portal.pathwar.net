"use strict";

function UserRegisterCtrl($scope, $state, UserService, CurrentUserService, LoggerService) {
  var register = function (user) {
    UserService.register(user).then(function success(result) {
      LoggerService.success("Registration successful !");
      vm.success = true;
    }, function error(response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var vm = this;

  vm.register = register;

  ;
}

angular.module("portal.users").controller("UserRegisterCtrl", UserRegisterCtrl);