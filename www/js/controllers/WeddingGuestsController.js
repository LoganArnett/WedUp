angular.module('mychat')
    .controller('WeddingGuestsController', function($scope,$rootScope,$state, $ionicHistory,$ionicModal, $cordovaContacts, $ionicLoading, weddingservice) {
        $scope.guestslist = [];
        $scope.emailAddrs = [];
        GetUserList();
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.NoticeWeddingKey = function() {
           $state.go('wedding_sendinvite');
        }

        function GetUserList() {
            var options = {}, j = 0;
            options.filter = "";
            options.multiple = true;
            //get the phone contacts
            $ionicLoading.show();
            $cordovaContacts.find(options).then(function(result) {
              for(var i = 0; i < result.length; i ++) {
                if(result[i]['emails'] != null) {
                  $scope.guestslist.push({
                    id: j,
                    name: result[i]['name'].formatted,
                    emails: result[i]['emails']
                  });
                  j ++;
                }
              }
              $ionicLoading.hide();
            }, function(err) {
              alert(err);
            });
            //weddingservice.GetWeddingGuests().then(function(result){
            //    angular.forEach(result.guestslist, function (val, key) {
            //        angular.forEach(val, function (val, key) {
            //           $scope.guestslist.push(val);
            //        });
            //    });
            //});

        }
        /*-------------- Phone Contact Email list --------------*/
        $ionicModal.fromTemplateUrl('templates/phone_contactlist.html',{
          scope: $scope
        }).then(function (modal){
          $scope.phonecontact = modal;
        });
        $scope.ClosePhoneContactPage = function () {
          $scope.phonecontact.hide();
        }
        $scope.GetEmailAddress = function(id) {
          //alert(JSON.stringify($scope.guestslist[id]));
          $scope.emailAddrs = [];
          for(var i = 0; i < $scope.guestslist[id]['emails'].length; i ++) {
            $scope.emailAddrs.push({id: i, value:$scope.guestslist[id]['emails'][i].value});
          }

          $scope.phonecontact.show();
        }
        $scope.SelectEmails = function() {
          $scope.phonecontact.hide();
        }

});


