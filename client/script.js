angular.module('MyApp', ["firebase", "videoplayer", 'ui.router', 'search', 'queue'])
// .controller('SongsController', function($scope, $firebaseArray){
//   var ref = new Firebase("https://blazing-fire-8914.firebaseio.com/2/5/");
//   $scope.songs = {};
//   $scope.songs.list = $firebaseArray(ref);
// })
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/queue');
  $stateProvider
    .state('search', {
      url: '/search',
      controller: 'searchController',
      templateUrl: 'search/search.html'
    })
    .state('videoplayer', {
      url: '/videoplayer',
      controller: 'videoplayerController',
      templateUrl: 'videoplayer/videoplayer.html'
    })
    .state('queue', {
      url: '/queue',
      controller: 'MyController',
      templateUrl: 'queue/queue.html'
    })
})

.controller('MyController', ['$scope', '$http', '$firebaseArray', 'queueServices', function ($scope, $http, $firebaseArray, queueServices) {
  $scope.decade;
  $scope.year;

  $('a').on('click', function() {
    $scope.decade = $(this).parent().parent().data('decade');
    $scope.year = $(this).data('year');
    // console.log($scope.decade, $scope.year, "https://blazing-fire-8914.firebaseio.com/"+$scope.decade+"/"+$scope.year+"/")
    var ref = $firebaseArray(new Firebase("https://blazing-fire-8914.firebaseio.com/"+$scope.decade+"/"+$scope.year+"/"));
    ref.$loaded(function(data){
      $scope.songs = {};
      $scope.songs.list = data;

      console.log('just loaded ' + data.length + ' items');
    })
  })


  $scope.queue = [];

  var playNext = function() {
    var next = $scope.queue.shift();
    console.log('next song to play is: ' + next.songTitle);
    $('audio').attr('src', next.source);
  };

  $("#player").bind('ended', function(){
    $('audio').attr('src', '');
    if ($scope.queue.length > 0) {
      playNext();
    }
  });


  $scope.enqueue = function() {
    $scope.resultsPath = this.songs.youTubeUrl.slice(22)
    var artist = this.songs.artist;
    var songTitle = this.songs.songTitle;

    console.log('adding ' + artist + '\'s song: ' + songTitle);

    queueServices.getSong($scope.resultsPath)
    .success(function(data) {

      console.log('line 66: song link returned');
      if ($scope.queue.length === 0 && $('audio').attr('src') === '') {
        console.log('nothing in queue, playing first song');
        $('audio').attr('src', data)
      } else {
        $scope.queue.push({ artist: artist, songTitle: songTitle, source: data });
        console.log('the length of the queue is now: ' + $scope.queue.length);
      }
    })
  };
  
  $scope.dequeue = function() {
    var queueCopy = $scope.queue;
    var newQueue = queueServices.remove(queueCopy, this.track.title);
    $scope.queue = newQueue;
  };
  
}])

.directive('dropdown', function($document) {
  return {
    restrict: "C",
    link: function(scope, elem, attr) {

      elem.bind('click', function() {
        elem.toggleClass('dropdown-active');
        elem.addClass('active-recent');
      });

      $document.bind('click', function() {
        if(!elem.hasClass('active-recent')) {
          elem.removeClass('dropdown-active');
        }
        elem.removeClass('active-recent');
      });

    }
  }
});