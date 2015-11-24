angular.module('MyApp', ["firebase", "videoplayer", 'ui.router', 'search', 'queue'])

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
      templateUrl: 'queue/queue.html'
    })
})

.controller('MyController', ['$scope', '$http', '$firebaseArray', 'queueServices', function ($scope, $http, $firebaseArray, queueServices) {
  $scope.decade;
  $scope.year;
  $scope.queue = [];
  $scope.currentSong;

  $('a').on('click', function() {
    $scope.decade = $(this).parent().parent().data('decade');
    $scope.year = $(this).data('year');
    var ref = $firebaseArray(new Firebase("https://peppypossumsripple.firebaseio.com/" + $scope.decade + "/" + $scope.year + "/"));
    ref.$loaded(function(data){
      $scope.songs = {};
      $scope.songs.list = data;
      console.log('just loaded ' + data.length + ' items');
    })
  });

  $('#player').bind('ended', function(){
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
      console.log('http success, song link returned: ' + data);
      if ($scope.queue.length === 0 && $('audio').attr('src') === '') {
        console.log('nothing in queue, playing first song');
        $scope.currentSong = artist + ' - ' + songTitle;
        $('audio').attr('src', data);
      } else {
        $scope.queue.push({ artist: artist, songTitle: songTitle, youTubeUrl: data });
        console.log('queue length: ' + $scope.queue.length);
      }
    })
  };
  
  $scope.dequeue = function() {
    var newQueue = queueServices.remove($scope.queue, this.track.songTitle);
    $scope.$apply(function() {
      $scope.queue = newQueue
      console.log('new queue length is ' + $scope.queue.length);
    })
  };

  function playNext() {
    var next = $scope.queue.shift();
    console.log('next song to play is: ' + next.songTitle);
    // $apply kickstarts the $digest cycle to update current song and $scope.queue
    $scope.$apply(function () {
      $scope.currentSong = next.artist + '  -  ' + next.songTitle;
    });
    $('audio').attr('src', next.youTubeUrl);
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
  };
});