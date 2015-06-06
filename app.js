// grab the packages we need
var express = require('express');
var sentiment = require('sentiment');
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
  
  res.send(resultSentiment);
});

// http://localhost:8080/api/getsong?propozitie=Love it
app.get('/api/getsong', function(req, res) {
  var queryString = req.param('propozitie');
  var resultSentiment = sentiment(queryString);
  
  var raspuns = {
      scor: resultSentiment.score,
      song: "Ana are mere"
  }
  
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