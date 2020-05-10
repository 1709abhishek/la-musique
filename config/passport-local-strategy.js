const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
      // passReqToCallback: true
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(null, err);
        }
        if (!user || !user.validPassword(password)) {
          console.log("Invalid Username/Password");
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);

// serialising the user to decide which key is to be kept in the cokkies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialising the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport cookie");
      return done(err);
    }
    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, then pass on the next function (controllers's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("./sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
