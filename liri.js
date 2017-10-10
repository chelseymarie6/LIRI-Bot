var fs = require("fs");
var argOne = process.argv[2];
var argTwo = process.argv[3];
var keysFile = require("./keys.js");

//TWITTER
var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: 'dEyJb5Mwo3ebFOwxgI9oqmKZx',
    consumer_secret: '21AAB50c57NeeQsssYjdUeOfjG1U4aiBxU7bLA7yikugp30dcs',
    access_token_key: '915023746695434240-Z7YmGzx3oLFaActLD0KO8SL4F84dIYK',
    access_token_secret: 'wY5BSLD3EZ6v3R8HcgnHxMlazbZYTR6SKg5ChdrUdEc5W'
});

var params = {screen_name:"CoderChelsaroo", count: 20};

function grabTweets(){
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if(error){
            console.log(error);
            return;
        }
        for (var i =0; i < tweets.length; i++){
            console.log("Tweet # " + (i + 1) + " created on: " + tweets[i].created_at);
            console.log("My tweet: " + tweets[i].text);
        }
    });
}

grabTweets();

//OMDB
var APIClinet = require('omdb-api-client');
//OR
var request = require("request");

function grabMovie(){
    var queryInput = "Mr. Nobody";
    if (argTwo !== undefined){
        queryInput = argTwo;
    }
    request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200){
            var movieData = JSON.parse(body);
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country produced: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot summary: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
            console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
        } else {
            console.log(error);
            }
    });
}

grabMovie();

//SPOTIFY
var Spotify = require("node-spotify-api"); 
var spotify = new Spotify({
    id: 'a888955e9bd64e43bf3b966436fd436e',
    secret: '4b703da54a3a42dcae0692ff271b9f4f'
});

function grabSpotify(){
    spotify.search({ type: 'track', query: 'All the Small Things', limit: 1}, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
        console.log(data.tracks); 
        console.log("Album: " + trackdata.tracks.items[0].album.name);
        console.log("Artist: " + trackdata.tracks.items[0].album.artists[0].name);
        console.log("Song: " + trackdata.tracks.items[0].name);
        console.log("Preview url: "+ trackdata.tracks.items[0].preview_url);   
    });
}

grabSpotify();

//RANDOM
getRandom(){
        fsOb.readFile("random.txt","UTF-8",(err,data) => {
           console.log(data);
           var userString = data;
           //console.log(cmdString);
           var clientCommand = userString.split(",")[0];
           //console.log(clientCmd);
           var clientParam = userString.split(",")[1];
           if(clientCommand === "spotify-this-song"){
              spotifyTrack(clientParam);
           }
}

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

    //Need to test Spotify, need to test OMDB, need to figure out random.txt and how the random function is reading that file, and need to ensure the switch/case works out for user inputs (if that doesn't work, switch to if/else/else if statements). Also don't forget to comment out or remove the function calls at the bottom of each function - no longer need those for testing purposes. If have time, figure out why keys.js wasn't working for the twitter call. 
     