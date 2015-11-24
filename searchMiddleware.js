var fire = require('firebase');
var Fireproof = require('fireproof');
var Promise = require('bluebird');
var ref = new fire('https://searchdatabase.firebaseio.com/');
var fireproof = new Fireproof(ref);
Fireproof.bless(Promise);
// var usersRef = fireproof.child('users');

module.exports.findArtist = function(req, res, next) {
  var searchParam = req.body.userInput
  res.searchResults = [];
  console.log(req.body)
  fireproof.orderByChild("songTitle")
  .on('child_added', function(snapshot) {
    if(snapshot.val().songTitle === searchParam || snapshot.val().artist === searchParam) {
    res.searchResults.push(snapshot.val());
    }
  })
  .then(function() {
    next()
  })

}