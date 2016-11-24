angular.module('mychat')
    .controller('WeddingContactsController', function($scope,$rootScope,$state,$ionicActionSheet, $ionicHistory) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.GetPhoneContacts = function() {
            $state.go('wedding_guests');
        }
    });

