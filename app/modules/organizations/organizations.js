var organizations = angular.module('portal.organizations', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular']);

organizations.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    abstract: true,
    templateUrl: 'modules/organizations/views/main.tpl.html'
  })
  .state('organizations.list', {
    url: '',
    controller: 'OrganizationsListCtrl',
    templateUrl: 'modules/organizations/views/list.tpl.html',
  })
  .state('organizations.view', {
    url: '/:id',
    controller: 'OrganizationsViewCtrl',
    templateUrl: 'modules/organizations/views/view.tpl.html',
  })
  .state('organizations.add', {
    url: '/add',
    controller: 'OrganizationsAddCtrl',
    templateUrl: 'modules/organizations/views/form.tpl.html',
  })
  .state('organizations.edit', {
    url: '/:id/edit',
    controller: 'OrganizationsEditCtrl',
    templateUrl: 'modules/organizations/views/form.tpl.html',
  });

});

organizations.controller('OrganizationsListCtrl', function($scope, Restangular) {

  var Orgs = Restangular.service('organizations');

  $scope.organizations = Orgs.getList().$object;

});

organizations.controller('OrganizationsViewCtrl', function($scope, $stateParams, Restangular) {

  var Orgs = Restangular.service('organizations');

  Orgs.one($stateParams.id).get().then(function(response) {
    $scope.organization = response.data;
  });


});

organizations.controller('OrganizationsAddCtrl', function($scope, $state, Restangular) {

  var Orgs = Restangular.service('organizations');

  $scope.organization = {};

  $scope.save = function() {
    Orgs.post($scope.organization).then(function(response) {
      $state.transitionTo('organizations.list');
    });
  };

});

organizations.controller('OrganizationsEditCtrl', function($scope, $state, $stateParams, Restangular) {

  var Orgs = Restangular.service('organizations');
  var organization = Orgs.one($stateParams.id);

  organization.get().then(function(response) {
    $scope.organization = response.data;
  });

  $scope.save = function() {
    var toSend = _.pick($scope.organization, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    organization.patch(toSend).then(function(response) {
      $state.transitionTo('organizations.list');
    });
  };

});
