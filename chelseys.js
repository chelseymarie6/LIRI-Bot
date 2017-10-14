var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
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