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
  }


})