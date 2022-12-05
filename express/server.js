require("dotenv").config();
const { check, validationResult } = require("express-validator"); //2.10

//const Config = require("./config");

const mongoose = require("mongoose");

const Models = require("../models.js");

const Movies = Models.Movie;

const Users = Models.User;

const Genres = Models.Genre;

const Directors = Models.Director;
const { API_ROOT, CONNECTION_URI } = require("../config");
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const serverless = require("serverless-http");
const app = express();
app.use(express.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

//App use methods from modules
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));
const cors = require("cors"); //2.10
let allowedOrigins = [
  "http://localhost:8080",
  "http://testsite.com",
  "http://localhost:1234",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn/n't allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
//let auth = require("./auth")(app);
//FIX LOGIN ENDPOINT
//const passport = require("passport");
require("../passport");
const methodOverride = require("method-override");

app.use(methodOverride());
const API_ROUTER = express.Router();

API_ROUTER.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})
  .get(
    "/movies",
    //passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Movies.find()
        .then(function (movies) {
          res.status(201).json(movies);
        })
        .catch(function (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        });
    }
  )

  .post("/movies", (req, res) => {
    res.send("movies post hit");
  })
  .put("/movies", (req, res) => {
    res.send("movies put hit");
  })
  .delete("/movies", (req, res) => {
    res.send("movies delete hit");
  })
  .get("/users", (req, res) => {
    res.send("user get hit");
  })
  .post("/users", (req, res) => {
    res.send("user post hit");
  })
  .put("/users", (req, res) => {
    res.send("user put hit");
  })
  .delete("/users", (req, res) => {
    res.send("user delete hit");
  });

app.use(API_ROOT, API_ROUTER);

module.exports = app;
module.exports.handler = serverless(app);
