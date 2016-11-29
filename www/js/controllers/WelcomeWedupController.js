'use strict'
angular.module('mychat')
    .controller('WelcomeWedupController', function($scope,$rootScope,$http,$state,$cordovaOauth,$ionicSideMenuDelegate, $ionicScrollDelegate, $ionicLoading,$ionicModal,$ionicPopup,$timeout,AuthService,Chatservice) {
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.options = {
            loop:true,
            speed:500
        }

        $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
            // grab an instance of the slider
            $scope.slider = data.slider;
        });

        function dataChangeHandler(){
            // call this function when data changes, such as an HTTP request, etc
            if ( $scope.slider ){
                $scope.slider.updateLoop();
            }
        }
        $scope.Loginpage = function() {
            $state.go('login');

        }
        $scope.images = [
            'images/wedding1.png',
            'images/wedding2.png',
            'images/wedding3.png'
        ];
        if(localStorage.getItem("TokenId")){
            $state.go('wedding');
        }

        $scope.SignupScreen = function() {
            $state.go('signup');
        }

        function goToWedding() {
            return $state.go('wedding');
        }

        $scope.GoogleSignin = function () {
          return AuthService.SigninwithGoogle().then(goToWedding);
        }
        $scope.FacebookSignin = function () {
          return AuthService.SigninwithFacebook().then(goToWedding);
        }

    });
