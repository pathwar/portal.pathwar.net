angular
  .module('portal.shop', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('shop', {
      url: '/shop',
      controller: 'ShopCtrl',
      controllerAs: 'vm',
      templateUrl: 'shop/views/main.tpl.html'
    });

  });
