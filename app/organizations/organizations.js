var organizations = angular.module('portal.organizations', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular',
  'portal.services']);


organizations.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    abstract: true,
    templateUrl: 'organizations/views/main.tpl.html'
  })
  .state('organizations.list', {
    url: '',
    controller: 'OrganizationsListCtrl',
    templateUrl: 'organizations/views/list.tpl.html'
  })
  .state('organizations.view', {
    url: '/:id',
    controller: 'OrganizationsViewCtrl',
    templateUrl: 'organizations/views/view.tpl.html'
  })
  .state('organizations.edit', {
    url: '/:id/edit',
    controller: 'OrganizationsEditCtrl',
    templateUrl: 'organizations/views/form.tpl.html'
  })
  .state('createOrganization', {
    url: '/organization/create',
    controller: 'OrganizationsCreateCtrl',
    templateUrl: 'organizations/views/create.tpl.html'
  });

});


organizations.controller('OrganizationsListCtrl', function(
  $scope, Restangular
) {

  var Orgs = Restangular.service('organizations');

  $scope.organizations = Orgs.getList().$object;

});


organizations.controller('OrganizationsViewCtrl', function(
  $scope, $stateParams, Restangular
) {

  var Orgs = Restangular.service('organizations');

  Orgs.one($stateParams.id).get().then(function(response) {
    $scope.organization = response.data;
  });

});


organizations.controller('OrganizationsCreateCtrl', function(
  $scope, $state, SessionsService, OrganizationsService, Restangular
) {

  SessionsService.getSessions().then(function(sessions) {
    $scope.sessions = sessions;
  });

  $scope.formData = {};

  $scope.create = function() {
    var org = angular.copy($scope.formData);
    org.session = org.session._id;

    OrganizationsService.create(org).then(function(response) {
      $state.transitionTo('crud.list');
    });
  };

});


organizations.controller('OrganizationsEditCtrl', function(
  $scope, $state, $stateParams, Restangular
) {

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
