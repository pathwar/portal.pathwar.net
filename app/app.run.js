angular
  .module('portal')
  .run(function (
    $rootScope, $location, $state, CurrentUserService, Restangular, hotkeys
  ) {

    hotkeys.add({
      combo: 'r',
      description: 'Reload current state',
      callback: $state.reload
    });
    hotkeys.add({
      combo: 'g t',
      description: 'Go to team page',
      callback: function() {
        $state.go('organizations.view', {
          id: CurrentUserService.getOrganization()._id
        });
      }
    });
    hotkeys.add({
      combo: 'g l',
      description: 'Go to levels page',
      callback: function() {
        $state.go('levels.list');
      }
    });

    Restangular.setErrorInterceptor(function(
      response, deffered, responseHandler
    ) {
      if (response.status == 401) {
        $state.go('login');
      }
    });

    if (CurrentUserService.isAuthentificated()) {
      var token = CurrentUserService.getAuthToken();
      var basic = 'Basic '+window.btoa(token+':');

      console.log('set auth');
      Restangular.setDefaultHeaders({ Authorization: basic });

      CurrentUserService.loadUserInfo();
    }

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.state = toState.name;

      // TODO: State Based access definition
      if (['login', 'register'].indexOf(toState.name) == -1 && !CurrentUserService.isAuthentificated()) {
        event.preventDefault();
        $state.go('login');
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if ($location.host() == 'portal.pathwar.net') {
        var path = $location.url();
        if (window.ga) {
          window.ga('send', 'pageview', path);
        }
        //if (window._kmk) {
        //  window._kmq.push(['record', 'Pageview', { 'Page': path }]);
        //}
      }
    });

  });
