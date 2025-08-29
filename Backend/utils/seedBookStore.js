// seeders/seedCategories.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BookStore = require("../models/BookStore");

dotenv.config();

const categories = [
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
];

const categoryDocs = categories.map((cat) => ({ name: cat }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to DB");
    await BookStore.deleteMany();
    await BookStore.insertMany(categoryDocs);
    console.log("✅ Categories are seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err.message || err);
    console.error(err.stack || '');
    process.exit(1);
  });
