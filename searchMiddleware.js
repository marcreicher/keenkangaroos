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
  .equalTo(searchParam)
  .on('child_added', function(snapshot) {
    console.log("snapshot: " + snapshot)
    res.searchResults.push(snapshot.val());
    console.log("snapchat.val: " + JSON.stringify(snapshot.val()))
  })
  // .then(function() {
  // // console.log("searchParam: " + searchParam)
  //   fireproof.orderByChild("artist")
  //   .equalTo(searchParam)
  //   .on('child_added', function(snapshot) {
  //   res.searchResults.push(snapshot.val());
  //   })
  // })
  .then(function() {
    console.log('rejected')
    next()
  }, function() {
  })

}