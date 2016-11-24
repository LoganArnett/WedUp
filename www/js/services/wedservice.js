angular.module('mychat.wedservice',[])
    .factory('weddingservice', function($ionicLoading,$ionicPopup, $q) {
       var WeddingCreated = false;
       var weddingNames = [];
       var isWeddingkey = false;
       return {
          CreateWedding: function(WeddingName) {
              var deferred = $q.defer();
              $ionicLoading.show();

          /*Generate wedding key */
              var WeddingKey = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              var create_at = new Date();
              var now = create_at.getTime();
              for( var i=0; i < 10; i++ )
                  WeddingKey += possible.charAt(Math.floor(Math.random() * possible.length));

              var user = firebase.auth().currentUser;
              var Ref = firebase.database().ref('NewWedding/' +user.uid);
              Ref.push({
                  WeddingName: WeddingName,
                  WeddingKey:  WeddingKey,
                  Create_At:   now
              })
              .then(function() {
                  $ionicLoading.hide();
                      WeddingCreated = true;
                  deferred.resolve({
                      "WeddingCreated": WeddingCreated,
                      "WeddingName": WeddingName,
                      "WeddingKey": WeddingKey,
                      "Created_At": now
                  });
              })
              .catch(function (error) {
                  $ionicLoading.hide();
                  WeddingCreated = false;
                  deferred.resolve({
                      "WeddingCreated": WeddingCreated,
                      "WeddingName": '',
                      "WeddingKey": '',
                      "Created_At": ''
                  });
                  var alertPopup = $ionicPopup.alert({
                      title: 'Create new wedding error',
                      template: 'Fail to create new wedding'
                  });
              });
              return deferred.promise;
          },

          CheckWeddingkey: function(weddingkey) {
            $ionicLoading.show();
            var count = 0;
            var deferred = $q.defer();
            var weddingRef = firebase.database().ref('NewWedding/');
            var user = firebase.auth().currentUser;
              weddingRef.once('value').then(function (data) {
                if (data) {
                  var val = data.val();
                  if(val != null) {
                    angular.forEach(val, function (weddings) {
                      angular.forEach(weddings, function (wedding) {
                        count++;
                      });
                    });
                    angular.forEach(val, function (weddings) {
                      angular.forEach(weddings, function (wedding) {
                        //console.log(wedding.WeddingKey);
                        if (weddingkey == wedding.WeddingKey) {
                          //alert("Wedding key exist");
                          var chatRef = firebase.database().ref('ChatGroup/' + wedding.WeddingKey);
                          chatRef.child(user.uid).update({
                            "id": user.uid,
                            "weddingkey": wedding.WeddingKey,
                            "weddingname": wedding.WeddingName
                          }).then(function (result) {
                            isWeddingkey = true;
                            deferred.resolve({
                              "isWeddingkey": isWeddingkey
                            });
                            $ionicLoading.hide();
                          }, function (error) {
                            isWeddingkey = false;
                            deferred.resolve({
                              "isWeddingkey": isWeddingkey
                            });
                            $ionicLoading.hide();
                          })
                            .catch(function (error) {
                              isWeddingkey = false;
                              deferred.resolve({
                                "isWeddingkey": isWeddingkey
                              });
                              $ionicLoading.hide();
                            });
                        } else {
                          count--;
                          if (count == 0) {
                            isWeddingkey = false;
                            deferred.resolve({
                              "isWeddingkey": isWeddingkey
                            });
                            $ionicLoading.hide();
                          }
                        }
                      });
                    });
                  } else {
                    isWeddingkey = false;
                    deferred.resolve({
                      "isWeddingkey": isWeddingkey
                    });
                    $ionicLoading.hide();
                  }

                } else {
                  isWeddingkey = false;
                  deferred.resolve({
                    "isWeddingkey": isWeddingkey
                  });
                  $ionicLoading.hide();
                }
              }, function (error) {
                isWeddingkey = false;
                deferred.resolve({
                  "isWeddingkey": isWeddingkey
                });
                $ionicLoading.hide();
              })
              .catch(function (error) {
                isWeddingkey = false;
                deferred.resolve({
                  "isWeddingkey": isWeddingkey
                });
                $ionicLoading.hide();
              });
            return deferred.promise;
          },
          GetWeddingNames: function() {
              weddingNames = [];
              var deferred = $q.defer();
              //$ionicLoading.show();
              var user = firebase.auth().currentUser;
              var Ref = firebase.database().ref('ChatGroup');
              Ref.once('value').then(function(data){
                  if (data) {
                      var val = data.val();
                      angular.forEach(val, function (wedding, key) {
                          //if(key != user.uid) {
                          //  weddingNames.push(val);
                          //}

                         angular.forEach(wedding, function(val, key){
                           if(key == user.uid) {
                             weddingNames.push({key:val.weddingkey, weddingname: val.weddingname});
                           }
                         });
                      });
                  }
              }).then(function(){
                  deferred.resolve({
                      "weddingNames": weddingNames
                  });
                //  $ionicLoading.hide();
              }, function(error) {
                  //$ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                      title: 'Getting Wedding name list',
                      template: 'Fail to getting wedding list'
                  });
              }).catch(function(error){
                  //$ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                      title: 'Getting Wedding name list',
                      template: error
                  });
              });
              return deferred.promise;
          }

       }
    });
