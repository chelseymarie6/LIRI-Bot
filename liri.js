// Make it so liri.js can take in one of the following commands:

//    * `my-tweets`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

var keysFile = require("./keys.js");
var twitterObject = require(keys.twitterKeys);
var spotifyObject = require(keys.spotifyKeys); 
//the above will be require("node-spotify-api");

var tweets

function getTweet() {
    var tweets = 
}