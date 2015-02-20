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
              displayingImageCount = $window.Math.ceil($scope.maxImageCount / 2);

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
