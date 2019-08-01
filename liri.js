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
} else {
  console.log("Searching for TV Actor");
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
      fs.appendFile("log.txt", movieData + divider, function (err) {
        if (err) throw err;
        console.log(movieData);
      });
    })
}


// var artist = 'Skrillex';
// axios
//   .get(
//     'https://rest.bandsintown.com/artists/' +
//       artist +
//       '/events?app_id=codingbootcamp'
//   )
//   .then(function(response) {
//     const eventsArray = [];
//     const events = response.data;
//     events.forEach(event => {
//       const name = event.venue.name;
//       const location = event.venue.city;
//       const date = event.datetime;
//       eventsArray.push({
//         name,
//         location,
//         date
//       });
//     });
//     console.log(eventsArray);
//   });