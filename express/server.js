

const { API_ROOT } = require("../config");


const express = require("express");
const app = express();
app.use(express.json());


const serverless = require("serverless-http");




const API_ROUTER = express.Router();

API_ROUTER
.get(
    "/movies",
    (req, res) => {
		res.send("movies get hit");
    //   Movies.find()
    //     .then(function (movies) {
    //       res.status(201).json(movies);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //       res.status(500).send("Error: " + error);
    //     });
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
