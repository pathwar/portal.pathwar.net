"use strict";

function ShopCtrl(ItemService, CurrentUserService) {
  var init = function () {
    ItemService.getItems().then(function (items) {
      vm.items = items;
    });
  };

  var buyItem = function (item) {
    ItemService.buyItemForOrganization(item, currentOrg).then(function (result) {
      item.bought = true;
      console.log(result);
      //reload currentuser items
    });
  };

  var vm = this;

  vm.items = [];
  vm.buyItem = buyItem;

  var currentOrg = CurrentUserService.getOrganization();

  init();
}

angular.module("portal.shop").controller("ShopCtrl", ShopCtrl);