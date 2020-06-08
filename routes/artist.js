const express = require("express");

const router = express.Router();
const artistController = require("../controllers/artist_controller");

console.log("router loaded");




router.get("/info", artistController.info);

router.get("/mark-favorite", artistController.markArtist);

module.exports = router;