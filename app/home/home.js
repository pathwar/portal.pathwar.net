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
  vm.news = NewsService.news;

  NewsService.getNews().then(function(news) {
    console.log(news);
  });

  Restangular.all('activities')
    .getList()
    .then(function(activities) {
      vm.activities = activities;
      console.log(activities);
    })

});
