/**
 * Created by blake zeisler on 7/4/16.
 */
'use strict'
angular.module('mychat')
  .controller('AppController', function($scope,$rootScope,$state,$ionicModal, AuthService,ProfileService, photoservice,weddingservice) {
      $scope.profile = {
        username: '',
        role: '',
        describe: '',
        photoUrl: 'images/profileavatar.jpg',
        isChoosePhoto: false
      }
      $scope.weddingnames = [];
      $scope.openMenu = function() {
        ProfileService.GetuserInfo().then(function(result) {
          if(result.photoUrl)
            $scope.profile.isChoosePhoto = true;
          else
            $scope.profile.isChoosePhoto = false;
          if(result.photoUrl != '')
            $scope.profile.photoUrl = result.photoUrl;
          else
            $scope.profile.photoUrl = "images/profileavatar.jpg";
        });
        weddingservice.GetWeddingNames().then(function(result) {
          $scope.weddingnames = result.weddingNames;
          //console.log($scope.weddingnames);
        });
      }
      $scope.Logout = function() {
        AuthService.Logout().then(function(Result){
          if(Result.loggingout == true) {
            $state.go('welcomewedup');
            $(".messageReceive-container").remove();
            $(".message-container").remove();
          }

        });
      }
      $ionicModal.fromTemplateUrl('templates/profilepage.html',{
        scope: $scope
      }).then(function (modal){
        $scope.profilepage = modal;
      });
      $scope.closeProfile = function () {
        $scope.profilepage.hide();
      }
      $scope.ProfilePage = function() {
        ProfileService.GetuserInfo().then(function(result) {
          $scope.profile.username = result.name;
          $scope.profile.role = result.role;
          $scope.profile.describe = result.describe;
          if(result.photoUrl)
            $scope.profile.isChoosePhoto = true;
          else
            $scope.profile.isChoosePhoto = false;

          if(result.photoUrl != '')
            $scope.profile.photoUrl = result.photoUrl;
          else
            $scope.profile.photoUrl = "images/profileavatar.jpg";
        });
        $scope.profilepage.show();
      }
      $scope.ProfileSave = function() {
        //alert($scope.profile.username);
        ProfileService.ProfileSave($scope.profile).then(function(result){
          if(result.profileSaved) {
            $scope.profilepage.hide();
          }
        });
      }

    /*----------- Profile photo take -----------*/
    $scope.takePhoto = function () {
      photoservice.takePhoto().then(function(result){

        if(result.photoUrl != '')
          $scope.profile.photoUrl = result.photoUrl;
        else
          $scope.profile.photoUrl = "images/profileavatar.jpg";

        $scope.profile.isChoosePhoto = result.isChoosePhoto;
      });
    }
    $scope.choosePhoto = function() {
      photoservice.GetfromGallery().then(function(result){
        if(result.photoUrl != '')
          $scope.profile.photoUrl = result.photoUrl;
        else
          $scope.profile.photoUrl = "images/profileavatar.jpg";

        $scope.profile.isChoosePhoto = result.isChoosePhoto;
      });
    }
  });
