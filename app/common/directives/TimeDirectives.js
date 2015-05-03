function pwTimeAgo() {

  return {
    priority: 99,
    restrict: 'A',
    link: function(scope, element, attrs) {
      var date = moment(Date.parse(attrs.pwTimeAgo));

      attrs.$set('title', date.format())
      element.text(date.fromNow());
    }
  };
}


angular
  .module('portal.directives')
  .directive('pwTimeAgo', pwTimeAgo);
