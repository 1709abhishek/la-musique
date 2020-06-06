const express = require("express");

const router = express.Router();
const queueController = require("../controllers/queue_controller");

console.log("router loaded");


router.get("/add", queueController.addToQueue);



module.exports = router;