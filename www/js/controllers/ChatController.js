'use strict'
angular.module('mychat')
  .controller('ChatController', function($rootScope,$scope,$ionicSideMenuDelegate,$interval, $ionicLoading,$state,$timeout,$ionicModal,$ionicScrollDelegate, AuthService,Chatservice,ProfileService,photoservice) {
    var typingtimer;
    var flag = false;
    $scope.user = {
      username:'',
      message:'',
      isTyping:false
    }
    $scope.flag = false;

    loadingMessage();
    TypingListen();

    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.SendMessage = function(){
      if($scope.user.message != '') {
        var user = firebase.auth().currentUser;
        var profileRef = firebase.database().ref('profile/' + user.uid);
        profileRef.once('value').then(function (data) {

          if (data) {
            var val = data.val();
            if (val != null) {
              angular.forEach(val, function (val) {
                Chatservice.SendMessage($scope.user.message, val.name, val.photoUrl).then(function (result) {
                  if (result.isSend) {
                    $scope.user.message = "";
                  }
                })
              });
              $ionicScrollDelegate.$getByHandle('small').scrollBottom();
            } else {
              Chatservice.SendMessage($scope.user.message, '', '').then(function (result) {
                if (result.isSend) {
                  $scope.user.message = "";
                }
              })

            }
          }
        }).catch(function (error) {
          $scope.user.message = "";
          var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: error
          });
        });
      }
    }
    $scope.SendImage = function() {
      photoservice.GetfromGalleryWithFile().then(function(result){
         if(result.isChoosePhotoWithFile) {
           /* Get profile user name and photo */
           var user = firebase.auth().currentUser;
           var profileRef = firebase.database().ref('profile/' + user.uid);
           profileRef.once('value').then(function (data) {

             if (data) {
               var val = data.val();
               if (val != null) {
                 angular.forEach(val, function (val) {

                   Chatservice.SendImage(result.photoUrl,val.photoUrl, val.name).then(function(result){
                     if(result.isSend) {

                     }
                   })
                 });
                 $ionicScrollDelegate.$getByHandle('small').scrollBottom();
               }             }
           }).catch(function (error) {
             $scope.user.message = "";
             var alertPopup = $ionicPopup.alert({
               title: 'Message',
               template: error
             });
           });

         }
      });

    }
    function loadingMessage() {
      $ionicLoading.show();
      var Ref = firebase.database().ref('chatroom1/messages');
      Ref.off();
      var setMessage = function (data) {
        if (data) {
          var user = firebase.auth().currentUser;
          var val = data.val();
          if(val.id == user.uid)
            Chatservice.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl,'send');
          else
            Chatservice.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl,'receive');

          $ionicLoading.hide();

        }
      }.bind();
      Ref.limitToLast(12).on('child_added', setMessage);
      Ref.limitToLast(12).on('child_changed', setMessage);
    }


    /*------- Typing function -----------*/
    $scope.Typingfunc = function() {

      var user = firebase.auth().currentUser;
      var Ref = firebase.database().ref('userstate');
      ProfileService.GetuserInfo().then(function(result) {
        if(result)
          Ref.child(user.uid).update({"id": user.uid, "isTyping": $scope.user.message, "username": result.name});
      });
      //Ref.on('value', function(data){
      //  if (data) {
      //    var val = data.val();
      //    angular.forEach(val, function (val, key) {
      //      Ref.child(key).update({"isTyping":$scope.user.message});
      //    });
      //  }
      //});
    }

    $interval(function(){
      var now = new Date();
      if(now - typingtimer > 2000 && flag) {
        $scope.user.isTyping = false;
        flag = false;
      }
    },2000);
    function TypingListen() {
      var Ref = firebase.database().ref('userstate');
      Ref.off();
      var setMessage = function (data) {
        if (data) {
          typingtimer = new Date();
          flag = true;
          var user = firebase.auth().currentUser;
          var val = data.val();
          if(user.uid != val.id) {
            $scope.user.isTyping = true;
            if (val.username != '')
              $scope.typingUser = val.username;
            else
              $scope.typingUser = 'anonymous';
          }
        }
      }.bind();
      Ref.on('child_changed', setMessage);
    }
  })
