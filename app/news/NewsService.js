function NewsService($q, Restangular) {
  var service = {};

  service.news = [];
  service.getNews = getNews;

  return service;

  function getFakeNews() {
    return $q(function(resolve, reject) {
      resolve(
        [{
          title: 'New levels',
          content: 'We just added 50 new exclusive levels. Ready, Steady, Hack !',
          created: new Date()
        }, {
          title: 'Welcome',
          content: 'Welcome to the Epitech 2015 Session. This year, we build a entire new platform to turn into real hackerz. Enjoy !',
          created: new Date()
        }]
      );
    });
  }

  function getNews() {
    return $q(function(resolve, reject) {
      resolve(
        getFakeNews().then(function(news) {
          angular.copy(news, service.news);
          return service.news;
        })
      );
    });
  }
}

angular
  .module('portal.news')
  .factory('NewsService', NewsService);
