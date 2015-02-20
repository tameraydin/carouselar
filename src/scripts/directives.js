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
                    'carouselar-image>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="carouselar__navigation">' +
                '<span class="carouselar__navigation__button ' +
                'carouselar__navigation__button--prev" ng-click="prev()">PREV</span>' +
                '<div class="carouselar__navigation__index">' +
                  '<span class="carouselar__navigation__button ' +
                    'carouselar__navigation__button--index" ' +
                    'ng-repeat="i in createArray(sectionCount) track by $index" ' +
                    'ng-class="{\'carouselar__navigation__button--active\':$index === activeSection}"' +
                    'ng-click="moveToSection($index)">' +
                      '{{$index + 1}}' +
                  '</span>' +
                '</div>' +
                '<span class="carouselar__navigation__button ' +
                'carouselar__navigation__button--next" ng-click="next()">NEXT</span>' +
              '</div>' +
            '</div>',
          link: function(scope, element, attrs) {
            scope.maxImageCount = Math.min(
              parseInt(attrs.displayingImageCount), CarouselarConstants.MAX_DISPLAYING_IMAGE) || 1;

            var win = angular.element($window);
            win.bind('resize', scope.onResize);
            scope.onResize();

            scope.$on('$destroy', function() {
              win.unbind(scope.onResize);
            });
          }
        };
      }
    ])
    .directive('carouselarImage', ['$compile',
      function($compile) {
        return {
          restrict: 'A',
          controller: 'CarouselarImageController',
          scope: {
            isVisible: '=',
            imgUrl: '@'
          },
          template: '<div class="carouselar__loader" ng-if="isLoading"></div>',
          link: function(scope, element) {
            scope.compileImage = function() {
              element.append(
                '<img ' +
                  'class="carouselar__image" ' +
                  'carouselar-loader ' +
                  'on-load="onLoad()" ' +
                  'ng-src="{{imgUrl}}" />');
              $compile(element.contents())(scope);
            };
          }
        };
      }
    ])
    .directive('carouselarLoader', [
      function() {
        return {
          restrict: 'A',
          scope: {
            onLoad: '&'
          },
          link: function(scope, element) {
            element.bind('load', scope.onLoad);
          }
        };
      }
    ]);

})(window, window.angular);
