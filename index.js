//Require modeles & packages
const mongoose = require("mongoose");

const Models = require("./models.js");

const Movies = Models.Movie;

const Users = Models.User;

const Genres = Models.Genre;

const Directors = Models.Director;

mongoose.connect("mongodb://localhost:27017/NixFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

//Get all movies in json 2.8
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get genres 2.8
app.get("/genres", (req, res) => {
  Movies.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get directors 2.8
app.get("/directors", (req, res) => {
  Movies.find()
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//GET specific director 2.8
app.get("./movies/:Director", (req, res) => {
  Movies.findOne({ Director: req.params.Director })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get specific title 2.8
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((title) => {
      res.json(title);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get director info 2.8
app.get("/directors/:Name", (req, res) => {
  Movies.find({ Name: req.params.Name })
    .then((name) => {
      res.json(name);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get genre info 2.8
app.get("/genres/:Name", (req, res) => {
  Movies.find({ Name: req.params.Name })
    .then((name) => {
      res.json(name);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get users 2.8
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//GET specific user by Username 2.8
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//GET specific user by id 2.8
app.get("/users/:id", (req, res) => {
  Users.findOne({ Username: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Add user 2.8
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});
//Update user info by unsername 2.8
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { USername: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});
//Add a movie to users favorites 2.8
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { favoriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        fs.rmSync.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});
//Delete a favorite movie 2.8
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Movies.findByIdAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { favoriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Delete a user 2.8
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
