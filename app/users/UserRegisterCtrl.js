function UserRegisterCtrl(
  $scope, $state, UserService, CurrentUserService,
) {
  var vm = this;

  vm.register = register;

  function register(user) {
    UserService.register(user).then(
      function success(result) {
        CurrentUserService.login(user).then(function(result) {
          $state.go('home.welcome');
        });
      },
      function error(response) {
        alert(response.data._error.message);
      }
    );
  };

}

angular
  .module('portal.users')
  .controller('UserRegisterCtrl', UserRegisterCtrl);
