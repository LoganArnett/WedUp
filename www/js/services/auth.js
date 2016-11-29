'use strict';
angular.module('mychat.services',[])
.factory("AuthService", function($rootScope,$ionicLoading,$ionicPopup,$q){
    var loggedIn = false;
    var loggingout = false;
    var googleIn = false;
    var facebookIn = false;
    var isSendResetEmail = false;

    function signInWithProvider(provider, errorTitle) {
      return firebase.auth().signInWithPopup(provider).then(function(result) {
          localStorage.setItem("TokenId", result.credential.accessToken);
          return $ionicLoading.hide();
      })
      .catch(function(error) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: errorTitle,
            template: error
          });
      });
    }

    return {

      Emaillogin: function(emailname, emailpwd) {
        var deferred = $q.defer();
        $ionicLoading.show();
        firebase.auth().signInWithEmailAndPassword(emailname, emailpwd)
        .then(function(result) {
          $ionicLoading.hide();
          var user = firebase.auth().currentUser;
          if (user != null) {
            localStorage.setItem("TokenId", result.refreshToken);
          }
          var profileRef = firebase.database().ref('profile/' + user.uid);
          profileRef.once('value').then(function (data) {
            var val = data.val();
            if (val == null) {
              profileRef.push({
                name: "No name",
                photoUrl: "images/profileavatar.jpg",
                role: '',
                describe: ''
              });
            }
          });
          loggedIn = true;
          return deferred.resolve({
             "loggedIn": loggedIn,
             "id": user.uid
           });
        })
        .catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          var alertPopup = $ionicPopup.alert({
              title: 'Login',
              template: errorMessage
            });
          $ionicLoading.hide();
          loggedIn = false;
            deferred.resolve({
              "loggedIn": loggedIn,
              "id":''
            });
        })
        return deferred.promise;
      },

      EmailSignup: function(emailname, emailpwd) {
        $ionicLoading.show();
        firebase.auth().createUserWithEmailAndPassword(emailname, emailpwd)
          .then(function(){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Signup',
              template: 'Signup success'
            });
          })
          .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Signup',
              template: errorMessage
            });
          });
      },

      SigninwithGoogle: function() {
          $ionicLoading.show();
          var provider = new firebase.auth.GoogleAuthProvider();
          return signInWithProvider(provider, 'GoogleLogin');
      },

      SigninwithFacebook: function() {
          $ionicLoading.show();
          var provider = new firebase.auth.FacebookAuthProvider();
          return signInWithProvider(provider, 'FacebookLogin');
      },

      Logout: function() {
        var deferred = $q.defer();
        return firebase.auth().signOut().then(function(){
          loggingout = true;
          localStorage.removeItem("TokenId");
          return {
            "loggingout": loggingout
          };
        })
        .catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          loggingout = false;
          var alertPopup = $ionicPopup.alert({
            title: 'Log out',
            template: errorMessage
          });
          return deferred.resolve({
            "loggingout": loggingout
          });
        });
      },

      SendResetEmail: function(SubmitEmail) {
        var deferred = $q.defer();
        $ionicLoading.show();
        firebase.auth().sendPasswordResetEmail(SubmitEmail).then(function(result){
          isSendResetEmail = true;
          deferred.resolve({
            "isSendResetEmail": isSendResetEmail
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Reset Password',
            template: "Reset password email is sent"
          });
          $ionicLoading.hide();
          return deferred.promise;
        }).catch(function(error) {
          isSendResetEmail = false;
          deferred.resolve({
            "isSendResetEmail": isSendResetEmail
          });
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Send Reset password Error',
            template: error
          });
        });
      }
    }
  });