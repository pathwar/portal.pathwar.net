angular
  .module('portal.users')
  .controller('UserEditCtrl', function(
    $scope, $state, $stateParams, Restangular
  ) {

    var Users = Restangular.service('users');
    var user = Users.one($stateParams.id);

    user.get().then(function(response) {
      $scope.user = response.data;
    });

    $scope.save = function() {
      var toSend = _.pick($scope.user, function(value, key) {
        return key.charAt(0) != '_' || key == '_etag';
      });

      user.patch(toSend).then(function(response) {
        $state.transitionTo('users.list');
      });
    };

  });
