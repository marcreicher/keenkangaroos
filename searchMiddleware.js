var fire = require('firebase');
var Fireproof = require('fireproof');
var Promise = require('bluebird');
var ref = new fire('https://searchdatabase.firebaseio.com/');
var fireproof = new Fireproof(ref);
Fireproof.bless(Promise);
// var usersRef = fireproof.child('users');

module.exports.findArtist = function(req, res, next) {
  res.searchResults = [];
  console.log("reaching middleware")
  fireproof.orderByChild("artist")
  .equalTo("Patti Page")
  .on('child_added', function(snapshot) {
    res.searchResults.push(snapshot.val());
  console.log("snapchat.val: " + JSON.stringify(snapshot.val()))
  })
  .then(function() {

    next()
  })

}