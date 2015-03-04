function NotificationService(Restangular, CurrentUserService) {
  var service = {};

  service.items = [];
  service.meta = {}; //DIRTY

  service.getNotifications = getNotifications;
  service.getUnreadNotifications = getUnreadNotifications;

  return service;

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
          angular.extend(service.meta, items.meta); //DIRTY
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
