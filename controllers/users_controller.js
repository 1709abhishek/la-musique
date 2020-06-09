
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const Song = require('../models/song');
const Playlist = require('../models/playlist');
const Queue = require('../models/queue');

module.exports.profile = async function (req, res) {
  var songs = await Song.find({});
  var playlists = await Playlist.find({});
  console.log(songs);
  return res.render("user_profile", {
    title: "User Profile",
    songs: songs,
    playlists: playlists
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("./profile");
  }

  return res.render("user_sign_up", {
    title: "SquareOne | Sign Up",
    recaptcha: res.recaptcha
  });
};

// render the sign in page
module.exports.signIn = async function (req, res) {
  // if (!req.recaptcha.error) {

  if (req.isAuthenticated()) {
    return res.redirect("./profile");
  }
  // }

  return res.render("user_sign_in", {
    title: "SquareOne | Sign In",
    recaptcha: res.recaptcha
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  //   console.log("body is", req.body.name);
  // if (!req.recaptcha.error) {
  if (req.body.password != req.body.confirm_password) {
    console.log("password mismatch");
    req.flash('error', 'passwords mismatch');
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      // const hash = bcrypt.hashSync(req.body.password, saltRounds);
      // console.log(hash);

      var newUser = new User();

      newUser.email = req.body.email;
      newUser.name = req.body.name;
      newUser.password = newUser.generateHash(req.body.password);



      User.create(newUser, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        req.flash('success', "created successfully");
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
  // }

};

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  // making a queue for each user at the time of creating the user.
  var queue = await new Queue();
  queue.user = req.user._id;
  queue.save();
  console.log(req.user._id);

  return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};

module.exports.resetPass = function (req, res) {

  return res.render("reset_password", {
    title: "SquareOne | reset"
  });
};

module.exports.update = function (req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.name = user.name;
    newUser.password = newUser.generateHash(user.password);
    user.update({ password: newUser.password }, function (err, user) {
      if (err) {
        console.log("error in updating password", err);
      }
      console.log("done updating");
      console.log("*****", req.body.email);
      newMailer.newMail(req.body);
      return res.redirect('./sign-in');
    })
  });
}

module.exports.forgot = function (req, res) {
  return res.render("forgot_password", {
    title: "User forgot pass",
  });
};

module.exports.forgotPassword = async function (req, res) {

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.flash('error', 'invalid username');
      return res.redirect('back');
    }

    newMailer.newForgot(req.body,
      {
        // doctor: doctor,
        token: jwt.sign(user.toJSON(), 'blahSomething', { expiresIn: '100000' })
      });
    return res.redirect('./sign-in');
  } catch (err) {
    console.log('********', err);
  }
}

// module.exports.verify = function (req, res) {
//   jwt.verify(req.params.token, 'blahSomething', function (err, decoded) {
//     if (err) {
//       console.log("error during verifying");
//     }
//     let user = decoded;
//     if (req.body.password != req.body.confirm_password) {
//       console.log("password mismatch");
//       req.flash('error', 'passwords mismatch');
//       return res.redirect('back');
//     }
//     let newUser = new User();
//     newUser.name = user.name;
//     newUser.email = user.email;
//     newUser.password = newUser.generateHash(req.body.password);
//     user.update({ password: newUser.password }, function (err, user) {
//       if (err) {
//         console.log("error in updating password", err);
//       }
//       console.log("done updating");
//       console.log("*****", req.body.email);
//       newMailer.newMail(req.body);
//       return res.redirect('./sign-in');
//     })
//   });
// }


