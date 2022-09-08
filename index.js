const express = require("express");

const fs = require("fs");

const app = express();

const morgan = require("morgan");

const path = require("path");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

const bodyParser = require("body-parser"),
  methodOverride = require("method-override");

const topMovies = [
  {
    name: "Fellowship of the Ring",
    director: "Peter Jackson",
  },
  {
    name: "The Two Towers",
    director: "Peter Jackson",
  },
  {
    name: "The Return of the King",
    director: "Peter Jackson",
  },
  {
    name: "A New Hope",
    director: "George Lucas",
  },
  {
    name: "Empire Strikes Back",
    director: "George Lucas",
  },
  {
    name: "Return of the Jedi",
    director: "George Lucas",
  },
  {
    name: "Gladiator",
    director: "Ridley Scott",
  },
  {
    name: "Avengers",
    director: "Anthony Russo, Joe Russo, Joss Whedon",
  },
  {
    name: "Troy",
    director: "Wolfgang Peterson",
  },
  {
    name: "Inception",
    director: "Christopher Nolan",
  },
];

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
