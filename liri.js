const axios = require('axios');
const fs = require("fs");

// Grab search command line argument
const search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
const term = process.argv.slice(3).join(" ");



// Print whether searching for a show or actor, print the term as well
if (search === "movie-this") {
  console.log(term)
  getMovie(term);
} else if (search == "concert-this") {
  getConcert(term);
}


function getMovie(movie) {
  const divider = "\n------------------------------------------------------------\n\n";

  axios
    .get(
      `http://www.omdbapi.com/?t=${movie}&plot=short&apikey=trilogy`
    )
    .then(function (response) {
      console.log(response.data)
      const jsonData = response.data
      var movieData = [
        "Title " + jsonData.Title,
        "Year " + jsonData.Year,
        `${jsonData.Ratings[0].Source} : ${
      jsonData.Ratings[0].Value
      }`,
        `${jsonData.Ratings[1].Source}: ${
            jsonData.Ratings[1].Value}`,
        "Country " + jsonData.Country,
        "Language " + jsonData.Language,
        "Plot " + jsonData.Plot,
        "Actors " + jsonData.Actors
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("movies.txt", movieData + divider, function (err) {
        if (err) throw err;
        console.log(movieData);
      });
    })
}

function getConcert(artist) {
  const divider = "\n------------------------------------------------------------\n\n";

  axios
    .get(
      'https://rest.bandsintown.com/artists/Skrillex/events?app_id=codingbootcamp'
    )
    .then(function (response) {
      //console.log(response.data)
      const jsonData = response.data
      let concertData = ''
      //console.log(jsonData)
      jsonData.forEach(event => {
        //console.log(event)
        concertData = [
          "Name " + event.venue.name,
          "Location " + event.venue.city,
          "Date " + event.datetime
        ].join("\n\n");
        console.log(concertData + divider);
      });
      //Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("concert.txt", concertData + divider, function (err) {
        if (err) throw err;

      });
    })
}