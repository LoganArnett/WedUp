angular.module('mychat')
  .controller('ChatroomController', function($rootScope,$scope,$state, $ionicSideMenuDelegate,Chatservice) {
    $scope.chattype = 'group';
    $scope.personlist = [];
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.setChattype = function(type) {
      $scope.chattype = type;
      if(type == 'people') {
        Chatservice.Getpersons($rootScope.weddingInfo.WeddingKey).then(function(result){
            $scope.personlist = result.personlist;
        });
      }
    }
    $scope.CreateGroup = function() {
      $state.go('new_group');
    }

  });

