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
app.get('/api/sentiment', function(req, res) {
  var queryString = req.param('propozitie');
  var resultSentiment = sentiment(queryString);
  
  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(resultSentiment);
});


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
  	
    var songToRecomand = parseInt(resultSentiment.score) > 0
			  ? happySongsArray[ Math.round( getRandomArbitrary(0,happySongsArray.length - 1))] 
			  : sadSongsArray[ Math.round( getRandomArbitrary(0,sadSongsArray.length - 1))]
  
  
  	var raspuns = {
     	  scor: resultSentiment.score,
      	song: songToRecomand
		  //songsDataSet[0] //"Ana are mere"
  	}
  

  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(raspuns);
});



app.get('/', function(req, res) {
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
  	
    var songToRecomand = parseInt(resultSentiment.score) > 0
			  ? happySongsArray[ Math.round( getRandomArbitrary(0,happySongsArray.length - 1))] 
			  : sadSongsArray[ Math.round( getRandomArbitrary(0,sadSongsArray.length - 1))]
  
  
  	var raspuns = {
     	  scor: resultSentiment.score,
      	song: songToRecomand,
        url: "<a target='_blank' href='https://www.youtube.com/results?q=" + songToRecomand.artist + " " + songToRecomand.title  + "&app=desktop'>test</a>"
		  //songsDataSet[0] //"Ana are mere"
  	}
  
  var raspunsHtml = "<div style='margin: 8%'><h1>Rezultatele Analizei</h1>" +
          "<h3>Textul cautat:&nbsp" +"<span style='color: orange'>" + queryString + "</span>" + "</h3>" +
          "<div> Scor : &nbsp" + resultSentiment.score + "</div>" + 
          "<div> Melodie recomandata </div>" +
          "<div style='padding-left:2%;'>Artist :&nbsp" +"<span style='color: orange'>"+ songToRecomand.artist + "</span>" + "</div>" +  
          "<div style='padding-left:2%;'>Titlul melodiei :&nbsp" +"<span style='color: orange'>" + songToRecomand.title + "</span>" + "</div>" + 
          "<div style='padding-left:2%;'>Stare :&nbsp" + "<span style='color: orange'>" + (songToRecomand.mood == 'sad' ? 'trist' : 'fericit') + "</span>" + "</div>" + 
          "<div style='padding-left:2%;'>An :&nbsp" +"<span style='color: orange'>" + songToRecomand.year + "</span>" + "</div>" + 
          "</br>" +
          "<div>" +
          "<a target='_blank' href='https://www.youtube.com/results?q=" + songToRecomand.artist + " " + songToRecomand.title  + "&app=desktop'>Youtube Link pentru melodia " + songToRecomand.artist + " " + songToRecomand.title + "</a>" +
          "</div></br><div> Rezultatul intreg in urma analizei textului introdus: </br>" + JSON.stringify(resultSentiment) + "</div></div>";
          
  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(raspunsHtml);
});






// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);