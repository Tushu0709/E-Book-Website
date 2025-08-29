

// controller/homeController.js
const Home = require("../models/Home");

exports.getHome = async (req, res) => {
  try {
    const data = await Home.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching", error });
  }
};
