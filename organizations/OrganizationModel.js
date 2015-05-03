"use strict";

function OrganizationModel() {
  var Organization = function () {};

  Organization.prototype.getAvatarUrl = function () {
    var size = arguments[0] === undefined ? 32 : arguments[0];
    return "https://www.gravatar.com/avatar/" + this.gravatar_hash + "?s=" + size + "&d=mm";
  };

  Organization.build = function (data) {
    var org = new Organization();
    angular.extend(org, data);
    return org;
  };

  return Organization;
}

angular.module("portal.organizations").factory("Organization", OrganizationModel);