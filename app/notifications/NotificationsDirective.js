function NotificationDirective() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'notifications/notificationsDirective.tpl.html',
    controller: NotificationDirectiveCtrl,
    controllerAs: 'vm',
    bindToController: true,
    link: link,
  };

  return directive;

  function link(scope, element, attrs) {
    //console.log('linked');
  }
}

// @ngInject
function NotificationDirectiveCtrl($scope, $state, NotificationService) {
  var vm = this;

  vm.notifications = NotificationService.items;
  vm.viewNotification = viewNotification;

  init();

  function init() {
    NotificationService.getNotifications();

    $scope.$on('$destroy', function() {
      NotificationService.markAsAllRead();
    });
  }

  function viewNotification(notification) {
    var state = NotificationService.resolveState(notification);

    if (state) {
      $state.go(state.name, state.params);
    }
  }
}

function NotificationCountDirective() {
    var directive = {
      restrict: 'EA',
      controller: NotificationCountDirectiveCtrl,
      controllerAs: 'vm',
      bindToController: true,
      link: link,
    };

    return directive;

    function link(scope, element, attrs) {
      //console.log('linked');
    }
}

// @ngInject
function NotificationCountDirectiveCtrl(NotificationService) {
  var vm = this;

  vm.getUnreadNotificationsCount = NotificationService.getUnreadNotificationsCount;

  init();

  function init() {
    NotificationService.getUnreadNotifications();
  }
}

angular
  .module('portal.notifications')
  .directive('notificationsCount', NotificationCountDirective)
  .directive('notifications', NotificationDirective);
