function ItemService(Restangular) {
  var service = {};

  service.getItems = getItems;

  return service;

  function getItems() {
    return Restangular.all('items')
      .getList();
  }

  function getBoughtItems(organization) {
  return Restangular.all('organization-items')
    .getList({
      where: angular.toJson({
        organization: organization._id
      })
    });
  }

  function buyItemForOrganization(item, organization) {
    return Restangular.all('organization-items')
      .post({
        organization: organization._id,
        item: item._id
      });
  }

}

angular
  .module('portal.shop')
  .factory('ItemService', ItemService);
