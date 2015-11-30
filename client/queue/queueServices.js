angular.module('queue', [])

.factory('queueServices', function($http) {
	var queue = [];

	var addToQueue = function(artist, title, src, videoLink, noVidPlaying, artistImage) {
   	if (queue.length === 0 && noVidPlaying) {
      console.log('nothing in queue, playing first song');
      return ({artist: artist, songTitle: title, source: src, videoLink: videoLink, artistImage: artistImage});
    } else {
      queue.push({ artist: artist, songTitle: title, source: src, videoLink: videoLink, artistImage: artistImage});
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

  var getArtistPhoto = function(artist) {
    var artist = artist.replace(' ', '+');
    var server = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=57ee3318536b23ee81d6b27e36997cde&format=json';
    return $http.get(server);
  };

  return {
  	queue: queue,
  	getSong: getSong,
  	addToQueue: addToQueue,
  	remove: remove,
    getArtistPhoto: getArtistPhoto
  };

});