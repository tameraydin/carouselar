'use strict';

angular
  .module('demoApp', [
    'carouselar'
  ])
  .controller('demoMainController', function($scope) {
    $scope.demoImages = [
      'img1',
      'img2',
      'img3',
      'img4',
      'img5',
      'img6',
      'img7',
      'img8'
    ];
  });
