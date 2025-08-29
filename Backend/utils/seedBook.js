const mongoose =  require('mongoose');
const Book = require('../models/Book');
const dotenv= require('dotenv');


dotenv.config();

const book = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    rating: 4.8,
    genre: "Philosophy",
    description: "A journey of a shepherd discovering the treasure within.",
    cover: "/Images/Alchemist.jpg",
    price: 80,
    isPopular: true,
    file: "/Pdf/TheAlchemist.pdf",
  },
  {
    title: "Digital Minimalism",
    author: "Cal Newport",
    rating: 4.5,
    genre: "Adventure",
    description: "How to live better with less technology.",
    cover: "/Images/DigitalMinimalism.jpg",
    price: 190,
    isPopular: false,
    file: "/Pdf/DigitalMinimalism.pdf",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.9,
    genre: "Fiction",
    description: "An easy & proven way to build good habits & break bad ones.",
    cover: "/Images/Atomic.jpg",
    price: 48,
    isPopular: true,
    file: "/Pdf/AtomicHabits.pdf",
  },

  {
    title: "Educated",
    author: "Tara Westover",
    rating: 4.6,
    genre: "Memoir",
    description: "A powerful memoir about growing up and self-invention",
    cover: "/Images/Educated.jpg",
    price: 300,
    isPopular: false,
    file: "/Pdf/Educated.pdf",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.5,
    genre: "Science Fiction",
    description: "A science fiction saga of politics, religion, and ecology",
    cover: "/Images/Dune.jpg",
    price: 250,
    isPopular: true,
    file: "/Pdf/Dune.pdf",
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    rating: 4.8,
    genre: "Mystery",
    description: "A suspenseful tale of nature, love, and survival",
    cover: "/Images/Where.jpg",
    price: 670,
    isPopular: true,
    file: "/Pdf/Where.pdf",
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    rating: 4.7,
    genre: "Spirituality",
    description:
      "A guide to spiritual enlightenment and present-moment awareness",
    cover: "/Images/Power.jpg",
    price: 230,
    isPopular: true,
    file: "/Pdf/ThePower.pdf",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.9,
    genre: "History",
    description: "A brief history of humankind from evolution to modernity",
    cover: "/Images/Sapiens.jpg",
    price: 390,
    isPopular: true,
    file: "/Pdf/sapiens.pdf",
  },
  {
    title: "It Ends With Us",
    author: "Colleen Hoover",
    rating: 4.5,
    genre: "Romance",
    description: "A deeply emotional and powerful love story",
    cover: "/Images/ItEnds.jpg",
    price: 670,
    isPopular: true,
    file: "/Pdf/ItEnds.pdf",
  },
  {
    title: "The Subtle Art of Not Giving ",
    author: "Mark Manson",
    rating: 4.3,
    genre: "Self-help",
    description: "A counterintuitive approach to living a good life",
    cover: "/Images/SubtleArt.jpg",
    price: 780,
    isPopular: true,
    file: "/Pdf/TheSubtle.pdf",
  },
];

mongoose.connect(process.env.MONGO_URI).then(async ()=> {
    await Book.deleteMany();
    await Book.insertMany(book);
    console.log("Books Are Seeded");
    process.exit();

}).catch((err) => console.log(err));