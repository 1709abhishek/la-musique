const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://kamikaze:1709abhishek@cluster0-hu0id.mongodb.net/<dbname>?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
