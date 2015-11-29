angular.module('search', [])

.controller('searchController', function($scope, $http, queueServices) {
  console.log(queueServices);

  $scope.searchResults = [];

  $scope.enqueue = $scope.$parent.enqueue;

  // $scope.enqueue = function(artist, title, youTubeUrl) {
  //   var resultsPath = youTubeUrl.slice(22);
  //   var artist = artist;
  //   var songTitle = title;
  //   console.log('adding ' + artist + '\'s song: ' + songTitle);

  //   queueServices.getSong(resultsPath)
  //   .success(function(data) {
  //     console.log('http success, song link returned: ' + data);
  //     var first = queueServices.addToQueue(artist, songTitle, data);
  //     if (first) {
  //       $scope.$parent.currentSong = first;
  //     }
  //   })
  // };

  $scope.searchSong = function(input) {
    return $http({
      method: 'POST',
      url: '/userSearch',
      headers: {
        'Content-Type': 'application/JSON'
      },
      data: {userInput: input}

    })
    .then(function(res) {
      $scope.searchResults = res.data;
    })
  }

  //   $scope.sendUrl = function(youTubeUrl) {
  //   $scope.resultsPath = youTubeUrl.slice(22)
  //   console.log($scope.resultsPath);
  //   $http.get($scope.resultsPath).success(function(data){
  //     console.log("HELLO: ", data)
  //     $('audio').attr('src', data);
  //     // audio.src = data;
  //   });
  // }


})