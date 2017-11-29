//get keys from keys.js
const keys = require('./keys')
//const to use spotifiy
const Spotify = require('node-spotify-api');
//const to use twitter
const Twitter = require('twitter');
//const to use request
const request = require('request');
//const to use fs
const fs = require('fs')
//make sure I am getting keys properly
// console.log(keys)
//vars for user input
var input = process.argv;
var operator = input[2];
var userReq = "";
//omdb
function omdbApi() {
    for (var i = 3; i < process.argv.length; i++) {
       if(userReq === "") {
           userReq = userReq + process.argv[i];
       }
       else{
           userReq = userReq + " " + process.argv[i];
       }
    }
    console.log(userReq);
    if (userReq === "") {
        userReq = "Mr. Nobody"
    }
    var queryUrl = `http://www.omdbapi.com/?t=${userReq}&y=&plot=short&apikey=40e9cece`;
    request(queryUrl, function (err, response, body) {
        if (err) {
            console.log(err)
        }
        if (response.statusCode === 200) {
            var omdbInfo = JSON.parse(body)
            console.log(`Title: ${omdbInfo.Title}`)
            console.log(`Released in: ${omdbInfo.Year}`)
            console.log(`Origin: ${omdbInfo.Country}`)
            console.log(`Plot: ${omdbInfo.Plot}`)
            console.log(`Actors: ${omdbInfo.Actors}`)
        }
    })
}
if (operator === 'movie-this') {
    omdbApi()
}
//twitter
function myTweets() {
    var newTweet = new Twitter(keys.twitterKeys);
    var params = { screen_name: 'Wendys' };
    newTweet.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function(tweet){
                console.log("=========================");
                console.log(`Name: ${tweet.user.name}`);
                console.log(`Text: ${tweet.text}`);
            })
            console.log(tweets.length);
        }
    });
}
if (operator === 'my-tweets') {
    myTweets()
}

//spotify
function spotifyThis(searchedSong) {
    if (searchedSong === '') {
        searchedSong = 'The Sign';
    }

    var spotify = new Spotify(keys.spotifyKeys);

    spotify.search({type: 'track', query: searchedSong}, function(err, data) {
      if (!err) {
        console.log()
        console.log(`Name: ${data.tracks.items[0].name}`); 
        console.log("=========================");
        console.log(`Album: ${data.tracks.items[0].album.name}`); 
        console.log("=========================");
        console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`); 
        console.log("=========================");
        console.log(`Preview: ${data.tracks.items[0].preview_url}`); 
        console.log();
      }else {
        return console.log('Error occurred: ' + err);
      }
    
    });
}
    
if(operator === 'spotify-this-song'){
    for (var i = 3; i < process.argv.length; i++) {
        if (userReq === '') {
            userReq = userReq + process.argv[i];
        }
        else {
            userReq = userReq + ' ' + process.argv[i];
        }
    }
    spotifyThis(userReq);
}
