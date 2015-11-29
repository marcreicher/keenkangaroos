angular.module('queue', [])

.factory('queueServices', function($http) {
	var queue = [];

	var addToQueue = function(artist, title, src, videoLink, noVidPlaying) {
   	if (queue.length === 0 && noVidPlaying) {
      console.log('nothing in queue, playing first song');
      return ({artist: artist, songTitle: title, source: src, videoLink: videoLink})
    } else {
      queue.push({ artist: artist, songTitle: title, source: src, videoLink: videoLink});
      console.log('queue length: ' + queue.length);
    }
	};
  
  var getSong = function(resultsPath) {
  	return $http.get(resultsPath);
  };

  var remove = function(title) {
  	for (var i=0; i < queue.length; i++) {
  		if (queue[i].songTitle === title) {
  			console.log('removing ' + title + ' from queue');
  			return queue.splice(i, 1);
  		}
  	}
  };

  return {
  	queue: queue,
  	getSong: getSong,
  	addToQueue: addToQueue,
  	remove: remove
  };

});