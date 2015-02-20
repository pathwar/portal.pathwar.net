angular.module('portal.organizations', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular',
  'portal.services'
])
.config(function($stateProvider) {

  $stateProvider.state('organizations', {
    url: '/organizations',
    abstract: true,
    templateUrl: 'organizations/views/main.tpl.html'
  })
  .state('organizations.list', {
    url: '',
    controller: 'OrganizationListCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/list.tpl.html'
  })
  .state('organizations.view', {
    url: '/:id',
    controller: 'OrganizationViewCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/view.tpl.html'
  })
  .state('organizations.edit', {
    url: '/:id/edit',
    controller: 'OrganizationEditCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/form.tpl.html'
  })
  .state('createOrganization', {
    url: '/organization/create',
    controller: 'OrganizationCreateCtrl',
    controllerAs: 'vm',
    templateUrl: 'organizations/views/create.tpl.html'
  });

});
