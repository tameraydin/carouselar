/**
 * carouselar v0.1.0 (http://tamerayd.in/carouselar)
 * Copyright 2015 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.constants', [])
    .constant('CarouselarConstants', {
      RESIZE_TIMEOUT: 300,
      MAX_DISPLAYING_IMAGE: 5,
      BREAKPOINTS: {
        LANDSCAPE: 960,
        PORTRAIT: 640
      }
    });

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.controllers', ['carouselar.constants'])
    .controller('CarouselarController', [
      '$scope', '$timeout', '$window', 'CarouselarConstants',
      function($scope, $timeout, $window, CarouselarConstants) {
        $scope.visibleImages = [];
        $scope.maxImageCount = 1;
        $scope.displayingImageCount = 0;

        $scope.activeSection = 0;
        $scope.sectionCount = 5;
        $scope.containerPosition = 'translateX(0)';
        $scope.singleImageWidth = '100%';

        $scope.createArray = function(num) {
          return new Array(num || 0);
        };

        $scope.prev = function() {
          $scope.moveToSection($scope.activeSection - 1);
        };

        $scope.next = function() {
          $scope.moveToSection($scope.activeSection + 1);
        };

        $scope.moveToSection = function(sectionIndex) {
          if (sectionIndex >= $scope.sectionCount) {
            $scope.activeSection = 0;

          } else if (sectionIndex < 0) {
            $scope.activeSection = $scope.sectionCount - 1;

          } else {
            $scope.activeSection = sectionIndex;
          }

          // update container position & visible images:
          var pos;
          var imagePercentage = 100 / $scope.displayingImageCount;
          var visibleImages = [];
          var i;

          if ($scope.activeSection === $scope.sectionCount - 1) { // last section
            pos = ($scope.images.length - $scope.displayingImageCount) * imagePercentage;

            for (i = 0; i < $scope.displayingImageCount + 1; i++) {
              visibleImages.push($scope.images.length - i);
            }

          } else {
            var firstVisibleImageIndex = $scope.activeSection * $scope.displayingImageCount;

            visibleImages.push(firstVisibleImageIndex);
            for (i = 1; i < $scope.displayingImageCount; i++) {
              visibleImages.push(firstVisibleImageIndex + i);
            }

            pos = firstVisibleImageIndex * imagePercentage;
          }

          $scope.containerPosition = 'translateX(-' + pos + '%)';
          $scope.visibleImages = visibleImages;
        };

        $scope.resizeTimer = null;
        $scope.onResize = function(event, _width) {
          $timeout.cancel($scope.resizeTimer);
          $scope.resizeTimer = $timeout(function() {
            var displayingImageCount = $scope.maxImageCount;
            var windowWidth = _width || $window.innerWidth;

            if (windowWidth < CarouselarConstants.BREAKPOINTS.LANDSCAPE) {
              displayingImageCount = Math.ceil($scope.maxImageCount / 2);

              if (windowWidth < CarouselarConstants.BREAKPOINTS.PORTRAIT) {
                displayingImageCount = 1;
              }
            }

            $scope.displayingImageCount = displayingImageCount;
          }, CarouselarConstants.RESIZE_TIMEOUT);
        };

        $scope.$watch('displayingImageCount', function(newValue) {
          if (newValue) {
            $scope.sectionCount = Math.ceil(
              $scope.images.length / $scope.displayingImageCount);
            $scope.moveToSection($scope.activeSection); //TODO: keep first image in sight
            $scope.singleImageWidth = (100 / newValue) + '%';
          }
        });

        $scope.isImageVisible = function(imageIndex) {
          return $scope.visibleImages.indexOf(imageIndex) > -1;
        };
      }
    ])
    .controller('CarouselarImageController', ['$scope',
      function($scope) {
        $scope.isLoading = true;
        $scope.onLoad = function() {
          $scope.isLoading = false;
          $scope.$apply();
        };

        var unwatch = $scope.$watch('isVisible', function(isVisible) {
          if (isVisible) {
            $scope.compileImage();
            unwatch();
          }
        });
      }
    ]);

})(window, window.angular);

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
              win.unbind('resize', scope.onResize);
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

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar', [
      'carouselar.controllers',
      'carouselar.directives',
      'carouselar.constants'
    ]);

})(window, window.angular);
