function UserRegisterCtrl(
  $scope, $state, UserService, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.register = register;

  function register(user) {
    UserService.register(user).then(
      function success(result) {
        LoggerService.success('Registration successful !');
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
  .controller('UserRegisterCtrl', UserRegisterCtrl);
