function ShopCtrl(ItemService, CurrentUserService) {
  var vm = this;

  vm.items = [];
  vm.buyItem = buyItem;

  var currentOrg = CurrentUserService.getOrganization();

  init();

  function init() {
    ItemService
      .getItems()
      .then(function(items) {
        vm.items = items;
      });
  }

  function buyItem(item) {
    ItemService
      .buyItemForOrganization(item, currentOrg)
      .then(function(result) {
        item.bought = true;
        // console.log(result);
        // FIXME: reload currentuser items
      });
  }

}

angular
  .module('portal.shop')
  .controller('ShopCtrl', ShopCtrl);
