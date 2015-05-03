"use strict";

function CouponRedeemCtrl(CouponService, CurrentUserService, LoggerService) {
  // Redeem coupon and updates stats
  var redeem = function (coupon) {
    var currentOrg = CurrentUserService.getOrganization();
    return CouponService.redeemCouponForOrganization(currentOrg, coupon.value).then(function (response) {
      LoggerService.success("Coupon successfully redeemed ! You haz more cash !");
      CurrentUserService.loadOrganizationStatistics();
    })["catch"](function (response) {
      LoggerService.errorFromResponse(response);
    });
  };

  var vm = this;

  vm.redeem = redeem;
}

angular.module("portal.coupons").controller("CouponRedeemCtrl", CouponRedeemCtrl);