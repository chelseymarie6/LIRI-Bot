var keys = require("./keys.js");

//DEPENDENCIES
var fs = require("fs");
var Twitter = require("twitter");//TWITTER
var request = require("request");//OMDB
var Spotify = require("node-spotify-api");//SPOTIFY

//KEYSgit
var client = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);

//USER INPUTS
var argOne = process.argv[2];
var argTwo = process.argv[3];

//TWITTER PARAMETER OBJECT
var parameters = {
    twitterParam: {
        screen_name: "CoderChelsaroo"
    },
}

//OMDB URL's
var queryURL = "http://www.omdbapi.com/?t=" + argTwo + "&y=&plot=short&apikey=40e9cece";
var rottenTomatoesURL = "https://www.rottentomatoes.com/search/?search=" + argTwo;

//USER INPUT COMMANDS 
if (argOne === "my-tweets"){
    grabTweets();
}
else if (argOne === "spotify-this-song"){
    grabSpotify();
}
else if (argOne === "movie-this"){
    grabMovie();
}
else if (argOne === "do-what-it-says"){
    fs.readFile("random.txt","UTF-8", function(err, data) {
        if (err){
            return console.log(err);
        }
        var cmdOne = data.split(",")[0];
        var cmdTwo = data.split(",")[1];

        if (cmdOne === "spotify-this-song"){
            grabSpotify(cmdTwo);
        }
     });
 }

 //SPOTIFY
function grabSpotify() {
    var queryInput = "Never Gonna Give You Up";
    if (argTwo !== undefined) {
         queryInput = argTwo;
    }
    spotifyClient.search({ type: 'track', query: queryInput}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
        fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name  + "\n" + "=================================================================");
    });
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
}

