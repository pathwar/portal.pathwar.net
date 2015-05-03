"use strict";

function CouponRedeemDirective() {
  var directive = {
    restrict: "EA",
    templateUrl: "coupons/views/redeem.tpl.html",
    scope: {
      level: "="
    },
    controller: "CouponRedeemCtrl",
    controllerAs: "vm",
    bindToController: true
  };

  return directive;
}

angular.module("portal.coupons").directive("pwCouponRedeem", CouponRedeemDirective);