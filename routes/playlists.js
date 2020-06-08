const express = require("express");

const router = express.Router();
const playlistController = require("../controllers/playlist_controller");

console.log("router loaded");


// router.get("/create", playlistController.createOne);

router.post("/create-playlist", playlistController.create);

router.get("/add", playlistController.addSong);

router.get("/show", playlistController.show);

router.get("/showParticular", playlistController.showParticular);

module.exports = router;