angular.module('queue', [])
// script tag in index.html

// DONE queue module should be DI'd into script.js

// DONE queueServices should be listed in myController with $http, $scope, etc

// DONE in myController, insert a $scope.enqueue function

// DONE use functionality of sendURL function to get the audio src back, but instead of adding it straight to audio tag, enqueue it

// DONE add an event listener for when a song finishes playing to dequeue it off the stack, then add it to audio tag

.factory('queueServices', function($http) {
  
  var getSong = function(resultsPath) {
  	return $http.get(resultsPath);
  };

  var remove = function(queue, title) {
  	for (var i=0; i<queue.length; i++) {
  		if (queue[i].songTitle === title) {
  			return queue.splice(i, 1);
  		}
  	}
  };

  return {
  	getSong: getSong,
  	remove: remove
  };

});