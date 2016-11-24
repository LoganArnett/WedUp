angular.module('mychat')
  .controller('PlaylistController', function($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
  });
