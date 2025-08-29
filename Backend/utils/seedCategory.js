const mongoose = require("mongoose");
const Category = require("../models/Category");
const dotenv = require("dotenv");

dotenv.config();

const category = [
  {
    name: "Romance",
    icon: "heart",
    count: "12,450",
    description: "Love stories that warm the heart",

    bgColor: "bg-pink-50",
  },
  {
    name: "Mystery",
    icon: "zap",
    count: "8,760",
    description: "Thrilling puzzles to solve",

    bgColor: "bg-purple-50",
  },
  {
    name: "Self-Help",
    icon: "brain",
    count: "15,230",
    description: "Transform your life journey",

    bgColor: "bg-blue-50",
  },
  {
    name: "Fantasy",
    icon: "sword",
    count: "9,890",
    description: "Magical worlds await",

    bgColor: "bg-emerald-50",
  },
  {
    name: "Sci-Fi",
    icon: "star",
    count: "7,650",
    description: "Future possibilities explored",

    bgColor: "bg-violet-50",
  },
  {
    name: "History",
    icon: "globe",
    count: "11,340",
    description: "Past stories, present wisdom",

    bgColor: "bg-amber-50",
  },
  {
    name: "Classic",
    icon: "clock",
    count: "5,670",
    description: "Timeless literary treasures",

    bgColor: "bg-stone-50",
  },
  {
    name: "Poetry",
    icon: "coffee",
    count: "3,450",
    description: "Words that touch the soul",

    bgColor: "bg-teal-50",
  },
  {
    name: "Business",
    icon: "lightbulb",
    count: "6,780",
    description: "Success strategies revealed",

    bgColor: "bg-yellow-50",
  },
  {
    name: "Biography",
    icon: "users",
    count: "4,920",
    description: "Inspiring life stories",
    bgColor: "bg-red-50",
  },
  {
    name: "Adventure",
    icon: "mountain",
    count: "8,210",
    description: "Epic journeys and quests",

    bgColor: "bg-green-50",
  },
  {
    name: "Young Adult",
    icon: "bookopen",
    count: "13,560",
    description: "Coming-of-age stories",

    bgColor: "bg-indigo-50",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Category.deleteMany();
    await Category.insertMany(category);
    console.log("Categories Are Seeded");
    process.exit();
  })
  .catch((err) => console.error(err));
