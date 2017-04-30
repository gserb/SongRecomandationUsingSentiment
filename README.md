# SongRecomandUsingSentiment

REST API that will recomend a song using the polarity of words in a text for RO language. The clasification is made using a dictionary, that contains 
the most used words for the RO language. The range of clasification is from  -5 to 5, where: 
  1. -5 -> really sad 
  2.  0 is .. :|
  3.  5 -> really happy 

In the backend there are 2 APIs combined:
  1. The API for classification of the text send in parameter 'propozitie' in sad/happy :
     http://george-recomandation-engine.herokuapp.com/api/getsong?propozitie=Love%20it
  2. The song recomandation engine API that rely on the repsonse from classification API

Dataset for dictionary of words is based in AFINN 111 dataset.

The dateset  for songs is based on Milion songs dataset.

Demo: http://george-recomandation-engine.herokuapp.com/?propozitie=O%20iubesc
