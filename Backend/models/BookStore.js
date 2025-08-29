// models/BookStore.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "All",
        "Fiction",
        "Romance",
        "Self-help",
        "Adventure",
        "Memoir",
        "Science Fiction",
        "Mystery",
        "Spirituality",
        "History",
      ],
    },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

const BookStore = mongoose.model("BookStore", categorySchema);

module.exports = BookStore;
