function NewsService($q, $http, $sce, Restangular) {
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

    return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK', {
      params: {
        v: "1.0",
        q: "http://pathwar.tumblr.com/rss",
        num: 10
      }
    })
    .then(function(response) {
      angular.copy(response.data.responseData.feed.entries, service.news);
      angular.forEach(service.news, function(news) {
        news.content = news.contentSnippet;
        //$sce.trustAsHtml(news.content);
      });
      return service.news;
    });
  }
}

angular
  .module('portal.news')
  .factory('NewsService', NewsService);
