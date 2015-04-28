function UserRegisterCtrl(
  $scope, $state, UserService, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.register = register;

  function register(user) {
    UserService.register(user).then(
      function success(result) {
        CurrentUserService.login(user).then(function(result) {
          LoggerService.success('Registration successful ! Welcome to Pathwar !');
          $state.go('home.welcome');
        });
      },
      function error(response) {
        LoggerService.error(response.data._error.message);
      }
    );
  };

}

angular
  .module('portal.users')
  .controller('UserRegisterCtrl', UserRegisterCtrl);
