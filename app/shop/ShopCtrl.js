function ShopCtrl(ItemService) {
  var vm = this;

  vm.items = [];
  vm.buyItem = buyItem;

  init();

  function init() {
    ItemService
      .getItems()
      .then(function(items) {
        vm.items = items;
      });
  }

  function buyItem(item) {
      console.log('buying '+item._id);
  }

}

angular
  .module('portal.shop')
  .controller('ShopCtrl', ShopCtrl);
