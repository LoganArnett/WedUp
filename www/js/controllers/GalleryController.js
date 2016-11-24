angular.module('mychat')
  .controller('GalleryController', function($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
  });
