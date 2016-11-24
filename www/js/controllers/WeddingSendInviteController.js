angular.module('mychat')
    .controller('WeddingSendInviteController', function($rootScope, $scope,$state,$ionicHistory,$sce) {
        $scope.invite = {
          describe: 'Blake  and I are using this WedUp! app for our wedding. We want to you to join! \n \n' +
                    'Wedding Key:\n' + $rootScope.weddingInfo.WeddingKey + '\n\n' +
                    'Download the Wedup! app and sign-up as a guest by entering the above Wedding Key.\n\n' +
                    'iPhone:\nwww.itunes.com/appstore/wedup\n\n' +
                    'Android:\nwww.google.com/playstore/wedup\n'
        }

        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.SendWeddingKey = function() {
            $state.go('app.info');
        }

    });

