var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app = express();
var queries = require('./searchMiddleware');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/results', function(req, res){
  var search_query = req.param('search_query');
  //url becomes whatever is clicked.youTubeUrl
  var url = 'https://www.youtube.com/results?search_query=' + search_query;
  console.log(url)
  request(url, function(error, response, html){
    if(!error){
    //utilize the cheerio library on the returned html allowing jQuery functionality
    var $ = cheerio.load(html);
    //Finally, we'll define the variable we're going to capture
    var youTubeLink;
    $('#results').filter(function(){
      var data = $(this);
      youTubeLink = data.find('div.yt-lockup-content').first().find('a').attr('href');
      console.log('the youtube link is '+youTubeLink);
    });
    res.send([youTubeLink.slice(9)]);
    }
  });
});

app.post('/userSearch', queries.findArtist, function(req, res) {
  console.log(req.body.userInput);
  res.send(res.searchResults);
});

app.listen(process.env.PORT||5000, function() {
  console.log('Listening on localhost:5000')
});

exports = module.exports = app;