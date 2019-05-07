


// Grab the axios package...

require("dotenv").config();
var fs = require ("fs");
//var request = require("request");
var axios = require("axios");
var keys = require("./key.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
 

// variables to capture user inputs
var userInput1 = process.argv[2];
var userInput2 = process.argv[3];
var userInput3 = process.argv[4];

// function to prompt user selection
 
inputs(userInput1, userInput2);

function inputs(userInput1, userInput2) {

  switch (userInput1) {
      case 'concert-this':
      
      showConcertInfo(userInput2);
      break; 
 
      case 'spotify-this-song':
      showSongInfo (userInput2);
      break;

  case 'movie-this':
      showMovieInfo(userInput2);
      break;

      case 'do-what-it-says':
        showSomeInfo();
        break;
   
  }
}
//Funtion for Movie Info: OMDB
function showMovieInfo(userInput2){
     if (userInput2 === undefined) {
        userInput2 = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' you should watch here <http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' you should watch here <http://www.imdb.com/title/tt0485947/adele" +"\n");
        console.log("It's on XFinityStream");
        fs.appendFileSync("log.txt", "It's on XFinityStream!\n");
    } 


// Then run a request with axios to the OMDB API with the movie specified
 axios.get("http://www.omdbapi.com/?t=" + userInput2 +"&y=&plot=short&apikey=29b20143").then(
    
    function(response) {
       
      //console.log(response);

      console.log("The movie's rating is: " + response.data.imdbRating);
      console.log("**********MOVIE INFO*********");  
      fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
      console.log("Title: " + response. data.Title);
      fs.appendFileSync("log.txt", "Title: " + response. data.Title + "\n");
      console.log("Release Year: " + response. data.Year);
      fs.appendFileSync("log.txt", "Release Year: " + response.data.Year + "\n");
      console.log("IMDB Rating: " + response.data.imdbRating);
      fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating + "\n");
      //console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(data));
      //fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(data) + "\n");
      console.log("Country of Production: " + response.data.Country);
      fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country + "\n");
      console.log("Language: " + response.data.Language);
      fs.appendFileSync("log.txt", "Language: " + response.data.Language + "\n");
      console.log("Plot: " + response.data.Plot);
      fs.appendFileSync("log.txt", "Plot: " + response.data.Plot + "\n");
      console.log("Actors: " + response.data.Actors);
      fs.appendFileSync("log.txt", "Actors: " + response.data.Actors + "\n");
      console.log("*****************************");  
      fs.appendFileSync("log.txt", "*****************************\n");
    }
  ) 

} 

// function to get concert information  using band In town


function showConcertInfo(userInput2){

  bandName = userInput2 + " " + userInput3;

 //debugger;
 axios.get("https://rest.bandsintown.com/artists/"+ bandName + "/events?app_id=codingbootcamp").then(
  
      function(request) { 
        //artists= request.data;
         
       // console.log(request);
       

         if (request.status !== 200) {

          return console.log("error:" + request.status + "-" + request.statusText);
      
        }else if (request.data.length == 0){
          return console.log("There's no concert found");
          
        }
  
 if (request.status === 200) {
        var artists = request.data;
       // console.log(artists);
        for (var i = 0; i < artists.length; i++) { 
          
            console.log("**********EVENT INFO*********");  
            fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Name of the Venue: " + artists[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + artists[i].venue.name+"\n");
            console.log("Venue Location: " +  artists[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " +  artists[i].venue.city+"\n");
            console.log("Date of the Event: " +  artists[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " +  artists[i].datetime+"\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+"\n");
        }
    } else{
      console.log('Error occurred.' + request.status);
      
    }
      }
     
 )}
    
     



// function to get the song information using Spotify
 
function showSongInfo(userInput2){
  
    if (userInput2 === undefined) {
        userInput2 = "Hello"; //default Song
       
    }

    /* axios.get("https://api.spotify.com/v1/"+ userInput2 + spotify).then(
     
       
        */
       spotify.search(
        {
            type: "track",
            query: userInput2
        },
       
      function (err, data) {
      
          if (err) {
              console.log("Error occurred: " + err);
              return;
          }
          var songs = data.tracks.items;
         // Then we pull out only 5 songs matching the criteria out the tracks.data to make less cluthered
         //I could pull out all songs in the array with  for (var i = 0; i < songs.length 5; i++) {
          for (var i = 0; i < 5; i++) {
              console.log("**********SONG INFO*********");
              fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
              console.log(i);
              fs.appendFileSync("log.txt", i +"\n");
              console.log("Song name: " + songs[i].name);
              fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
              console.log("Preview song: " + songs[i].preview_url);
              fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
              console.log("Album: " + songs[i].album.name);
              fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
              console.log("Artist(s): " + songs[i].artists[0].name);
              fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
              console.log("*****************************");  
              fs.appendFileSync("log.txt", "*****************************\n");
               
           }
      }
  );
};
 

 
// function to get  anything else
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        inputs(dataArr[0], dataArr[1]);
	});

 
}