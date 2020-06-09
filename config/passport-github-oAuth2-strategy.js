const passport = require('passport');
const githubStrategy = require('passport-github2');
const Crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new githubStrategy({
    clientID: "Iv1.0ddda830d6ac5534",
    clientSecret: "f34e551b7f38b2fa7e77dc9444e4d40dccb62920",
    callbackURL: "http://localhost:8000/users/sign-in/github/callback",
},

    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            // console.log(profile.name);
            if (err) { console.log('error in github strategy-passport', err); return; }

            // console.log(profile.email);

            if (user) {
                // if found set this user as req.user
                return done(null, user);
            } else {
                // if not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: Crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }

                    return done(null, user);
                });
            }
        })
    }


));

module.exports = passport;