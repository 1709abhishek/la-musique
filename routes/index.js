const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/playlists", require("./playlists"));
router.use("/queue", require("./queue"));
router.use("/artist", require("./artist"));
router.use("/genre", require("./genre"));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

router.get('/fetch', homeController.fetch);
router.get('/mark-favorite', homeController.mark);

router.get('/showFavorite', homeController.showFavorite);

router.get('/showFavoriteArtist', homeController.showFavoriteArtist);

router.get('/trending', homeController.showTrending);

module.exports = router;
