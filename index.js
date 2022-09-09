//Require modeles & packages
const express = require("express");

const fs = require("fs");

const app = express();

const morgan = require("morgan");

const path = require("path");

const uuid = require("uuid");

const bodyParser = require("body-parser");

const methodOverride = require("method-override");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
//App use methods from modules
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(methodOverride());

//User Array
let users = [
  {
    id: 1,
    name: "Ned",
    favoriteMovies: ["Inception"],
  },
  {
    id: 2,
    name: "Benny",
    favoriteMovies: ["Troy"],
  },
  {
    id: 3,
    name: "Pawdrick",
    favoriteMovies: ["Gladiator", "Inception"],
  },
];
//Movie Array
const movies = [
  {
    title: "Fellowship of the Ring",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    director: {
      name: "Peter Jackson",
      bio: "Some info about Peter Jackson",
      born: 1961,
      hometown: "Wellington, New Zealand",
    },
    genre: "Action",
    releaseYear: "2001",
  },
  {
    title: "The Two Towers",
    description:
      "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    director: {
      name: "Peter Jackson",
      bio: "Some info about Peter Jackson",
      born: 1961,
      hometown: "Wellington, New Zealand",
    },
    genre: "Action",
    releaseYear: "2002",
  },
  {
    title: "The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    director: {
      name: "Peter Jackson",
      bio: "Some info about Peter Jackson",
      born: 1961,
      hometown: "Wellington, New Zealand",
    },
    genre: "Action",
    releaseYear: "2003",
  },
  {
    title: "A New Hope",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    director: {
      name: "George Lucas",
      bio: "Some info about George Lucas",
      born: 1944,
      hometown: "Modesto, CA",
    },
    genre: "Action, Sci-fi",
    releaseYear: "1977",
  },
  {
    title: "Empire Strikes Back",
    description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
    director: {
      name: "George Lucas",
      bio: "Some info about George Lucas",
      born: 1944,
      hometown: "Modesto, CA",
    },
    genre: "Action, Sci-fi",
    releaseYear: "1980",
  },
  {
    title: "Return of the Jedi",
    description:
      "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
    director: {
      name: "George Lucas",
      bio: "Some info about George Lucas",
      born: 1944,
      hometown: "Modesto, CA",
    },
    genre: "Action, Sci-fi",
    releaseYear: "1983",
  },
  {
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    director: {
      name: "Ridley Scott",
      bio: "Some info about Ridley Scott",
      born: 1937,
      hometown: "Durham, England",
    },
    genre: "Action, History",
    releaseYear: "2000",
  },
  {
    title: "Avengers",
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    director: {
      name: "Joss Whedon",
      bio: "Some info about Joss Whedon",
      born: 1964,
      hometown: "New York City, NY",
    },
    genre: "Action, Sci-fi, Sci-fi",
    releaseYear: "2012",
  },
  {
    title: "Troy",
    description:
      "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
    director: {
      name: "Wolfgang Peterson",
      bio: "Some info about Wolfgang Peterson",
      born: 1941,
      death: 2022,
      hometown: "Los Angeles, CA",
    },
    genre: "Action, History",
    releaseYear: "2004",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    director: {
      name: "Christopher Nolan",
      bio: "Some info about Christopher Nolan",
      born: 1970,
      hometown: "London, England",
    },
    genre: "Action",
    releaseYear: "2010",
  },
];
//Get all movies in json
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});
//Get specific title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no movie found");
  }
});
//Get director info
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no director found");
  }
});
//Get movie genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre === genreName);

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no genre found");
  }
});

//Get users
app.get("/users", (req, res) => {
  res.json(users);
});
//Add user
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("User needs a name.");
  }
});
//Find user by id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("User not found.");
  }
});
//Add a favorite movie
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    users.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movies.title} is now a favorite!`);
  } else {
    res.status(400).send("User favorite not updated.");
  }
});
//Delete a favorite movie
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    users.favoriteMovies = users.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).send(`${movies.title} is now deleted!`);
  } else {
    res.status(400).send("User favorite not deleted.");
  }
});

//Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`User ${id} is now deleted!`);
  } else {
    res.status(400).send("User not found.");
  }
});
//Log any errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// Server running pn port 8080
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
