angular.module('mychat')
  .controller('WeddingController', function($scope, $state) {
    $scope.JoinWedding = function() {
      $state.go('wedding_join');
    }
    $scope.CreateWedding = function() {
      $state.go('wedding_create');
    }
  });

