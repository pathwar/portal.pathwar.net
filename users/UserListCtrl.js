"use strict";

function UserListCtrl($scope, Restangular) {
  var init = function () {
    var Users = Restangular.service("users");

    Users.getList().then(function (users) {
      vm.users = users;
    });
  };

  var vm = this;

  vm.users = [];

  init();
}

angular.module("portal.users").controller("UserListCtrl", UserListCtrl);