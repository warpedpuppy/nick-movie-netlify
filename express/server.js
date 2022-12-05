require("dotenv").config();


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
const app = express();
app.use(express.json());

const serverless = require("serverless-http");

const API_ROUTER = express.Router();

API_ROUTER
.get(
    "/movies",
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
