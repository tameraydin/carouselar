(function(window, angular, undefined) {
  'use strict';

  angular
    .module('carouselar.controllers', ['carouselar.constants'])
    .controller('CarouselarController', [
      '$scope', '$timeout', '$window', 'CarouselarConstants',
      function($scope, $timeout, $window, CarouselarConstants) {
        $scope.maxImageCount = 1;
        $scope.displayingImageCount = 0;

        $scope.activeSection = 0;
        $scope.sectionCount = 5;
        $scope.transform = 'translateX(0)';

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

          var pos;
          var imagePercentage = 100 / $scope.displayingImageCount;

          if ($scope.activeSection === $scope.sectionCount - 1) { // last section
            pos = ($scope.images.length - $scope.displayingImageCount) * imagePercentage;

          } else {
            pos = $scope.activeSection * $scope.displayingImageCount * imagePercentage;
          }

          $scope.transform = 'translateX(-' + pos + '%)';
        };

        $scope.resizeTimer = null;
        $scope.onResize = function() {
          $timeout.cancel($scope.resizeTimer);
          $scope.resizeTimer = $timeout(function() {
            var displayingImageCount = $scope.maxImageCount;
            var windowWidth = $window.innerWidth;

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

            //TODO: keep first image, find actual section
            $scope.moveToSection($scope.activeSection);
          }
        });
      }
    ])
    .controller('CarouselarImageController', ['$scope',
      function($scope) {
        $scope.adjustSizeClass = function(grow, domEl) {
          domEl.className = domEl.className.replace(/(grow-).?/g, 'grow-' + grow);
        };
      }
    ]);

})(window, window.angular);
