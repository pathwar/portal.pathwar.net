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
      .catch(function(response) {
        console.log('TODO: Handle error');
        alert(response.data._error.message);
      });
  }
}

angular
  .module('portal.coupons')
  .controller('CouponRedeemCtrl', CouponRedeemCtrl);
