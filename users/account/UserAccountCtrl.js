"use strict";

function UserAccountCtrl($state, CurrentUserService, User, Restangular, LoggerService) {
  var init = function () {
    var user = CurrentUserService.getUser();

    Restangular.one("accounts", user._id).get().then(function (response) {
      vm.user = User.build(response.data);
    });
  };

  var save = function (user) {
    var resource = Restangular.one("accounts", user._id);

    var toSend = _.pick(user, function (value, key) {
      return key.charAt(0) != "_" || key == "_etag";
    });

    resource.patch(toSend).then(function (response) {
      LoggerService.success("Changes saved");
      user._etag = response.data._etag;
      $state.reload();
    })["catch"](function (response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var vm = this;

  vm.user = {};
  vm.save = save;

  init();

  ;
}

angular.module("portal.users").controller("UserAccountCtrl", UserAccountCtrl);