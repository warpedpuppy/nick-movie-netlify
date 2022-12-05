const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs"); //2.10

let movieSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});
//2.10
userSchema.statics.hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};
//2.10
userSchema.methods.validatePassword = function (password) {
  return bcryptjs.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
