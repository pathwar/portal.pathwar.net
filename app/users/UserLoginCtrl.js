function UserLoginCtrl(
  $scope, $state, CurrentUserService, LoggerService
) {
  var vm = this;

  vm.credentials = {};
  vm.login = login;

  function login(credentials) {
    CurrentUserService.login(credentials).then(
      function success(user) {
        console.log(LoggerService);
        LoggerService.success('Login successful ! Welcome back '+user.login+' !');
        $state.transitionTo('home.welcome');
      },
      function error(response) {
        LoggerService.errorFromResponse(response);
      }
    );
  };

}

angular
  .module('portal.users')
  .controller('UserLoginCtrl', UserLoginCtrl);
