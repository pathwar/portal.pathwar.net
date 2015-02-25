function UserRegisterCtrl(
  $scope, $state, UserService, CurrentUserService,
) {
  var vm = this;

  vm.register = register;

  function register(user) {
    UserService.register(user).then(function(result) {
      CurrentUserService.login(user).then(function(result) {
        $state.go('home');
      });
      console.log(result);
      console.log('user created');
    });
  };

}

angular
  .module('portal.users')
  .controller('UserRegisterCtrl', UserRegisterCtrl);
