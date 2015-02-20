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
    templateUrl: 'organizations/views/list.tpl.html'
  })
  .state('organizations.view', {
    url: '/:id',
    controller: 'OrganizationViewCtrl',
    templateUrl: 'organizations/views/view.tpl.html'
  })
  .state('organizations.edit', {
    url: '/:id/edit',
    controller: 'OrganizationEditCtrl',
    templateUrl: 'organizations/views/form.tpl.html'
  })
  .state('createOrganization', {
    url: '/organization/create',
    controller: 'OrganizationCreateCtrl',
    templateUrl: 'organizations/views/create.tpl.html'
  });

});
