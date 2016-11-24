angular.module('mychat')
  .controller('NewgroupController', function($rootScope, $scope,$ionicPopup,$ionicHistory,$state,Chatservice) {
    GetAvailablePeople();
    $scope.groupsetting = {
      isChoosePhoto: false,
      photoUrl: ''
    }
    $scope.goBack = function() {
      $ionicHistory.goBack();
    }

    function GetAvailablePeople() {
      Chatservice.Getpersons($rootScope.weddingInfo.WeddingKey).then(function(result){
        $scope.personlist = result.personlist;
        //console.log($scope.personlist);
      });
    }
    $scope.selectperson = function(id) {
      //person.ischecked != person.ischecked;

      for(var i = 0; i < $scope.personlist.length; i++) {
        if($scope.personlist[i].id == id) {
          $scope.personlist[i].ischecked = !$scope.personlist[i].ischecked;
          break;
        }
      }
    }
    $scope.GroupSave = function() {
      var countChecked = 0;
      for(var i = 0; i < $scope.personlist.length; i++) {
        if($scope.personlist[i].ischecked) {
          countChecked ++;
        }
        if(countChecked >= 2) {
          break;
        }
      }
      if(countChecked <= 1) {
        var alertPopup = $ionicPopup.alert({
          title: 'Create sub group',
          template: 'Please select 2 or more people'
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Create sub group',
          template: "This isnt implemented in code. working progress"
        });
      }
    }
  });


