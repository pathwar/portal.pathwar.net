"use strict";

function CouponService(Restangular) {
  var redeem = function (organization, coupon) {
    return Restangular.all("organization-coupons").post({
      organization: organization._id,
      coupon: coupon
    }).then(function (response) {
      return response.data;
    });
  };

  var service = {};

  service.redeemCouponForOrganization = redeem;

  return service;
}

angular.module("portal.coupons").factory("CouponService", CouponService);