"use strict";

function ItemService(Restangular) {
  var getItems = function () {
    return Restangular.all("items").getList();
  };

  var getBoughtItems = function (organization) {
    return Restangular.all("organization-items").getList({
      where: angular.toJson({
        organization: organization._id
      })
    });
  };

  var buyItemForOrganization = function (item, organization) {
    return Restangular.all("organization-items").post({
      organization: organization._id,
      item: item._id
    });
  };

  var service = {};

  service.getItems = getItems;

  return service;
}

angular.module("portal.shop").factory("ItemService", ItemService);