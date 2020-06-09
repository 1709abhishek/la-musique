const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
      }
    ],
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },
  {
    timestamps: true,
  }
);


// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
