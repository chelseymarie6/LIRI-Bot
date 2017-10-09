var fs = require("fs");
var argOne = process.argv[2];
var argTwo = process.argv[3];
var request = require("request");
//var keysFile = require("./keys.js");

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
// var omdbObject = require("request");





// //SPOTIFY
// var spotifyObject = require("node-spotify-api"); 
// var spotifyClient = new spotifyObject("keys.spotifyKeys");

// //COMMANDS
// if(command === "my-tweets"){
//     console.log("Calling Twitter...")
//     grabTweets();
// }