(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.directives', [
      'carouselar.controllers', 'carouselar.constants'])
    .directive('carouselar', ['$window', 'CarouselarConstants',
      function($window, CarouselarConstants) {
        return {
          replace: true,
          restrict: 'E',
          scope: {
            images: '='
          },
          controller: 'CarouselarController',
          template:
            '<div class="carouselar">' +
              '<div class="carouselar__container">' +
                '<div class="carouselar__inner-container" ' +
                'ng-style="{\'transform\': containerPosition}">' +
                  '<div class="carouselar__image-container" ' +
                    'ng-style="{\'width\': singleImageWidth}" ' +
                    'ng-repeat="image in images" ' +
                    'is-visible="isImageVisible($index)" ' +
                    'img-url="{{image}}" ' +
                    'carouselar-image>{{$index + 1}}' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="carouselar__navigation">' +
                '<span class="carouselar__navigation__button ' +
                'carouselar__navigation__button--prev" ng-click="prev()">PREV</span>' +
                '<span class="carouselar__navigation__button ' +
                'carouselar__navigation__button--next" ng-click="next()">NEXT</span>' +
              '</div>' +
            '</div>',
          link: function(scope, element, attrs) {
            scope.maxImageCount = Math.min(
              parseInt(attrs.maxImageCount), CarouselarConstants.MAX_DISPLAYED_IMAGE) || 1;

            var win = angular.element($window);
            win.bind('resize', scope.onResize);
            scope.onResize();

            scope.$on('destroy', function() {
              win.unbind(scope.onResize);
            });
          }
        };
      }
    ])
    .directive('carouselarImage', [
      function() {
        return {
          restrict: 'A',
          controller: 'CarouselarImageController',
          scope: {
            isVisible: '=',
            imgUrl: '@'
          }
        };
      }
    ]);

})(window, window.angular);
