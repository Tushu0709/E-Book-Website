// models/Home.js
const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  genre: String,
  tag: String,
  description: String,
  cover: String,
  price: Number,
  file: String,
});

module.exports = mongoose.model("Home", homeSchema);
