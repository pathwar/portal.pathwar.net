function CouponRedeemCtrl(CouponService, CurrentUserService) {
  var vm = this;

  vm.redeem = redeem;

  // Redeem coupon and updates stats
  function redeem(coupon) {
    var currentOrg = CurrentUserService.getOrganization();
    return CouponService.redeemCouponForOrganization(currentOrg, coupon.value)
      .then(function(response) {
        CurrentUserService.loadOrganizationStatistics();
      })
      .catch(function(error) {
        console.log('TODO: Handle error');
      });
  }
}

angular
  .module('portal.coupons')
  .controller('CouponRedeemCtrl', CouponRedeemCtrl);
