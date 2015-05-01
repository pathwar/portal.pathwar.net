function UserResetPasswordCtrl(
  $scope, $state, UserService, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.reset = reset;
  vm.reCaptchaPublicKey = '6LfYMQYTAAAAABN2ZQm4nrLjrLqWsdglF-8NxoUq';

  function reset(credentials) {
    
    if (!credentials.reponse || credentials.response.length == 0) {
      LoggerService.error('Captcha is required');
      return 1
    }

    UserService.resetPassword(credentials).then(
      function success(result) {
        LoggerService.success('We have sent an email to '+credentials.email);
        vm.success = true;
      },
      function error(response) {
        LoggerService.errorFromResponse(response);
      }
    );
  };

}

angular
  .module('portal.users')
  .controller('UserResetPasswordCtrl', UserResetPasswordCtrl);
