angular.module('mychat')
  .controller('InfoController', function($scope, $ionicSideMenuDelegate, $ionicModal) {
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }

    $ionicModal.fromTemplateUrl('templates/infopage.html',{
        scope: $scope
      }).then(function (modal){
        $scope.infopage = modal;
      });
      $scope.closeInfo = function () {
        $scope.infopage.hide();
      }
      $scope.InfoPage = function() {
        $scope.infopage.show();
      }
  });
