

// seed/homeSeeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Home = require("../models/Home");

dotenv.config();

const home = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.8,
    genre: "Fiction",
    tag: "Popular",
    description: "A magical story about the infinite possibilities of life",
    cover: "/Images/book_21.png",
    price: 20,
    file: "/Pdf/TheMidnightLibrary.pdf",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.9,
    genre: "Self-Help",
    tag: "Editor's Pick",
    description: "Transform your life with tiny changes that deliver remarkable results",
    cover: "/Images/book_22.png",
    price: 40,
    file: "/Pdf/Atomic habits.pdf",
  },
  {
    title: "The Seven Husbands",
    author: "Taylor Jenkins Reid",
    rating: 4.7,
    genre: "Romance",
    tag: "Trending",
    description: "A captivating tale of love, ambition, and the price of fame",
    cover: "/Images/book_23.png",
    price: 90,
    file: "/Pdf/SevenHusbands.pdf",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    rating: 4.6,
    genre: "Memoir",
    tag: "Popular",
    description: "A powerful memoir about the transformative power of education",
    cover: "/Images/book_24.png",
    price: 10,
    file: "/Pdf/Educated.pdf",
  },
];

const seedHome = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Home.deleteMany();
    await Home.insertMany(home);
    console.log("✅ Home data seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding Home data:", error);
    process.exit(1);
  }
};

seedHome();
