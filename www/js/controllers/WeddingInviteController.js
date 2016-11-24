angular.module('mychat')
    .controller('WeddingInviteController', function($scope,$rootScope,$state,$ionicActionSheet, $ionicHistory,$state, weddingservice) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.InviteGuest = function() {
            $ionicActionSheet.show({
                titleText: 'Invite your guests',
                buttons: [
                    { text: '<span class="type_email">Email (recommended)</span>' },
                    { text: '<span class="type_facebook">Facebook Messenger</span>'},
                ],
                buttonClicked: function(index) {
                    switch (index){
                        case 0 :
                            $state.go('wedding_contacts');
                            return true;
                        case 1 :
                            return true;
                    }
                },
                cancelText: '<span class="type_cancel">Cancel</span>',
                cancel: function() {
                    console.log('CANCELLED');
                }
            });
        }

    });

