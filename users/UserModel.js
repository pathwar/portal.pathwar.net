"use strict";

function UserModel() {
  var User = function () {};

  User.prototype.getAvatarUrl = function () {
    var size = arguments[0] === undefined ? 32 : arguments[0];
    return "https://www.gravatar.com/avatar/" + this.gravatar_hash + "?s=" + size + "&d=mm";
  };

  User.build = function (data) {
    var user = new User();
    angular.extend(user, data);
    return user;
  };

  return User;
}

angular.module("portal.users").factory("User", UserModel);