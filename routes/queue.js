const express = require("express");

const router = express.Router();
const queueController = require("../controllers/queue_controller");

console.log("router loaded");


router.get("/add", queueController.addToQueue);

router.get("/showQueue", queueController.showQueue);

module.exports = router;