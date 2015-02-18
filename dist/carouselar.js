/**
 * carouselar v0.1.0 (http://tamerayd.in/carouselar)
 * Copyright 2015 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.directives', [
      'carouselar.provider'
    ])
    .directive('carouselar', ['carouselar',
      function(carouselar) {
        return {
          replace: true,
          restrict: 'E',
          scope: {
            maxImage: '=',
            images: '='
          },
          template: '<div></div>',
          link: function() {
            console.log(1, carouselar);
          }
        };
      }
    ])
    .directive('carouselarImage', ['carouselar',
      function(carouselar) {
        return {
          replace: true,
          restrict: 'E',
          link: function() {
            console.log(2, carouselar);
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar', [
      'carouselar.directives'
    ]);

})(window, window.angular);
