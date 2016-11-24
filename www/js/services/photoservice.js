angular.module('mychat.photoservice',[])
  .factory('photoservice', function($ionicPopup, $cordovaCamera, $q) {
    var isChoosePhoto = false;
    var isChoosePhotoWithFile = false;
    var photoUrl = '';
    return{
      takePhoto: function(){
        var deferred = $q.defer();
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 120,
          targetHeight: 120,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var imgUrl = "data:image/jpeg;base64," + imageData;
          isChoosePhoto = true;
          deferred.resolve({
            "isChoosePhoto": isChoosePhoto,
            "photoUrl": imgUrl
          });
        }, function(err) {
          isChoosePhoto = false;
          deferred.resolve({
            "isChoosePhoto": isChoosePhoto,
            "photoUrl": ''
          });
        });
        return deferred.promise;
      },
      GetfromGallery: function() {
        var deferred = $q.defer();
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          targetWidth: 120,
          targetHeight: 120,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

       $cordovaCamera.getPicture(options).then(function (sourcePath) {
          photoUrl = "data:image/jpeg;base64," + sourcePath;
          isChoosePhoto = true;

          deferred.resolve({
            "isChoosePhoto": isChoosePhoto,
            "photoUrl": photoUrl
          });

        }, function (err) {
          isChoosePhoto = false;
          deferred.resolve({
            "isChoosePhoto": isChoosePhoto,
            "photoUrl": ''
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Choose photo',
            template: err
          });
        });

        return deferred.promise;

      },
      GetfromGalleryWithFile: function() {
        var deferred = $q.defer();
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          targetWidth: 120,
          targetHeight: 120,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (sourcePath) {
          isChoosePhotoWithFile = true;

          deferred.resolve({
            "isChoosePhotoWithFile": isChoosePhotoWithFile,
            "photoUrl": sourcePath
          });

        }, function (err) {
          isChoosePhotoWithFile = false;
          deferred.resolve({
            "isChoosePhotoWithFile": isChoosePhotoWithFile,
            "photoUrl": ''
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Choose photo',
            template: err
          });
        });

        return deferred.promise;

      }

    }


  });
