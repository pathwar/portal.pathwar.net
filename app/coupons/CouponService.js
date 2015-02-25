function CouponService(Restangular) {
  var service = {};

  service.redeemCouponForOrganization = redeem;

  return service;

  function redeem(organization, coupon) {
    return Restangular.all('organization-coupons')
      .post({
        organization: organization._id,
        coupon: coupon
      })
      .then(function(response) {
        return response.data;
      });
  }
}

angular
  .module('portal.coupons')
  .factory('CouponService', CouponService);
