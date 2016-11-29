// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mychat', ['ionic','ionic.ion.autoListDivider', 'mychat.services','mychat.chatservice','mychat.photoservice','mychat.wedservice','ionMdInput','ngCordova','ngCordovaOauth','ngSanitize','firebase'])
.run(function($state,$ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //if(localStorage.getItem("TokenId")){
    //  $state.go('tabs.chat');
    //} else {
    //  $state.go('login');
    //}
    ionic.Platform.isFullScreen = true;
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider
    .state('welcomewedup',{
      url: '/welcomewedup',
      templateUrl: 'templates/welcome_wedup.html',
      controller: 'WelcomeWedupController'
    })
    .state('signup',{
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupController'

    })
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'

    })
    .state('forget',{
      url: '/forget',
      templateUrl: 'templates/forgetpage.html',
      controller: 'ForgetController'

    })
    .state('wedding', {
      url: '/wedding',
      templateUrl: 'templates/wedding.html',
      controller: 'WeddingController'
    })
    .state('wedding_create', {
      url: '/weddingcreate',
      templateUrl: 'templates/wedding_create.html',
      controller: 'WeddingCreateController'
    })
    .state('wedding_invite', {
      url: '/weddinginvite',
      templateUrl: 'templates/wedding_invite.html',
      controller: 'WeddingInviteController'
    })
    .state('wedding_join', {
      url: '/weddingjoin',
      templateUrl: 'templates/wedding_join.html',
      controller: 'WeddingJoinController'
    })
    .state('wedding_contacts', {
      url: '/weddingcontacts',
      templateUrl: 'templates/wedding_contacts.html',
      controller: 'WeddingContactsController'
    })
    .state('wedding_guests', {
      url: '/weddingguests',
      templateUrl: 'templates/wedding_guests.html',
      controller: 'WeddingGuestsController'
    })
    .state('wedding_sendinvite', {
      url: '/weddingsendinvite',
      templateUrl: 'templates/wedding_sendinvite.html',
      controller: 'WeddingSendInviteController'
    })
    .state('new_group', {
      url: '/newgroup',
      templateUrl: 'templates/new-group.html',
      controller: 'NewgroupController'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: "AppController"
    })
    .state('app.chat', {
      url:'/chat',
      views: {
        'chat-tab': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatController'
        }
      }
    })
    .state('app.chatroom', {
      url: '/chatroom',
      views: {
        'chat-tab': {
          templateUrl: 'templates/tab-chatroom.html',
          controller: 'ChatroomController'
        }
      }
    })
    .state('app.info', {
      url:'/info',
      views: {
        'chat-info': {
          templateUrl: 'templates/tab-info.html',
          controller: 'InfoController'
        }
      }
    })
    .state('app.recent', {
      url:'/recent',
      views: {
        'chat-recent': {
          templateUrl: 'templates/tab-recent.html',
          controller: 'RecentController'
        }
      }
    })
    .state('app.gallery', {
      url:'/gallery',
      views: {
        'chat-gallery': {
          templateUrl: 'templates/tab-gallery.html',
          controller: 'GalleryController'
        }
      }
    })
    .state('app.playlist', {
      url:'/playlist',
      views: {
        'chat-playlist': {
          templateUrl: 'templates/tab-playlist.html',
          controller: 'PlaylistController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcomewedup');
});
