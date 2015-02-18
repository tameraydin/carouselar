(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.constants', [])
    .constant('CarouselarConstants', {
      RESIZE_TIMEOUT: 300,
      MAX_DISPLAYED_IMAGE: 5,
      BREAKPOINTS: {
        LANDSCAPE: 960,
        PORTRAIT: 640
      }
    });

})(window, window.angular);
