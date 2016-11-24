angular.module('mychat.services',[])
.factory("AuthService", function($rootScope,$ionicLoading,$ionicPopup,$q){
    var loggedIn = false;
    var loggingout = false;
    var googleIn = false;
    var facebookIn = false;
    var isSendResetEmail = false;

    return {
      Emaillogin: function(emailname, emailpwd) {
        var deferred = $q.defer();
        $ionicLoading.show();
        firebase.auth().signInWithEmailAndPassword(emailname, emailpwd)
        .then(function(result){
          $ionicLoading.hide();
          var user = firebase.auth().currentUser;
          if(user != null) {
            localStorage.setItem("TokenId", result.refreshToken);
          }
          var profileRef = firebase.database().ref('profile/' + user.uid);
          profileRef.once('value').then(function (data) {
            var val = data.val();
            if(val == null) {
              profileRef.push({
                name:         "No name",
                photoUrl:     "images/profileavatar.jpg",
                role:         '',
                describe:     ''
              });
            }
          });
          loggedIn = true;
           deferred.resolve({
             "loggedIn": loggedIn,
             "id": user.uid
           });
        }, function(error) {
          $ionicLoading.hide();
            var errorCode = error.code;
            var errorMessage = error.message;
          var alertPopup = $ionicPopup.alert({
              title: 'Login',
              template: errorMessage
            });
          loggedIn = false;
            deferred.resolve({
              "loggedIn": loggedIn,
              "id": ''
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
        firebase.auth().createUserWithEmailAndPassword(emailname,emailpwd)
          .then(function(){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Signup',
              template: 'Signup success'
            });
          },function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Signup',
              template: errorMessage
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

      },
      SigninwithFacebook: function() {

      },
      Logout: function() {
        var deferred = $q.defer();
        firebase.auth().signOut().then(function(){
          loggingout = true;
          localStorage.removeItem("TokenId");
          deferred.resolve({
            "loggingout": loggingout
          });

        }, function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          loggingout = false;
          deferred.resolve({
            "loggingout": loggingout
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Log out',
            template: errorMessage
          });
        })
        return deferred.promise;
      },
      SendResetEmail: function(SubmitEmail) {
        var deferred = $q.defer();
        $ionicLoading.show();
        firebase.auth().sendPasswordResetEmail(SubmitEmail).then(function(result){
          console.log(result);
          isSendResetEmail = true;
          deferred.resolve({
            "isSendResetEmail": isSendResetEmail
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Reset Password',
            template: "Reset password email is sent"
          });
          $ionicLoading.hide();
        }, function(error) {
          isSendResetEmail = false;
          deferred.resolve({
            "isSendResetEmail": isSendResetEmail
          });
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Send Reset password Error',
            template: error
          });
        }).catch(function(error){
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
        return deferred.promise;
      }

    }
  });

