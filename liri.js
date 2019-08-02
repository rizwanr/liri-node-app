const axios = require('axios');
const fs = require('fs');

// Grab search command line argument
let search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
let term = process.argv.slice(3).join(' ');

const divider =
  '\n------------------------------------------------------------\n\n';

// Print whether searching for a show or actor, print the term as well

function search(t) {
  if (search === 'movie-this') {
    console.log(term);
    getMovie(term);
  } else if (search === 'concert-this') {
    getConcert(term);
  } else if (search === 'spotify-this-song') {
    getSpotifySongDetails(term);
  } else if (search === 'do-what-it-says') {
    getDoWhatItSays();
  }
}

function getMovie(movie) {
  axios
    .get(`http://www.omdbapi.com/?t=${movie}&plot=short&apikey=trilogy`)
    .then(function(response) {
      console.log(response.data);
      const jsonData = response.data;
      var movieData = [
        'Title ' + jsonData.Title,
        'Year ' + jsonData.Year,
        `${jsonData.Ratings[0].Source} : ${jsonData.Ratings[0].Value}`,
        `${jsonData.Ratings[1].Source}: ${jsonData.Ratings[1].Value}`,
        'Country ' + jsonData.Country,
        'Language ' + jsonData.Language,
        'Plot ' + jsonData.Plot,
        'Actors ' + jsonData.Actors
      ].join('\n\n');

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile('movies.txt', movieData + divider, function(err) {
        if (err) throw err;
        console.log(movieData);
      });
    });
}

function getConcert(artist) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      //console.log(response.data)
      const jsonData = response.data;
      let concertData = '';
      //console.log(jsonData)
      jsonData.forEach(event => {
        //console.log(event)
        concertData = [
          'Name ' + event.venue.name,
          'Location ' + event.venue.city,
          'Date ' + event.datetime
        ].join('\n\n');
        console.log(concertData + divider);
      });
      //Append showData and the divider to log.txt, print showData to the console
      fs.appendFile('concert.txt', concertData + divider, function(err) {
        if (err) throw err;
      });
    });
}

function getSpotifySongDetails(song) {
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: '76f59ee035304da18dc8d5c334ccff58',
    secret: 'b683280cd1dd4334ba78aabc812fd982'
  });

  spotify.search(
    {
      type: 'track',
      query: song
    },
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var spotifyData = [
        'Name of song ' + data.tracks.items[0].name,
        'Artist name ' + data.tracks.items[0].artists[0].name,
        'Preview link ' + data.tracks.items[0].external_urls.spotify,
        'Album name ' + data.tracks.items[0].album.name
      ].join('\n\n');
      fs.appendFile('spotify.txt', spotifyData + divider, function(err) {
        if (err) throw err;
        console.log(spotifyData);
      });
      // console.log(data.tracks.items.name);
      // console.log(data.tracks.items.artist);
    }
  );
}

function getDoWhatItSays() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(error);
    }
    const dataArr = data.split(',');

    search = dataArr[0];
    term = dataArr[1];

    if (search === 'movie-this') {
      console.log(term);
      getMovie(term);
    } else if (search === 'concert-this') {
      getConcert(term);
    } else if (search === 'spotify-this-song') {
      getSpotifySongDetails(term);
    }
  });
}
