angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller("StartPageCtrl", function ($scope){
  $scope.openLink = function(url){
      window.open(url);
   }
})

.controller("NewsCtrl", function ($scope, FeedService, FeedsStoreService, $ionicFilterBar, $cordovaSocialSharing) {

    var rssSource1 = 'http://rss.cnn.com/rss/cnn_topstories.rss';

    var rssSource = 'http://serwer1609891.home.pl/misjeiokolice/?feed=rss2';
    var kontaktUrl = 'http://misjeiokolice.pl/?page_id=18918';
    var stronaGlowna = 'http://misjeiokolice.pl/';

    $scope.feeds;
    $scope.filterBarInstance;

    var getDataFromRssSource = function() {

        FeedService.parseFeed(rssSource)
          .then(function (res) {

            $scope.feeds = res.data.responseData.feed.entries;
            console.log($scope.feeds);
            FeedsStoreService.save($scope.feeds);

            for (var i = 0; i < $scope.feeds.length; i++) {//getting images
              var content = $scope.feeds[i].content;
              var image = content.substring(content.indexOf('src="') + 5, content.indexOf('" alt="'));//getting first image from content
              $scope.feeds[i].image = image;
            };
       
          });

    };

    getDataFromRssSource();//at the starting application

    $scope.doRefresh = function() {
        getDataFromRssSource(); 
        $scope.$broadcast('scroll.refreshComplete');
     };

    $scope.share = function(link){
      console.log(link);
        $cordovaSocialSharing.share("This is your message", "This is your subject", null, link);
    };

    $scope.showFilterBar = function () {
      $scope.filterBarInstance = $ionicFilterBar.show({
        items: $scope.feeds,
        update: function (filteredItems) {
          $scope.feeds = filteredItems;
        },
        filterProperties: 'title'
      });
    };

})

.factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (rssSource) {
            return $http.get("http://ajax.googleapis.com/ajax/services/feed/load", 
              {params: { "v": "1.0", "q": rssSource, "num": "50" } })
        }
    }
}])

.factory('FeedService1', ['$http', function ($http) {
    return {
        parseFeed: function (rssSource) {
            return $http.get(rssSource)
        }
    }
}])

.controller('NewsItemCtrl', function($scope, $state, FeedsStoreService){  
    $scope.feed = FeedsStoreService.getItemFromNews($state.params.newsId);

   $scope.openLink = function(url){
      window.open(url);
   }

})

.factory('FeedsStoreService', function(){

  var feeds = [];

  return {
    list: function(){
      feeds = [];
      return feeds;
    },

    getItemFromNews: function(itemTitle) {
      for (var i = 0; i < feeds.length; i++) {
          if (feeds[i].title === itemTitle) {
            return feeds[i];
          };
        };
        return undefined;      
    },

    save: function(newFeeds) {
      feeds = newFeeds;
    }
  }
})



