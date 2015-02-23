angular
  .module('portal')
  .run(function (
    $rootScope, $location, $state, CurrentUserService, Restangular
  ) {

    $rootScope.setCurrentUser = function(user) {
      $rootScope.currentUser = user;
    };

    Restangular.setErrorInterceptor(function(
      response, deffered, responseHandler
    ) {
      if (response.status == 401) {
        $state.go('login');
      }
    });

    console.log('restore');
    CurrentUserService.restore();

    if (CurrentUserService.isAuthentificated()) {
      var token = CurrentUserService.getAuthToken();
      var basic = 'Basic '+window.btoa(token+':');

      console.log('set auth');
      Restangular.setDefaultHeaders({ Authorization: basic });

      CurrentUserService.loadUserInfo().then(function(user) {
        $rootScope.setCurrentUser(user);
      });
    }

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.state = toState.name;

      // TODO: State Based access definition
      if (['login', 'register'].indexOf(toState.name) == -1 && !CurrentUserService.isAuthentificated()) {
        event.preventDefault();
        $state.go('login');
      }
    });

  });
