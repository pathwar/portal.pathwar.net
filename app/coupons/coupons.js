angular
  .module('portal.coupons', [
    'ui.router',
    'templates',
    'ngAnimate',
    'restangular',
    'portal.services'
  ])
  .config(function($stateProvider) {

    $stateProvider.state('coupons', {
      url: '/coupons',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('coupons.redeem', {
      url: '/redeem',
      controller: 'CouponRedeemCtrl',
      controllerAs: 'vm',
      templateUrl: 'coupons/views/redeem.tpl.html'
    });

  });
