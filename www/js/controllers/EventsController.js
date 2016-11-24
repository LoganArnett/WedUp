angular.module('mychat')
  .controller('EventsController', function($scope, $rootScope, $firebaseArray) {

    $scope.events = [];
    var eventsRef = firebase.database().ref().child("Events");
    $scope.events = $firebaseArray(eventsRef);
    //console.log($scope.events);
    
  

  });
