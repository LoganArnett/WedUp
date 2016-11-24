angular.module('mychat')
    .controller('WeddingCreateController', function($scope,$rootScope, $ionicHistory,$state,$ionicPopup, weddingservice) {
        $scope.user = {
            WeddingName: ""
        }
        $rootScope.weddingInfo = {
            WeddingName: "",
            WeddingKey: "",
            Create_At: ""
        }
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.WeddingNameSubmit = function() {
           //console.log($scope.user.weddingName);
            if($scope.user.WeddingName != '') {
                weddingservice.CreateWedding($scope.user.WeddingName).then(function (result) {
                    if (result.WeddingCreated) {
                        $rootScope.weddingInfo.WeddingName = result.WeddingName;
                        $rootScope.weddingInfo.WeddingKey = result.WeddingKey;
                        $state.go('wedding_invite');
                    }
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Create new wedding',
                    template: 'Please input wedding name'
                });
            }
        }
    });

