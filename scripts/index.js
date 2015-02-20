'use strict';

angular
  .module('demoApp', [
    'carouselar'
  ])
  .controller('demoMainController', function($scope) {
    $scope.demoImages = [
      'images/dummy-1.jpg',
      'images/dummy-2.jpg',
      'images/dummy-3.jpg',
      'images/dummy-4.jpg',
      'images/dummy-5.jpg',
      'images/dummy-6.jpg',
      'images/dummy-7.jpg',
      'images/dummy-8.jpg',
      'images/dummy-9.jpg',
      'images/dummy-10.jpg',
      'images/dummy-11.jpg',
      'images/dummy-12.jpg',
      'images/dummy-13.jpg',
      'images/dummy-14.jpg',
      'images/dummy-15.jpg',
      'images/dummy-16.jpg',
      'images/dummy-17.jpg'
    ];
  });
