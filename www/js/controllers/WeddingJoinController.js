angular.module('mychat')
  .controller('WeddingJoinController', function($rootScope, $scope,$ionicHistory,$state,$ionicPopup, weddingservice) {
    $scope.user = {
      weddingkey:''
    }
    $rootScope.weddingInfo = {
      WeddingName: '',
      WeddingKey: ''
    }
    $scope.goBack = function() {
      $ionicHistory.goBack();
    }
    $scope.SubmitKey = function() {
      weddingservice.CheckWeddingkey($scope.user.weddingkey).then(function(result){
        if(result.isWeddingkey) {
          $state.go('app.info');
          $rootScope.weddingInfo.WeddingKey = $scope.user.weddingkey;
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'Wedding key',
            template: 'Your wedding key is incorrect. Please input correct wedding key.'
          });
        }
      });
    }
  });

