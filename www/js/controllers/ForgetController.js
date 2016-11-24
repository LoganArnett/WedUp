'use strict'
angular.module('mychat')
    .controller('ForgetController', function($scope,$rootScope,$state,$ionicHistory,$ionicSideMenuDelegate, $ionicScrollDelegate, $ionicLoading,$ionicModal,$ionicPopup,$timeout,AuthService,Chatservice) {

        $scope.loginuser = {
            email: "",
            password: "",
            submitEmail: ""
        }
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }

        $scope.Keysubmit = function() {

            AuthService.SendResetEmail($scope.loginuser.submitEmail).then(function(result) {
                if(result.isSendResetEmail) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Reset password',
                        template: 'Sent email reset to you'
                    });
                }
            });
        }

    });

