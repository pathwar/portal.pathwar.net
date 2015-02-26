function ItemService(Restangular) {
  var service = {};

  service.getItems = getItems;

  return service;

  function getItems() {
    return Restangular.all('items')
      .getList();
  }
}

angular
  .module('portal.shop')
  .factory('ItemService', ItemService);
