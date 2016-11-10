
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'jett.ionic.filter.bar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
          controller: 'NewsCtrl'
        }
      }
    })

  .state('app.startPage', {
    url: '/startPage',
    views: {
      'menuContent': {
        templateUrl: 'templates/startPage.html',
        controller: 'StartPageCtrl'
      }
    }
  })

  .state('app.newsItem', {
    url: '/newsItem/:newsId',
    views: {
      'menuContent': {
        templateUrl: 'templates/newsItem.html',
        controller: 'NewsItemCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/startPage');
});
