angular.module('search', [])

.controller('searchController', function($scope, $http) {

  $scope.searchSong = function(input) {
    console.log(input)
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

    $scope.sendUrl = function(youTubeUrl) {
    $scope.resultsPath = youTubeUrl.slice(22)
    console.log($scope.resultsPath);
    $http.get($scope.resultsPath).success(function(data){
      console.log("HELLO: ", data)
      $('audio').attr('src', data);
      // audio.src = data;
    });
  }


})