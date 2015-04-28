function CouponRedeemCtrl(
  CouponService, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.redeem = redeem;

  // Redeem coupon and updates stats
  function redeem(coupon) {
    var currentOrg = CurrentUserService.getOrganization();
    return CouponService.redeemCouponForOrganization(currentOrg, coupon.value)
      .then(function(response) {
        LoggerService.success('Coupon successfully redeemed ! You haz more cash !');
        CurrentUserService.loadOrganizationStatistics();
      })
      .catch(function(response) {
        LoggerService.error(response.data._error.message);
      });
  }
}

angular
  .module('portal.coupons')
  .controller('CouponRedeemCtrl', CouponRedeemCtrl);
