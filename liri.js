var keys = require("./keys.js");

//DEPENDENCIES
var fs = require("fs");
var Twitter = require("twitter");//TWITTER
var request = require("request");//OMDB
var Spotify = require("node-spotify-api");//SPOTIFY

//KEYS
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

//USER INPUTS
var argOne = process.argv[2];
var argTwo = process.argv[3];

//PARAMETER OBJECTS
var parameters = {
    twitterParam: {
        screen_name: "CoderChelsaroo"
    },
    spotifyParam: {
        type: "track",
        query: argTwo,
        limit: 1
    }
}

//OMDB URL's
var queryURL = "http://www.omdbapi.com/?t=" + argTwo + "&y=&plot=short&apikey=40e9cece";
var rottenTomatoesURL = "https://www.rottentomatoes.com/search/?search=" + argTwo;

//USER INPUT COMMANDS (trying my hand at switch/case for simplicity...)
switch(argOne) {
    case "my-tweets":
        grabTweets();
        break;
    case "spotify-this-song":
        grabSpotify();
        break;
    case "movie-this":
        grabMovie();
        break;
    case "do-what-it-says":
        getRandom();
        break;
}

//TWITTER
function grabTweets(){
    client.get("statuses/user_timeline", parameters.twitterParam, function(error, tweets, response){
        if(!error && response.statusCode === 200){
            for (var i =0; i < tweets.length; i++){
            console.log("Tweet # " + (i + 1) + " created on: " + tweets[i].created_at);
            console.log("My tweet: " + tweets[i].text);
            }
        } else {
            return console.log(error);
          }
    });
}

//OMDB
function grabMovie(){
    if (argTwo){
        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200){
                var movieData = JSON.parse(body);
                console.log("Title: " + movieData.Title);
                console.log("Year: " + movieData.Year);
                console.log("IMDB Rating: " + movieData.imdbRating);
                console.log("Country produced: " + movieData.Country);
                console.log("Language: " + movieData.Language);
                console.log("Plot summary: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);
                console.log("Rotten Tomatoes URL: " + rottenTomatoesURL);
            } 
        }); 
    } else {
            queryURL = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=40e9cece";
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode == 200){
                    var movieData = JSON.parse(body);
                    console.log("Title: " + movieData.Title);
                    console.log("Year: " + movieData.Year);
                    console.log("IMDB Rating: " + movieData.imdbRating);
                    console.log("Country produced: " + movieData.Country);
                    console.log("Language: " + movieData.Language);
                    console.log("Plot summary: " + movieData.Plot);
                    console.log("Actors: " + movieData.Actors);
                    console.log("Rotten Tomatoes URL: " + rottenTomatoesURL);
                } 
            }); 
        }

//SPOTIFY
var spotifyClient = new Spotify(keys.spotifyKeys);
function grabSpotify(){
   // if (parameters.spotifyParam.que === undefined){
   //     parameters.spotifyParam.query = "Never Gonna Give You Up";
   // }
   
   spotifyClient.search({ type: 'track', query: "help", limit: 1}, function(err, data) {
      //  if (argTwo){
      //      argTwo = process.argv.splice(3).join(" "); //this splices, and joins everything after "spotify'this-song" so the function can handle songs with more than one word
      //      query = argTwo;
      //      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      //      console.log("Album: " + data.tracks.items[0].album.name);
      //      console.log("Song: " + data.tracks.items[0].name);
      //      console.log("Preview url: "+ data.tracks.items[0].href);
        if (err) {
         return console.log('Error occurred: ' + err);
       } else {
           //logs Rick Astley's Never Gonna Give You Up if no input from user
           console.log("Artist: " + data.tracks.items[0].artists[0].name);
           console.log("Album: " + data.tracks.items[0].album.name);
           console.log("Song: " + data.tracks.items[0].name);
           console.log("Preview url: "+ data.tracks.items[0].href);
       }     
   });
}
grabSpotify();


//SPOTIFY old
function grabSpotify(argTwo){
    if (parameters.spotifyParam.query === undefined){
        parameters.spotifyParam.query = "Never Gonna Give You Up";
    }
    
    spotifyClient.search({type: "track", query: "Never Gonna Give You Up", limit: 1}, function(err, data) {
        if (argTwo){
            argTwo = process.argv.splice(3).join(" "); //this splices, and joins everything after "spotify'this-song" so the function can handle songs with more than one word
            query = argTwo;

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview url: "+ data.tracks.items[0].preview_url);
        } else if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            //logs Rick Astley's Never Gonna Give You Up if no input from user
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview url: "+ data.tracks.items[0].preview_url);
        }     
    });
}

//SPOTIFY test
// var Spotify = require('node-spotify-api');
// var spotifyClient = new Spotify(keys.spotifyKeys);
// //SPOTIFY
// function grabSpotify(argTwo){
//     if (argTwo === undefined || argTwo === null){
//         argTwo === "Never Gonne Give You Up";
//     }
//     spotifyClient.search({type: "track", query: argTwo, limit: 1}, function (err, data){
//         if (err){
//             return console.log("Error occured: " + err);
//         }
//         console.log("Artist: " + data.tracks.items[0].artists[0].name);
//         console.log("Album: " + data.tracks.items[0].album.name);
//         console.log("Song: " + data.tracks.items[0].name);
//         console.log("Preview url: "+ data.tracks.items[0].preview_url);
//     });

// }
//grabSpotify();
//console.log (Spotify);

//RANDOM
function getRandom(){
    fs.readFile("random.txt","UTF-8", function(error, data) {
        if(error) {
            console.log("Something went wrong" + error);
          }
          grabSpotify();
      });
};
}

