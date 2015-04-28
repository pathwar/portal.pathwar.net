angular.module('portal.home', [
  'ui.router',
  'templates',
  'ngAnimate',
  'portal.news'
])
.config(function($stateProvider) {

  $stateProvider
    .state('home', {
      url: '',
      abstract: true,
      templateUrl: 'home/views/main.tpl.html'
    })
    .state('home.welcome', {
      url: '/',
      controller: 'HomeCtrl',
      controllerAs: 'vm',
      templateUrl: 'home/views/welcome.tpl.html'
    });

})
.controller('HomeCtrl', function(CurrentUserService, NewsService, Restangular) {
  var vm = this;

  vm.organization = CurrentUserService.getOrganization();

  NewsService.getNews().then(function(news) {
    vm.news = NewsService.news;
  });

  var activityMessages = {
    'user-tokens-create': 'A user logged in',
    'users-create': 'A user registered',
    'organizations-create': 'An organization has been created',
    'organization-levels-create': 'An organization bought a level'
  };

  Restangular.all('activities')
    .getList()
    .then(function(activities) {

      angular.forEach(activities, function(activity) {
        activity.message = activityMessages[activity.action] || activity.action;
      });
      console.log(activities);
      
      vm.activities = activities;
    })

});
