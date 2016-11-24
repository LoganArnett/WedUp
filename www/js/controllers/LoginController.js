'use strict'
angular.module('mychat')
   .controller('LoginController', function($scope,$rootScope,$state,$ionicHistory,$ionicSideMenuDelegate, $ionicScrollDelegate, $ionicLoading,$ionicModal,$ionicPopup,$timeout,AuthService,Chatservice) {
    $scope.loginuser = {
      email: "",
      password: "",
      submitEmail: ""
    }

    if(localStorage.getItem("TokenId")){
      $state.go('wedding');
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
    $scope.EmailLogin = function() {
      if($scope.loginuser.email == '' || $scope.loginuser.password == '') {

        if($scope.loginuser.email == '' && $scope.loginuser.password == '')
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Login',
            template: 'Please input email and password'
          });
        } else {
          if ($scope.loginuser.email == '') {
            var alertPopup = $ionicPopup.alert({
              title: 'Login',
              template: 'Please input email'
            });
          } else if ($scope.loginuser.password == '') {
            var alertPopup = $ionicPopup.alert({
              title: 'Login',
              template: 'Please input password'
            });
          }
        }
      } else {

        AuthService.Emaillogin($scope.loginuser.email, $scope.loginuser.password).then(function (loginResult) {
          if (loginResult.loggedIn == true) {
            /*var Ref = firebase.database().ref('chatroom1/messages');
            Ref.once('value').then(function(data){
              if (data) {
                var val = data.val();
                angular.forEach(val, function (val, key) {
                  $ionicScrollDelegate.$getByHandle('small').scrollBottom();
                  if (val.id == loginResult.id)
                    Chatservice.displayMessage(key, val.name, val.text, val.photoUrl, val.imageUrl, 'send');
                  else
                    Chatservice.displayMessage(key, val.name, val.text, val.photoUrl, val.imageUrl, 'receive');

                });
              }
            });*/

            $state.go('wedding');
          }
        });
      }

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
    $scope.ForgetPwdPage = function() {
      $state.go('forget');
    }


  });
