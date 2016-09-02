angular
  .module('portal.directives')
  .directive('disclosure', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var el = element[0];
        el.isActive = false;
        el.details = el.querySelectorAll('[data-details]');
        el.hide = function() {
          for (var i = 0; i < el.details.length; i++) {
            el.details[i].style.display = 'none';
          }
        };
        el.show = function() {
          for (var i = 0; i < el.details.length; i++) {
            el.details[i].style.display = 'block';
          }
        };
        el.toggle = function(e) {
          e.stopPropagation();
          el.isActive = !el.isActive;
          if (el.isActive) {
            el.show();
          } else {
            el.hide();
          }
        };

        el.addEventListener('click', function(e) {
          if (e.target.className.indexOf('opener') == -1
          && (e.target.tagName == 'A'
          || e.target.getAttribute('data-details') != null)) {
            el.toggle(e);
          }
        });

        var opener = el.querySelector('.opener');
        if (opener) {
          opener.addEventListener('click', el.toggle);
        }

        el.hide();
      }
    };
  });