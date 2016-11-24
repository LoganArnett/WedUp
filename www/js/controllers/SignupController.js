'use strict'
angular.module('mychat')
    .controller('SignupController', function($scope,$rootScope,$state,$ionicHistory,$ionicSideMenuDelegate, $ionicScrollDelegate, $ionicLoading,$ionicModal,$ionicPopup,$timeout,AuthService,Chatservice) {
        $scope.users = {
            email:  "",
            password: ""
        }
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.Signup = function() {
            /* User Sign Up */
            if($scope.users.email == '' || $scope.users.password == '') {

                if($scope.users.email == '' && $scope.users.password == '')
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Signup',
                        template: 'Please input email and password'
                    });
                } else {
                    if ($scope.users.email == '') {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Signup',
                            template: 'Please input email'
                        });
                    } else if ($scope.users.password == '') {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Signup',
                            template: 'Please input password'
                        });
                    }
                }
            } else {
                if($scope.users.password.length < 8)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Password Alert',
                        template: "Password is too short. Password should be at least 8 characters"
                    });

                } else {
                   AuthService.EmailSignup($scope.users.email, $scope.users.password);
                }
            }


        }
    });
