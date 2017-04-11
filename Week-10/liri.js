var parameters = process.argv.slice(3);  
var commandName = process.argv[2];      
var titleStringOne = " ";


for (i = 0; i < parameters.length; i++){
  titleStringOne += parameters[i] + " ";
}

function liriApp(appName, titleString) {

  var keys = require("./keys.js");
  var request = require('request');     
  var Twitter = require('twitter');    
  var spotify = require('spotify');     
  var fs = require('fs'); 

  var movieTitle;               
  var movieUrl;                 
  var movieSearchResult;        
  var songTitle;               
  var commandArr;                 
  var commandLiri;                
  var commandParameter;           
 
  switch (appName){       
    case "My-Tweets":
      var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
      });
      var params = {screen_name: 'Musiconlystuff'};
      client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
          
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
            fs.appendFile("log.txt", tweets[i].text + "\n");
          }
        }
      });
      break;
    case "spotify-this-song":
      if (parameters == "") {
          songTitle = "The Sign";
      } else {
          songTitle = titleString;
      }
      
      spotify.search ({type: 'track', query: songTitle}, function(err, data) {
          if ( err ) {
              console.log('Error:' + err);
              return;
          }
       
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 5; i++) {
            console.log("The artist is: " + data.tracks.items[i].artists[0].name);
            console.log("The track name is: " + data.tracks.items[i].name);
            console.log("The album name is: " + data.tracks.items[i].album.name);
            console.log("The Spotfiy preview is: " + data.tracks.items[i].external_urls.spotify);
            fs.appendFile("log.txt",  "The artist is: " + data.tracks.items[i].artists[0].name + "\n");
            fs.appendFile("log.txt",  "The track name is: " + data.tracks.items[i].name + "\n");
            fs.appendFile("log.txt",  "The album name is: " + data.tracks.items[i].album.name + "\n");
            fs.appendFile("log.txt",  "The Spotfiy preview is: " + data.tracks.items[i].external_urls.spotify + "\n");
          } 
      });

      break;
    case "movie-this":
      if (parameters == "") {
          movieTitle = "Little Nimo";
      }
      else {
          movieTitle = titleString;
      }
      movieUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&tomatoes=true&y=&plot=short&r=json";
      request(movieUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              movieSearchResult = JSON.parse(body);
              console.log("The Title is: " + movieSearchResult.Title);
              console.log("The imdbRating is: " + movieSearchResult.imdbRating);
              console.log("The Country is: " + movieSearchResult.Country);
              console.log("The Language is: " + movieSearchResult.Language);
              console.log("The Plot is: " + movieSearchResult.Plot);
              console.log("The Actors are: " + movieSearchResult.Actors);
              console.log("The Rotton Tomatoes Rating is: " + movieSearchResult.tomatoRating);
              console.log("The Rotton Tomatoes url is: " + movieSearchResult.tomatoURL);
              fs.appendFile("log.txt", "\n");
              fs.appendFile("log.txt",  "The Title is: " + movieSearchResult.Title + "\n");
              fs.appendFile("log.txt",  "The imdbRating is: " + movieSearchResult.imdbRating + "\n");
              fs.appendFile("log.txt",  "The Country is: " + movieSearchResult.Country + "\n");
              fs.appendFile("log.txt",  "The Language is: " + movieSearchResult.Language + "\n");
              fs.appendFile("log.txt",  "The Plot is: " + movieSearchResult.Plot + "\n");
              fs.appendFile("log.txt",  "The Actors are: " + movieSearchResult.Actors + "\n");
              fs.appendFile("log.txt",  "The Rotton Tomatoes Rating is: " + movieSearchResult.tomatoRating + "\n");
              fs.appendFile("log.txt",  "The Rotton Tomatoes url is: " + movieSearchResult.tomatoURL + "\n");
            }
          });
      break;
    case "do-what-it-says":
      
      fs.readFile("random.txt", "utf8", function(error, commandData) {
          commandArr = commandData.split(',');
          commandLiri = commandArr[0];
          commandParameter = commandArr[1];
          liriApp(commandLiri, commandParameter);
          console.log("the parameter is " + commandParameter);
          console.log("the liri command is " + commandLiri);
      });  
      break;

    default:
      console.log("No Command"); 
      break;
  }
}

liriApp(commandName, titleStringOne);