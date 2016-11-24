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


        $scope.GoogleSignin = function () {

          $ionicLoading.show();
          $cordovaOauth.google("456776320064-6l2gijobg4fk6s1iek0nq8rttmdj2e12.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            //alert(JSON.stringify(result));
            var credential = firebase.auth.GoogleAuthProvider.credential(
            result.id_token);
            firebase.auth().signInWithCredential(credential)
              .then(function(result) {
                localStorage.setItem("TokenId", result.access_token);
                $ionicLoading.hide();
                $state.go('wedding');
              })
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'GoogleLogin',
                  template: errorMessage
                });
            });
          }, function(error) {
            //console.log(error);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'GoogleLogin',
              template: error
            });
          });
        }
        $scope.FacebookSignin = function () {
          $ionicLoading.show();
          $cordovaOauth.facebook('158625727876674', ["email"]).then(function(result) {
            var credential = firebase.auth.FacebookAuthProvider.credential(
              result.access_token);
            firebase.auth().signInWithCredential(credential).then(function(result) {
                localStorage.setItem("TokenId", result.access_token);
                $ionicLoading.hide();
                $state.go('wedding');
              })
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'FacebookLogin',
                  template: errorMessage
              });
            });

          }, function(error) {
            // error
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'FacebookLogin',
              template: error
            });
          });

        }

    });
