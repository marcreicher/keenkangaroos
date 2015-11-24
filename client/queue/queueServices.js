angular.module('queue', [])

.factory('queueServices', function($http) {
  
  var getSong = function(resultsPath) {
  	return $http.get(resultsPath);
  };

  var remove = function(queue, title) {
  	for (var i=0; i < queue.length; i++) {
  		if (queue[i].songTitle === title) {
  			console.log('removing ' + title + ' from queue');
  			return queue.splice(i, 1);
  		}
  	}
  };

  return {
  	getSong: getSong,
  	remove: remove
  };

});