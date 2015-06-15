// grab the packages we need
var express = require('express');
var sentiment = require('sentiment');
var songsDataSet = require('./train_lyrics_rem_1000.json');
var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

// routes will go here

// ====================================
// URL PARAMETERS =====================
// ====================================
// http://localhost:8080/api/sentiment?propozitie=Love it
app.get('/api/sentiment', function(req, res) {
  var queryString = req.param('propozitie');
  var resultSentiment = sentiment(queryString);
  
  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(resultSentiment);
});

// http://localhost:8080/api/getsong?propozitie=Love it
// http://george-recomandation-engine.herokuapp.com/api/getsong?propozitie=Love%20it
app.get('/api/getsong', function(req, res) {
  var queryString = req.param('propozitie');
  var resultSentiment = sentiment(queryString);
  
  console.log("Rezultatul analizei")
  console.log(resultSentiment);
  
  console.log(typeof songsDataSet !== undefined ? "DATASETUL ESTE" : "NICI UN DATASET");
  
  var happySongsArray = songsDataSet.filter( function(item) { 
	  	return item.mood === "happy";
	  }),
	  sadSongsArray = songsDataSet.filter( function (item) {
		  return item.mood === "sad";
	  } ); 
 
 	// Returns a random number between min (inclusive) and max (exclusive)
	var getRandomArbitrary = function (min, max) {
  		return Math.random() * (max - min) + min;
	}
	
  	var raspuns = {
     	scor: resultSentiment.score,
      	song: parseInt(resultSentiment.score) > 0
			  ? happySongsArray[ Math.round( getRandomArbitrary(0,happySongsArray.length - 1))] 
			  : sadSongsArray[ Math.round( getRandomArbitrary(0,sadSongsArray.length - 1))]
  
		  //songsDataSet[0] //"Ana are mere"
  	}
  
  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(raspuns);
});

// http://localhost:8080/api/1
app.get('/api/:version', function(req, res) {
	res.send(req.params.version);
});

// parameter middleware that will run before the next routes
app.param('name', function(req, res, next, name) {

	// check if the user with that name exists
	// do some validations
	// add -dude to the name
	var modified = name + '-dude';

	// save name to the request
	req.name = modified;

	next();
});

// http://localhost:8080/api/users/chris
app.get('/api/users/:name', function(req, res) {
	// the user was found and is available in req.user
	res.send('What is up ' + req.name + '!');
});

// ====================================
// POST PARAMETERS ====================
// ====================================

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/api/users', function(req, res) {
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.geo;

	res.send(user_id + ' ' + token + ' ' + geo);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);