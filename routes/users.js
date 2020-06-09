const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");



router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
    failureFlash: true
  }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.get("/reset-password", usersController.resetPass);

router.post('/update', usersController.update);

router.get('/sign-in/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/sign-in/github/callback', passport.authenticate('github', { failureRedirect: '/users/sign-in' }), usersController.createSession);


router.get('/sign-in/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/sign-in/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

module.exports = router;
