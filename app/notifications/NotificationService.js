function NotificationService($q, $interval, Restangular, CurrentUserService) {
  var service = {};

  service.items = [];

  service.getNotifications = getNotifications;
  service.getUnreadNotifications = getUnreadNotifications;

  service.unreadNotificationsCount = 0;
  service.getUnreadNotificationsCount = getUnreadNotificationsCount;
  service.markAsAllRead = markAsAllRead;

  var fetcher = $interval(function() {
    if (CurrentUserService.isAuthentificated()) {
      getUnreadNotifications();
    }
  }, 10000);

  return service;

  function getUnreadNotificationsCount() {
    return service.unreadNotificationsCount;
  }

  function markAsAllRead() {
    var promises = [];

    angular.forEach(service.items, function(item) {
      if (item.read == false) {
        var toSend = _.pick(item, function(value, key) {
          return key.charAt(0) != '_' || key == '_etag';
        });

        toSend.read = true;
        promises.push(item.patch(toSend));
      }
    });

    return $q.all(promises)
      .then(function(result) {
        service.unreadNotificationsCount = 0;
      });
  }

  function getUnreadNotifications() {
    return Restangular.all('user-notifications')
      .getList({
        where: JSON.stringify({
          user: CurrentUserService.getUser()._id,
          read: false
        })
      })
      .then(
        function(items) {
          service.unreadNotificationsCount = items.meta.total;
          return items;
        }
      );
  }

  function getNotifications() {
    return Restangular.all('user-notifications')
      .getList({
        where: JSON.stringify({
          user: CurrentUserService.getUser()._id
        }),
        sort: '-created'
      })
      .then(
        function(items) {
          angular.copy(items, service.items);
          return service.items;
        }
      );
  }
}

angular
  .module('portal.notifications')
  .factory('NotificationService', NotificationService);
