"use strict";

function UserEditCtrl($scope, $state, $stateParams, Restangular) {
  var init = function () {
    var Users = Restangular.service("users");
    var user = Users.one($stateParams.id);

    user.get().then(function (response) {
      vm.user = response.data;
    });
  };

  var save = function (user) {
    var toSend = _.pick(user, function (value, key) {
      return key.charAt(0) != "_" || key == "_etag";
    });

    user.patch(toSend).then(function (response) {
      $state.transitionTo("users.list");
    });
  };

  var vm = this;

  vm.user = {};
  vm.save = save;

  init();

  ;
}

angular.module("portal.users").controller("UserEditCtrl", UserEditCtrl);