const express = require("express");

const router = express.Router();
const genreController = require("../controllers/genre_controller");

console.log("router loaded");




router.get("/fetch", genreController.fetch);
router.post("/store", genreController.storeGenre);

module.exports = router;