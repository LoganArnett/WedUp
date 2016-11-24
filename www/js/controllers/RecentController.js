angular.module('mychat')
  .controller('RecentController', function($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
  });
