angular.module('mychat.chatservice',[])
  .factory('Chatservice', function($ionicPopup,$ionicLoading,$q) {
    var SendMessage_template = "<div class='message-container'>" +
      "<div class='spacing'><div class='pic'></div></div>" +
      "<div class='message'></div>" +
      "<div class='name'></div>" +
      "</div>";

    var ReceiveMessage_template = "<div class='messageReceive-container'>" +
      "<div class='spacing'><div class='pic'></div></div>" +
      "<div class='message'></div>" +
      "<div class='name'></div>" +
      "</div>";

    var isSend = false;
    return {
      SendImage: function (fileURI,photoURI, username) {
        $ionicLoading.show();
        var user = firebase.auth().currentUser;
        storageRef  = firebase.storage().ref();
        window.resolveLocalFileSystemURL(fileURI, function( fileEntry ){

          fileEntry.file(function (resFile) {

            var reader = new FileReader();
            reader.onloadend = function(evt) {
              var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
              var currentDate = Date.now();
              var RndFileName = Math.floor((Math.random() * 100000) + 1);
              var uploadTask = storageRef.child('images/' + user.uid + '/' + currentDate + '/' + RndFileName + '.jpg').put(imgBlob);

              uploadTask.on('state_changed', function(snapshot){


              }, function(error) {
                var deferred = $q.defer();
                isSend = false;
                deferred.resolve({
                  "isSend": isSend
                });
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Saving error',
                  template: error
                });
                return deferred.promise;
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var deferred = $q.defer();
                var user = firebase.auth().currentUser;
                var Ref = firebase.database().ref('chatroom1/messages');
                var imagePath = uploadTask.snapshot.downloadURL;
                if(username == '')
                  username = "No name";
                Ref.push({
                  id:   user.uid,
                  name: username,
                  photoUrl: photoURI,
                  imageUrl: imagePath
                })
                    .then(function () {
                      name = "";
                      isSend = true;
                      deferred.resolve({
                        "isSend": isSend
                      });

                    })
                    .catch(function (error) {
                      isSend = false;
                      deferred.resolve({
                        "isSend": isSend
                      });
                      var alertPopup = $ionicPopup.alert({
                        title: 'Image Upload error',
                        template: 'Error uploading new image to firebase storage'
                      });
                    });
                $ionicLoading.hide();
                return deferred.promise;
                //var downloadURL = uploadTask.snapshot.downloadURL;
              });
            };

            reader.readAsArrayBuffer(resFile);

          });
        });

      },
      SendMessage: function (message, username, photoUrl) {

          var deferred = $q.defer();
          var user = firebase.auth().currentUser;
          var Ref = firebase.database().ref('chatroom1/messages');
          var photo = '';
          if(username == '')
            username = "No name";

          if(!photoUrl)
            photo = 'images/profileavatar.jpg'
          else
            photo = photoUrl;

          Ref.push({
            id:   user.uid,
            name: username,
            text: message,
            photoUrl: photo
          })
          .then(function () {
            name = "";
            isSend = true;
            deferred.resolve({
              "isSend": isSend
            });
          })
          .catch(function (error) {
              isSend = false;
              deferred.resolve({
                "isSend": isSend
              });
              var alertPopup = $ionicPopup.alert({
              title: 'Saving error',
              template: 'Error writing new message to firebase database'
              });
          });

        return deferred.promise;
      },
      displayMessage: function (key, name, text, picUrl, imageUri, type) {
        var messageList = document.getElementById('messages');
        var div = document.getElementById(key);
        // If an element for that message does not exists yet we create it.
        if (!div) {
          var container = document.createElement('div');
          if(type == 'receive')
            container.innerHTML = ReceiveMessage_template;
          else if(type == 'send')
            container.innerHTML = SendMessage_template;

          div = container.firstChild;
          div.setAttribute('id', key);
          messageList.appendChild(div);
        }
        if (picUrl) {
          div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
        }
        div.querySelector('.name').textContent = name;
        var messageElement = div.querySelector('.message');
        if (text) { // If the message is text.
          messageElement.textContent = text;
          // Replace all line breaks by <br>.
          messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        } else if (imageUri) { // If the message is an image.

          var image = document.createElement('img');
          image.addEventListener('load', function () {
            //messageList.scrollTop = messageList.scrollHeight;
          }.bind());

          image.src = imageUri;
          messageElement.innerHTML = '';
          messageElement.appendChild(image);

        }
        // Show the card fading-in and scroll to view the new message.
        setTimeout(function () {
          div.classList.add('visible')
        }, 1);
        //messageList.scrollTop = messageList.scrollHeight;

      },
      Getpersons: function(weddingkey) {
        $ionicLoading.show();
        var personlist=[];
        var deferred = $q.defer();
        var user = firebase.auth().currentUser;
        var chatRef = firebase.database().ref('ChatGroup/' + weddingkey);
        chatRef.once('value').then(function (data) {
          if(data) {
            var val = data.val();
            if (val != null){
                /* Getting guests with same  Wedding key*/
              chatRef.once('value').then(function (data) {
                if (data) {
                  var val = data.val();
                  if (val != null) {
                    angular.forEach(val, function (val) {
                      if (val.id != user.uid) {
                        var profileRef = firebase.database().ref('profile/' + val['id']);
                        var id = val['id'];
                        profileRef.once('value').then(function (data) {
                          var val = data.val();
                          if (val != null) {
                            angular.forEach(val, function (val) {
                              var name, photoUrl;
                              name = val.name;
                              photoUrl = val.photoUrl;
                              if (name == '') {
                                name = 'No name';
                              }
                              if (photoUrl == '') {
                                photoUrl = 'images/profileavatar.jpg';
                              }
                              personlist.push({id: id, name: name, photoUrl: photoUrl, ischecked:false});
                            });
                          } else {
                            personlist.push({id: id, name: 'No name', photoUrl: 'images/profileavatar.jpg', ischecked:false});
                          }
                        }).then(function(result){
                            deferred.resolve({
                              "personlist": personlist
                            });
                            $ionicLoading.hide();
                        });
                      }
                    });
                  }

                } else {
                  deferred.resolve({
                    "personlist": []
                  });
                  $ionicLoading.hide();
                }
              }, function (error) {
                deferred.resolve({
                  "personlist": []
                });
                $ionicLoading.hide();
              }).then(function(result) {
                deferred.resolve({
                  "personlist": personlist
                });
                $ionicLoading.hide();
              })
              .catch(function (error) {
                deferred.resolve({
                  "personlist": []
                });
                $ionicLoading.hide();
              });
            }
          }
        }, function(error){
          deferred.resolve({
            "personlist": []
          });
        });

        return deferred.promise;
      }
    }
  })
  .factory('ProfileService', function($ionicLoading, $ionicPopup,$q) {
    var profileSaved = false;
    return {
      GetuserInfo: function () {
        var deferred = $q.defer();
        var user = firebase.auth().currentUser;
        var profileRef = firebase.database().ref('profile/' + user.uid);
        profileRef.once('value').then(function (data) {

          if (data) {
            var val = data.val();
            if (val != null) {
              angular.forEach(val, function (val) {
                deferred.resolve({
                  "name": val.name,
                  "photoUrl": val.photoUrl,
                  "role": val.role,
                  "describe": val.describe
                });
              });
            } else {
              deferred.resolve({
                "name": '',
                "photoUrl": '',
                "role": '',
                "describe": ''
              });
            }
          }

        }).catch(function (error) {
          deferred.resolve({
            "name": '',
            "photoUrl": '',
            "role": '',
            "describe": ''
          });
          var alertPopup = $ionicPopup.alert({
            title: 'Get user info',
            template: error
          });
        });
        return deferred.promise;
      },
      ProfileSave: function (profile) {
        var deferred = $q.defer();
        $ionicLoading.show();
        var user = firebase.auth().currentUser;
        if(user != null) {
          var Ref = firebase.database().ref('profile/' + user.uid);
          Ref.remove()
            .then(function(){

            })
            .catch(function(error){
              $ionicLoading.hide();
              profileSaved = false;
              deferred.resolve({
                "profileSaved": profileSaved
              });
              var alertPopup = $ionicPopup.alert({
                title: 'Saving error',
                template: 'Error writing new message to firebase database'
              });
            })

          Ref.push({
            name:         profile.username,
            photoUrl:     profile.photoUrl,
            role:         profile.role,
            describe:     profile.describe
          })
            .then(function() {
              $ionicLoading.hide();
              profileSaved = true;
              deferred.resolve({
                "profileSaved": profileSaved
              });
            }, function(err) {
              $ionicLoading.hide();
              profileSaved = false;
              deferred.resolve({
                "profileSaved": profileSaved
              });
              var alertPopup = $ionicPopup.alert({
                title: 'Saving error',
                template: err
              });
            })
            .catch(function (error) {
              $ionicLoading.hide();
              profileSaved = false;
              deferred.resolve({
                "profileSaved": profileSaved
              });
              var alertPopup = $ionicPopup.alert({
                title: 'Saving error',
                template: error
              });
            });
        }
        return deferred.promise;
      }

    }
  });
